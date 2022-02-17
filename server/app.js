import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compress from "compression";
import cors from "cors";
// import xss from "xss-clean";

import config from "./config/index.js";
// import ErrorHelper from "./helpers/errorHelper.js";

// local import
import routes from "./routes/index.js";

// init express
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
});

// middlewares
// apply to all requests
// app.use(cors());
// app.use("/api", helmet());

// app.use("/api", limiter);
if (config.dev) {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// app.use(express.static(process.cwd(), "public"));/

const CURRENT_WORKING_DIR = process.cwd();
app.use(express.static(path.join(CURRENT_WORKING_DIR, "/public")));

// data mongo satanitization
// app.use("/api", mongoSanitize());

// data sanitize xss
// app.use(xss())

// // api routes
app.use("/api/auth", routes.authRouter);
app.use("/api/users", routes.userRouter);
app.use("/api/categories", routes.categoryRouter);
app.use("/api/listings", routes.listingRouter);
app.use("/api/signins", routes.signinRouter);

app.get("/api", (req, res, next) => {
  res.json({ message: "hi" });
});

export default app;
