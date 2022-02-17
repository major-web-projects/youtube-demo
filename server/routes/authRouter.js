import express from "express";
import multer from "multer";

import authController from "../controllers/authController.js";
import { imageFilterHelper } from "../helpers/multerFilterHelper.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

let upload = multer({
  // storage: storageHelper({ multer, name: "users" }),
  storage: multer.memoryStorage(),
  fileFilter: imageFilterHelper,
});

router.get("/", authMiddleware.isAuth, authController.currentUser);
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", authMiddleware.isAuth, authController.signout);
router.post("/password/forgot", authController.forgotPassword);
router.patch("/password/reset", authController.resetPassword);
router.patch(
  "/password/update",
  authMiddleware.isAuth,
  authController.updatePassword
);
router.patch(
  "/update-profile",
  authMiddleware.isAuth,
  authController.updateProfile
);
router.patch(
  "/upload-avatar",
  authMiddleware.isAuth,
  upload.single("avatar"),
  authController.resizeAvatar,
  authController.uploadAvatar
);

router.patch("/deactivate", authMiddleware.isAuth, authController.deactivate);

export default router;
