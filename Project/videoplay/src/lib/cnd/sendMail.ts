import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.SendingEmail,
    pass: process.env.EmailPassword,
  },
});

/**
 * @typedef {Object} SendMailProps
 * @property {string} to
 * @property {string} subject
 * @property {string} html
 */

/**
 * @param {SendMailProps} param0
 */
export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return await transporter.sendMail({
    from: process.env.SendingEmail,
    to,
    subject,
    html,
  });
}