import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USERNAME,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_ACCESS_TOKEN
  }
});

function sendMail(to, subject, html) {
  transporter.sendMail(
    {
      from: "Teach Tech Service <admin@teachtechservice.com>",
      to,
      subject,
      html
    },
    function(err, info) {
      if (err) console.log(err);
      else console.log(info);
    }
  );
}

export { sendMail };
export default transporter;
