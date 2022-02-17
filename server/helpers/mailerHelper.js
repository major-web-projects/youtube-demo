import nodemailer from "nodemailer";
import config from "../config/server.config.js";

export const sendEmail = async ({ email, subject, body }) => {
  const transport = nodemailer.createTransport({
    host: config.mailHost,
    port: config.mailPort,
    auth: {
      user: config.mailUsername,
      pass: config.mailPassword,
    },
  });

  const message = {
    from: `${config.mailFromName} <${config.mailFromEmail}>`,
    to: email,
    subject: subject,
    text: body,
  };

  return await transport.sendMail(message);
};
