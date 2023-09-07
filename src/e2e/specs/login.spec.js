// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Click the get started link.
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.locator('input#login-button').click();
});
