import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixer } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);

Given("user search for a {string}", async function (book) {
  await pageFixer.page.locator("input[type='search']").type(book);
  await pageFixer.page.waitForTimeout(3000);
  await pageFixer.page.locator("mat-option[role='option'] span").click();
});

When("user add the book to the cart", async function () {
  await pageFixer.page.locator("//button[@color='primary']").click();
});

Then("the cart badge should get updated", async function () {
  const badgeCount = await pageFixer.page
    .locator("#mat-badge-content-0")
    .textContent();
  expect(Number(badgeCount)).toBeGreaterThan(0);
});
