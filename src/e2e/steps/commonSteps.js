const { Given,When,Then,And } = require('@cucumber/cucumber')

Given("I am on login page", function () {
console.log("test");
});

When("I enter {string}", function (string) {
    console.log("test");
});


When("click on {string} button", function (string) {
    console.log("test");
});

Then("verify user landed on {string} screen", function (string) {
    console.log("test");
});
