import UserModel from "../models/UserModel.js";
import _ from "lodash";
import ErrorHelper from "../helpers/errorHelper.js";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";

const list = catchAsyncErrors(async (req, res, next) => {
  let users = await UserModel.find();
  return res.json({ status: "ok", users });
});

const create = catchAsyncErrors(async (req, res) => {
  const user = new UserModel(req.body);
  await user.save();
  return res
    .status(200)
    .json({ status: "ok", message: "Successfully signed up!" });
});

// get user by id
const userByID = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.userId;
  let user = await UserModel.findById(id);
  if (!user) {
    return next(new ErrorHelper("User not found", 404));
  }
  req.profile = user;
  return next();
});

// GET USER BY slug
// get user by id
const userBySlug = catchAsyncErrors(async (req, res, next) => {
  const slug = req.params.slug;
  let user = await UserModel.findOne({ slug });
  if (!user) {
    return next(new ErrorHelper("User not found", 404));
  }
  return res.json({ status: "ok", user });
});

const read = catchAsyncErrors(async (req, res) => {
  return res.json({ status: "ok", user: req.profile });
});

const update = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    firstName,
    lastName,
    about,
    userType,
    phone,
    email,
    whatsapp,
    website,
    address,
    city,
    cityList,
    province,
    zipcode,
  } = req.body;
  let user = req.profile;
  user = _.extend(user, {
    name,
    email,
    firstName,
    lastName,
    about,
    userType,
    contacts: {
      phone,
      whatsapp,
      website,
    },
    social: {
      facebook,
      twitter,
      instagram,
      linkedin,
    },
    address: {
      address,
      city,
      cityList,
      province,
      zipcode,
    },
  });

  let result = await user.save();
  res.json({ success: "ok", user: result });
});

const remove = catchAsyncErrors(async (req, res) => {
  let user = req.profile;
  let deletedUserModel = await user.remove();
  return res.json(deletedUserModel);
});

// multer upload
const uploadAvatar = async (req, res) => {
  let user = req.auth;
  // 'profile_pic' is the name of our file input field in the HTML form
  try {
    // Display uploaded image for user validation
    user.avatar = "/uploads/" + req.file.filename;
    user = await user.save();
    res.json({ status: "ok", user });
  } catch (error) {}
};

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  uploadAvatar,
  userBySlug,
};
