import fs from "fs/promises";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import config from "../config/index.js";
import ErrorHelper from "../helpers/errorHelper.js";
import sendEmailHelper from "../helpers/sendEmailHelper.js";
import signinHelper from "../helpers/signinHelper.js";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";
import UserModel from "../models/UserModel.js";

const currentUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.auth._id;
  const user = await UserModel.findById(userId);
  if (!user) {
    return next(new ErrorHelper("User not found, please register", 404));
  }

  return res.json({
    status: "success",
    user,
  });
});

const signup = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, agreeToTerms, passwordConfirm } = req.body;
  const ipAddress =
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  if (!name || !email || !password) {
    return next(new ErrorHelper("Please provide all the values", 404));
  }

  if (!agreeToTerms) {
    return next(
      new ErrorHelper(
        "Please agree to the terms of use and privacy policy to register",
        404
      )
    );
  }
  if (password !== passwordConfirm) {
    return next(
      new ErrorHelper("Password and confirmation password do not match", 404)
    );
  }

  let user = await UserModel.findOne({ $or: [{ name }, { email }] });

  if (user) {
    return next(new ErrorHelper("Email or username already taken", 404));
  }

  user = await UserModel.create({
    name,
    email,
    password,
    passwordConfirm,
    meta: { ipAddress: ipAddress, device: req.headers["user-agent"] },
  });

  user.password = undefined;
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
  const cookieOptions = {
    expires:
      new Date(Date.now + config.jwtCookieExpiresIn) * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // secure: true,
  };
  req.auth = user;
  res.cookie("token", token, cookieOptions);
  return res.json({ status: "success", user });
});

const signin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHelper("Please enter your password and email", 404));
  }

  let user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHelper("Invalid email or password", 404));
  }

  if (!(await user.authenticate(password, user.password))) {
    return next(new ErrorHelper("Invalid email or password", 404));
  }

  signinHelper.userLogins(req, user);

  user.password = undefined;
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
  const cookieOptions = {
    expires:
      new Date(Date.now + config.jwtCookieExpiresIn) * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // secure: true,
  };
  req.auth = user;
  res.cookie("token", token, cookieOptions);
  return res.json({ status: "success", user });
});

// signout
const signout = (req, res) => {
  signinHelper.userSignout(req, req.auth);
  res.clearCookie("token").json({
    status: "success",
    message: "Successfully signout",
  });
};

// forgot password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(
      new ErrorHelper("Please enter your email to reset your password", 404)
    );
  }

  let user = await UserModel.findOne({ email });

  if (!user) {
    return next(new ErrorHelper("User not found with that email", 404));
  }

  // generate a token
  const otp = user.genOtp();
  user = await user.save({ validateBeforeSave: false });

  // send email
  var mailOptions = {
    to: user.email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", // html body
  };
  // const resetURL = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/auth/password/reset/${resetToken}`;
  // const message = `Hie ${user.name},\n\nPlease follow this link below to reset your password:\n ${resetURL}`;
  try {
    // await sendEmailHelper({
    //   to: user.email,
    //   subject: "Reset your password (link only valid for 10min)",
    //   text: message,
    // });
    await sendEmailHelper(mailOptions);
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ErrorHelper("Failed to send the email, please try again later.", 404)
    );
  }

  return res.json({
    status: "success",
    message: "Password reset message sent to your email",
  });
});

// reset password
// forgot password
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { otpCode, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return next(
      new ErrorHelper("Password and confirmation password dont match", 404)
    );
  }

  if (!otpCode) {
    return next(new ErrorHelper("Please provide a otp code to continue", 404));
  }

  let user = await UserModel.findOne({
    "otp.code": otpCode,
    "otp.expiresAt": { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHelper("Password otp code is invalid or has expired", 404)
    );
  }

  // update password
  user.password = password;
  user.otp.code = undefined;
  user.otp.expiresAt = undefined;
  await user.save();

  return res.json({
    status: "success",
    message: "Password reset successfully, please login",
  });
});

// current user update password
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirm } = req.body;
  if (!password || !passwordConfirm || password !== passwordConfirm) {
    return next(
      new ErrorHelper("Password and confirmation password dont match", 404)
    );
  }

  let user = await UserModel.findById(req.auth.id).select("+password");

  if (!user) {
    return next(new ErrorHelper("User not found", 404));
  }

  if (!(await user.authenticate(passwordCurrent, user.password))) {
    return next(new ErrorHelper("Please enter your current password", 404));
  }

  user.password = password;
  await user.save();

  return res.json({
    status: "success",
    message: "Password reset successfully, please login",
  });
});

// update user profile
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, bio, role } = req.body;

  let user = await UserModel.findByIdAndUpdate(
    req.auth.id,
    {
      name,
      email,
      phone,
      bio,
      role,
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new ErrorHelper("User not found", 404));
  }

  return res.json({
    status: "success",
    user,
    message: "Profile successfully updated",
  });
});

// multer upload
const uploadAvatar = catchAsyncErrors(async (req, res) => {
  let user = req.auth;
  let oldAvatar = process.cwd() + "/public" + req.auth.avatar.full_url;
  let defaultPic = process.cwd() + "/public/images/defaults/avatar.jpg";
  // 'profile_pic' is the name of our file input field in the HTML form

  // Display uploaded image for user validation'
  if (oldAvatar !== defaultPic) {
    await fs.unlink(oldAvatar).catch((err) => console.log("file not found"));
  }
  const avatarData = {
    url: req.file.url,
    full_url: req.file.imageFullUrl,
    filename: req.file.filename,
  };
  user.avatar = avatarData;
  user = await user.save();
  return res.json({
    status: "success",
    user,
    message: "Profile successfully updated",
  });
});

// multer upload
const resizeAvatar = catchAsyncErrors(async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  req.file.filename = `users_${req.auth._id}_${Date.now()}.jpeg`;
  req.file.url = "/images/uploads/users/" + req.file.filename;
  req.file.imageFullUrl = new URL(
    `${req.protocol}://${req.get("host")}${req.file.url}`
  );
  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.file.url}`);
  return next();
});

// deactivate user
const deactivate = catchAsyncErrors(async (req, res, next) => {
  let user = await UserModel.findByIdAndUpdate(
    req.auth.id,
    { status: "inactive" },
    { new: true }
  );

  if (!user) {
    return next(new ErrorHelper("User not found", 404));
  }

  return res.json({
    status: "success",
    user,
    message: "Profile successfully updated",
  });
});

export default {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  uploadAvatar,
  resizeAvatar,
  deactivate,
  currentUser,
};
