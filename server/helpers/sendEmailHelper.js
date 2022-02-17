import nodemailer from "nodemailer";
import config from "../config/index.js";

// async..await is not allowed in global scope, must use a wrapper
async function sendEmailHelper({
  from = "<foo@mytours.com>",
  to,
  subject,
  text,
  html,
}) {
  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    auth: {
      user: config.emailUsername,
      pass: config.emailPassword,
    },
  });
  // send mail with defined transport object
  return await transporter.sendMail({
    from: from, // sender address
    to: to, // "bar@example.com, baz@example.com", // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });
}

export default sendEmailHelper;
