import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixer } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);

Given("User navigates to the application", async function () {
  await pageFixer.page.goto("https://bookcart.azurewebsites.net/");
  await pageFixer.page.waitForTimeout(1000);
});

Given("User click on the login link", async function () {
  await pageFixer.page.locator("//span[text()='Login']").click();
});

Given("User enter the username as {string}", async function (username) {
  await pageFixer.page
    .locator("input[formcontrolname='username']")
    .type(username);
});

Given("User enter the password as {string}", async function (password) {
  await pageFixer.page
    .locator("input[formcontrolname='password']")
    .type(password);
});

When("User click on the login button", async function () {
  await pageFixer.page.locator("button[color='primary']").click();
  await pageFixer.page.waitForTimeout(3000);
});

Then("Login should be success", async function () {
  const text = pageFixer.page.locator(
    "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]"
  );
  console.log("Username: " + text);
});

When("Login should fail", async function () {
  const failureMesssage = pageFixer.page.locator("mat-error[role='alert']");
  await expect(failureMesssage).toBeVisible();
});
