const { Given, When, Then, And } = require("@cucumber/cucumber");
const { LoginPage } = require("../pages/loginPage");

let loginpage = new LoginPage();
Given("I am on login page", function () {
  loginpage.navigateToLoginScreen();
  loginpage.verifyLoginPageIsDisplayed();
});

When("I enter {string}", function (string) {
  loginpage.enterText(string);
});

When("click on {string} button", function (string) {
  loginpage.submitLoginForm();
});

Then("verify user landed on {string} screen", function (string) {
  loginpage.verifyAfterLoginPage();
});
