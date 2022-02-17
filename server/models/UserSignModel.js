import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSigninSchema = new Schema(
  {
    isSignedIn: {
      type: Boolean,
      default: false,
    },
    signinAt: {
      type: Date,
    },
    signoutAt: {
      type: Date,
    },
    ip: String,
    ua: String,
    browser: String,
    os: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A review must belong to a user"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("UserSignin", UserSigninSchema);
