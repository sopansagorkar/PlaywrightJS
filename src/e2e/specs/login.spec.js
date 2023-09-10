// @ts-check
const { test, expect } = require('@playwright/test');
import {Placeholder,Credentials,LoginElements} from '../data/login.data.js';
import { Environment } from '../../../environment.js';
test('has title', async ({ page }) => {
  await page.goto(Environment.STAGE.url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login to portal', async ({ page }) => {
  await page.goto(Environment.STAGE.url);

  // Click the get started link.
  await page.getByPlaceholder(Placeholder.username).fill(Credentials.loginUser);
  await page.getByPlaceholder(Placeholder.password).fill(Credentials.loginPwd);
  await page.locator(LoginElements.loginButton).click();
});