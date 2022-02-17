import express from "express";
import parser from "ua-parser-js";
import { getClientIp } from "@supercharge/request-ip";
import userSigninController from "../controllers/userSigninController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// /api/tours GET and POST Routes
router.get("/", function (req, res) {
  const ip = getClientIp(req);
  // get user-agent header
  var ua = parser(req.headers["user-agent"]);
  ua.ip = ip;
  // write the result as response
  res.end(JSON.stringify(ua, null, "  "));
});

router.get(
  "/current-user",
  authMiddleware.isAuth,
  userSigninController.currentUserSignins
);

export default router;
