import ErrorHelper from "../helpers/errorHelper.js";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";
import UserSignModel from "../models/UserSignModel.js";

const create = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  let user = await UserSignModel.create(req.body);
  return res.json({ status: "success", user });
});

const currentUserSignins = catchAsyncErrors(async (req, res, next) => {
  const userId = req.auth._id;
  const userSignins = await UserSignModel.find({ user: userId });
  return res.json({ status: "success", userSignins });
});

export default { currentUserSignins };
