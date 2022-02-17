import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import slug from "mongoose-slug-updater";
import mongoosePaginate from "mongoose-paginate-v2";
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name"],
      trim: true,
      maxlength: [
        100,
        "A user name must have less or equal then 100 characters",
      ],
      minlength: [3, "A user name must have more or equal then 3 characters"],
    },

    email: {
      type: String,
      required: [true, "A user must have a email"],
      unique: true,
      towercase: true,
      validate: [validator.isEmail, "Enter a valid email"],
    },

    bio: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      url: {
        type: String,
        default: "/images/defaults/avatar.jpg",
      },
      filename: {
        type: String,
        default: "avatar.jpg",
      },
      full_url: {
        type: String,
        default: "/images/defaults/avatar.jpg",
      },
      storageType: {
        type: String,
        default: "FileStorage",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must have more or equal then 8 characters"],
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpiresIn: String,
    role: {
      type: String,
      enum: ["normal", "admin"],
      default: "normal",
    },
    status: {
      type: String,
      enum: ["active", "limited", "inactive"],
      default: "active",
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    otp: {
      code: String,
      expiresAt: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(mongoosePaginate);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now();
  next();
});

UserSchema.pre(/^find/, function (next) {
  this.find({ status: "active" });
  next();
});

UserSchema.methods.authenticate = async function (siginPassword, userPassword) {
  return await bcrypt.compare(siginPassword, userPassword);
};

// check whether password has changed
UserSchema.methods.isPasswordChanged = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimestamp < changeTimestamp;
  }
  return false;
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

UserSchema.methods.hashPasswordResetToken = function (token) {
  return crypto.createHash("sha256").update(token).digest("hex");
};

UserSchema.methods.genOtp = function () {
  const otpCode = parseInt(Math.random() * 1000000);
  this.otp = {
    code: otpCode,
    expiresAt: Date.now() + 10 * 60 * 1000,
  };
  return otpCode;
};

export default mongoose.model("User", UserSchema);
