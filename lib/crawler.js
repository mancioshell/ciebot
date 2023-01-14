const puppeteer = require("puppeteer");

const HOMEPAGE = "https://prenotami.esteri.it/";

const XPATH_EXPRESSION =
  "//table/tbody/tr[td//text()[contains(., 'DOCUMENTI DI IDENTITA’/VIAGGIO')]]/td/a";

async function crawl(username, password, screenshotFilePath) {
  // Run browser
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  console.log("Open the browser.");

  await page.goto(HOMEPAGE);

  console.log("Go to the homepage.");

  await page.type("#login-email", username);
  await page.type("#login-password", password);

  const form = await page.$("#login-form");
  await form.evaluate((form) => form.submit());

  console.log("Submitting form.");

  await page.waitForSelector("#advanced");
  await page.click("#advanced");
  await page.waitForXPath(XPATH_EXPRESSION, 5000);

  console.log("Go to services page.");

  const [button] = await page.$x(XPATH_EXPRESSION);
  if (button) await button.click();
  await page.waitForNavigation();

  console.log("Click CIE service button.");

  // Take a screenshot
  await page.screenshot({
    path: screenshotFilePath,
    fullPage: true,
  });

  console.log("Take a screenshot");

  await browser.close();

  console.log("Close the browser.");
}

module.exports = {
  crawl,
  default: crawl,
};
