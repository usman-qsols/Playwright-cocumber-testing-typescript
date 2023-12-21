import { Before, After } from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { pageFixer } from "./pageFixture";

let browser: Browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  pageFixer.page = page;
});

After(async function () {
  await pageFixer.page.close();
  await browser.close();
});
