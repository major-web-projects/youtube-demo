import express from "express";
import listingController from "../controllers/listingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { imageFilterHelper } from "../helpers/multerFilterHelper.js";
import multer from "multer";

const router = express.Router();

let upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFilterHelper,
});

router.route("/").get(listingController.list);
router
  .route("/search-youtube-channel")
  .post(listingController.searchYouTubeChannel);
// router.route("/by-user/:userId").get(listingController.listByUserID);
router.route("/search").get(listingController.search);
router.route("/related/:listingId").get(listingController.related);

// GET /dashboard/listings/current-user (signed up user)
router
  .route("/current-user")
  .get(authMiddleware.isAuth, listingController.currentUser);

router.post(
  "/",
  authMiddleware.isAuth,
  upload.single("image"),
  listingController.create
);

router.post("/", listingController.create);
router.put(
  "/upload/:listingId",
  authMiddleware.isAuth,
  upload.array("images"),
  listingController.upload
);

// Like post
router.put("/like/:listingId", authMiddleware.isAuth, listingController.like);

router.route("/by-slug/:slug").get(listingController.listingBySlug);

router
  .route("/:listingId")
  .get(listingController.read)
  .put(authMiddleware.isAuth, upload.single("image"), listingController.update)
  .delete(authMiddleware.isAuth, listingController.remove);

router.param("listingId", listingController.listingById);
export default router;
