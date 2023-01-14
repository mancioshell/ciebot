const fs = require("fs");
const path = require("path");

require("dotenv").config();

const sendMail = require("./lib/mailer").sendMail;
const crawl = require("./lib/crawler").crawl;

async function main() {
  // Create screenshots folder if not exists
  const dir = path.resolve(
    path.join(__dirname, process.env.SCREEN_FOLDER_NAME)
  );
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  let username = process.env.SITE_EMAIL;
  let password = process.env.SITE_PASSWORD;
  let screenshotFilePath = `${dir}/${process.env.SCREEN_FILE_NAME}`;

  // Crawl the site and take a screenshot
  await crawl(username, password, screenshotFilePath);

  let smtp_host = process.env.SMTP_HOST;
  let smtp_port = process.env.SMTP_PORT;
  let smtp_username = process.env.SMTP_USER;
  let smtp_password = process.env.SMTP_PASSWORD;

  let from = `${process.env.SMTP_USER}@gmail.com`;
  let to = process.env.TO_EMAIL;

  let filename = process.env.SCREEN_FILE_NAME;

  // Send an email with the screenshot

  await sendMail(
    smtp_host,
    smtp_port,
    smtp_username,
    smtp_password,
    from,
    to,
    screenshotFilePath,
    filename
  );
}

main();
