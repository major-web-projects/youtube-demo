import UserModel from "../models/UserModel.js";
import parser from "ua-parser-js";
import { getClientIp } from "@supercharge/request-ip";
import UserSignModel from "../models/UserSignModel.js";

// /api/tours GET and POST Routes
const userLogins = async (req, user) => {
  const ip = getClientIp(req);
  // get user-agent header
  const userAgent = parser(req.headers["user-agent"]);
  let os = userAgent.os.name;
  let browser = userAgent.browser.name;
  if (userAgent.os.version) {
    os = userAgent.os.name + " v" + userAgent.os.version;
  }

  if (userAgent.browser.version) {
    browser = userAgent.browser.name + " v" + userAgent.browser.version;
  }

  const signinData = {
    ua: userAgent.ua,
    browser: browser,
    os: os,
    ip: ip,
    isSignedIn: true,
    signinAt: Date.now(),
  };

  return await UserSignModel.findOneAndUpdate(
    {
      user: user._id,
      ua: userAgent.ua,
    },
    signinData,
    {
      new: true,
      upsert: true,
    }
  );
};

// /api/tours GET and POST Routes
const userSignout = async (req, user) => {
  const ip = getClientIp(req);
  // get user-agent header
  const userAgent = parser(req.headers["user-agent"]);

  const signinData = {
    isSignedIn: false,
    signoutAt: Date.now(),
  };

  return await UserSignModel.findOneAndUpdate(
    {
      user: user._id,
      ua: userAgent.ua,
    },
    signinData,
    {
      new: true,
      upsert: true,
    }
  );
};
export default { userLogins, userSignout };
