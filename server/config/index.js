import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongodbConnect = async (mongoURI) => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log(`Mongodb failed to connect: ${error.message}`);
    process.exit(1);
  }
};

const config = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/youtubedb",
  mongodbConnect,
  port: parseInt(process.env.PORT, 10) || 3030,
  dev: process.env.NODE_ENV !== "production",
  jwtSecret: process.env.JWT_SECRET_KEY || "secret-key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  jwtResetKey: process.env.JWT_RESET_KEY || "reset-key",
  jwtAccountActivationKey:
    process.env.JWT_ACCOUNT_ACTIVATION_KEY || "activate-acc",
  cookieExpires: process.env.COOKIE_EXPIRES || "1d",
  mailDriver: process.env.MAIL_DRIVER || "smtp",
  mailHost: process.env.MAIL_HOST || "smtp.mailtrap.io",
  mailPort: process.env.MAIL_PORT || 2525,
  mailUsername: process.env.MAIL_USERNAME,
  mailPassword: process.env.MAIL_PASSWORD,
  mailEncryption: process.env.MAIL_ENCRYPTION || "tls",
  mailFromEmail: process.env.MAILMAIL_FROM_EMAIL || "noreply@example.com",
  mailFromName: process.env.MAIL_FROM_NAME || "Youtube",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  acloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  googleApiKey: process.env.GOOGLE_API_KEY,
};

export default config;
