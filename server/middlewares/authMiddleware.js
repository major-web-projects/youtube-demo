import jwt from "jsonwebtoken";
import { promisify } from "util";
import config from "../config/index.js";
import ErrorHelper from "../helpers/errorHelper.js";
import UserModel from "../models/UserModel.js";
import { catchAsyncErrors } from "./errorMiddleware.js";

const isAuth = catchAsyncErrors(async (req, res, next) => {
  // get token
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHelper("Please login to continue", 401));
  }
  // verify token
  const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

  // check user
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return next(new ErrorHelper("Please login to continue", 401));
  }
  if (user.isPasswordChanged(decoded.iat)) {
    return next(
      new ErrorHelper(
        "Your credentials recently changed, please login again",
        401
      )
    );
  }

  // pass user
  req.auth = user;
  return next();
});

const isAuthorized =
  (...roles) =>
  (req, res, next) => {
    // roles -> ['admin', 'lead']
    if (!roles.includes(req.auth.role)) {
      return next(new ErrorHelper("Access denied", 403));
    }
    return next();
  };

export default { isAuth, isAuthorized };
