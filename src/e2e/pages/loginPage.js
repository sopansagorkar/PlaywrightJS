const {expect} = require('@playwright/test');
const {Credentials}= require('../data/login.data');

locators = {
  username_input: "#user-name",
  password_input: "#password",
  login_button: "#login-button",
  inventory_container: "#inventory_container",
};

class LoginPage {
  async navigateToLoginScreen() {
    return await global.page.goto('https://www.saucedemo.com');
  }

  async verifyLoginPageIsDisplayed() {
    return expect(await global.page.title()).to.equal("Swag Labs");
  }

  async enterText(string) {
    switch (string) {
      case "username":
        await global.page.fill(locators.username_input, Credentials.loginUser);
      case "password":
        await global.page.fill(locators.password_input, Credentials.loginPwd);
    }
  }

  async submitLoginForm() {
    await global.page.click(locators.login_button);
  }

  async verifyAfterLoginPage() {
    await global.page.waitForSelector(locators.inventory_container);
    const visible = await global.page.isVisible(locators.inventory_container);
    return expect(visible).to.equal(true);
  }
}

module.exports = { LoginPage };
