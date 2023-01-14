const nodemailer = require("nodemailer");
const fs = require("fs");

async function sendMail(
  smtp_host,
  smtp_port,
  smtp_username,
  smtp_password,
  from,
  to,
  file,
  filename
) {
  console.log("Sending email from %s to %s", from, to);

  let transporter = nodemailer.createTransport({
    port: smtp_port,
    host: smtp_host,
    auth: {
      user: smtp_username,
      pass: smtp_password,
    },
    secure: true,
    tls: { rejectUnauthorized: false },
  });

  let info = await transporter.sendMail({
    from: `CIE Bot ${from}`,
    to: to,
    subject: "CIE Bot",
    attachments: [
      {
        filename: filename,
        content: fs.createReadStream(`${file}`),
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendMail,
  default: sendMail,
};
