import sgMail from "../config/nodemailer";

export function sendEmailVerification(user) {
  sgMail.send({
    to: "marcinwarzybok@outlook.com",
    from: "admin@teachtechservice.com",
    subject: "Email Verification - Teach Tech Service",
    text: "Email verification",
    html: "<h1>Verification</h1>"
  });
}
