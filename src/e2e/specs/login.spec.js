const { test, expect } = require('@playwright/test');
const {BasePage}= require('../pages/loginPage');
import { Environment } from '../../../environment.js';

test('has title', async ({ page }) => {
  //await page.goto(Environment.STAGE.url);

  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/Swag Labs/);
});

test('login to portal', async ({ page }) => {
  let basePage=new BasePage(page);
  await page.goto(Environment.STAGE.url);
  await basePage.enterText('loginTd_user','loginTd_userName');
  await basePage.enterText('loginTd_pass','loginTd_password');
  await basePage.submitLoginForm('loginTd_login');
});