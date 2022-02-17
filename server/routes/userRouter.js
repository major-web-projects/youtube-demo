import express from "express";
import multer from "multer";
import { imageFilterHelper } from "../helpers/multerFilterHelper.js";
import userCtrl from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

let upload = multer({
  // storage: storageHelper({ multer, name: "users" }),
  storage: multer.memoryStorage(),
  fileFilter: imageFilterHelper,
});

router.route("/").get(userCtrl.list).post(userCtrl.create);
router
  .route("/upload-avatar")
  .post(authMiddleware.isAuth, upload.single("avatar"), userCtrl.uploadAvatar);

router.route("/by-slug/:slug").get(userCtrl.userBySlug);

router
  .route("/:userId")
  .get(authMiddleware.isAuth, userCtrl.read)
  .put(authMiddleware.isAuth, userCtrl.update)
  .delete(authMiddleware.isAuth, userCtrl.remove);

router.param("userId", userCtrl.userByID);

export default router;
