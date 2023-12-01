const { test, expect } = require('@playwright/test');
const {BasePage}= require('../pages/loginPage');

test('has title', async ({ page }) => {
  let basePage=new BasePage(page);
  await basePage.visitUrl();

 // Expect a title "to contain" a substring.
  await basePage.verifyTitle('loginTd_titleValue');
});

test('login to portal', async ({ page }) => {
  let basePage=new BasePage(page);
  await basePage.visitUrl();
  await basePage.enterText('loginTd_user','loginTd_userName');
  await basePage.enterText('loginTd_pass','loginTd_password');
  await basePage.clickElement('loginTd_login');
});