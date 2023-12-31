const { test, expect } = require("@playwright/test");
const { BasePage } = require("../pages/loginPage");

test.describe("Verify checkout", async () => {
  test("Verify Add to cart", async ({ page }) => {
    let basePage = new BasePage(page);
    await basePage.visitUrl();
    await basePage.enterText("loginTd_user", "loginTd_userName");
    await basePage.enterText("loginTd_pass", "loginTd_password");
    await basePage.clickElement("loginTd_login");
    await basePage.clickElement('cartTd_redShirtAdd');
    await basePage.clickElement('cartTd_onesieAdd');
    await basePage.clickElement('cartTd_jacketAdd');
    await basePage.clickElement('cartTd_tShirtAdd');
    await basePage.clickElement('cartTd_bikeLightAdd');
    await basePage.clickElement('cartTd_backPackAdd');
    await basePage.verifyText('cartTd_totalCartValue','cartTd_totalCartItem');
  });

  test("Verify Complete checkout", async ({ page }) => {
    let basePage = new BasePage(page);
    await basePage.visitUrl();
    await basePage.enterText("loginTd_user", "loginTd_userName");
    await basePage.enterText("loginTd_pass", "loginTd_password");
    await basePage.clickElement("loginTd_login");
    await basePage.clickElement('cartTd_redShirtAdd');
    await basePage.clickElement('cartTd_onesieAdd');
    await basePage.clickElement('cartTd_jacketAdd');
    await basePage.clickElement('cartTd_tShirtAdd');
    await basePage.clickElement('cartTd_bikeLightAdd');
    await basePage.clickElement('cartTd_backPackAdd');
    await basePage.verifyText('cartTd_totalCartValue','cartTd_totalCartItem');
    await basePage.clickElement('cartTd_totalCartItem');
    await basePage.verifyVisibility('checkoutTd_verifyCart');
    await basePage.verifyVisibility('checkoutTd_verifyQTY');
    await basePage.verifyVisibility('checkoutTd_verifyDesc');
    await basePage.clickElement('checkoutTd_checkoutBtn');
    await basePage.enterText("checkoutTd_firstName", "checkoutTd_firstNameTxt");
    await basePage.enterText("checkoutTd_lastName", "checkoutTd_lastNameTxt");
    await basePage.enterText("checkoutTd_zip", "checkoutTd_zipTxt");
    await basePage.clickElement('checkoutTd_continue');
    await basePage.verifyVisibility('checkoutTd_paymentInfo');
    await basePage.verifyVisibility('checkoutTd_shippingInfo');
    await basePage.verifyVisibility('checkoutTd_totalPrice');
    await basePage.clickElement('checkoutTd_finish');
    await basePage.verifyVisibility('checkoutTd_completeOrder');
  });
});
