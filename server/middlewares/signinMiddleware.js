import UserModel from "../models/UserModel.js";
import parser from "ua-parser-js";
import { getClientIp } from "@supercharge/request-ip";
import UserSignModel from "../models/UserSignModel.js";

// /api/tours GET and POST Routes
const userLogins = async (req, res, next) => {
  const user = req.user;
  const ip = getClientIp(req);
  // get user-agent header
  const ua = parser(req.headers["user-agent"]);
  ua.ip = ip;

  const signinData = {
    ua: ua.ua,
    browser: au.browser.name + " v" + au.browser.version,
    engine: au.engine.name + " v" + au.engine.version,
    os: au.os.name + " v" + au.os.version,
    ip: ip,
    isSignedIn: true,
    signinAt: Date.now(),
  };

  let userlogins = await UserSignModel.findOneAndUpdate(
    {
      user: user._id,
      browser: ua.browser.name,
      os: ua.os.name,
    },
    { signinData },
    {
      new: true,
      upsert: true,
    }
  );

  console.log(userlogins);
  return next();
};

export default { userLogins };
