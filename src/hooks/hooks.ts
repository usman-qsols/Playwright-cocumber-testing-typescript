import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  AfterStep,
  Status,
} from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "@playwright/test";
import { pageFixer } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: !false });
});

Before(async function () {
  context = await browser.newContext();
  const page = await browser.newPage();
  pageFixer.page = page;
});

// AfterStep(async function ({ pickle, result }) {
//   const img = await pageFixer.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: "png" })
//   await this.attach(img, "image/png");
// });

After(async function ({ pickle, result }) {
  // screenshot

  if (result?.status == Status.FAILED) {
    const img = await pageFixer.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });

    await this.attach(img, "image/png");
  }

  await pageFixer.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
