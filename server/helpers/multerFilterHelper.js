import path from "path";
import ErrorHelper from "./errorHelper.js";

export const imageFilterHelper = function (req, file, cb) {
  // Accept images only
  if (!file.mimetype.startsWith("image")) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new ErrorHelper("Only image files are allowed!", 404), false);
  }
  cb(null, true);
};

export const storageHelper = ({ multer, name }) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/images/uploads/${name}`);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
      cb(
        null,
        name +
          "_" +
          req.auth._id +
          "_" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  });
