import { catchAsyncErrors } from "../middlewares/errorMiddleware";
import ErrorHelper from "./errorHelper";

const isOwner = (user, record) => {
  return user && (user.role === "admin" || user._id === record._id);
};

export default { isOwner };
