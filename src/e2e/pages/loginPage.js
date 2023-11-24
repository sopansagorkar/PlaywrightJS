const { expect } = require("@playwright/test");

const locators = "locators";
const data = "data";

exports.BasePage=class BasePage {

  constructor(page){
    this.page=page;
  }
  async navigateToLoginScreen() {
    return await page.goto("https://www.saucedemo.com");
  }

  async verifyLoginPageIsDisplayed() {
    return expect(await page.title()).to.equal("Swag Labs");
  }

  async findValueOrLocatorFromTestData(filename_key, dataType) {
    const [file, keyString] = filename_key.split("_");
    console.log(file+' '+keyString);
    const fileName = require('../data/'+file+'');
    const testData =
      dataType === data
        ? fileName.data
        : dataType === locators
        ? fileName.locators
        : null;
    if (testData) {
      const entry = await testData.find(entry => entry.key === keyString);
      if (entry) {
        return await entry.value;
      } else {
        console.log("Key '" + keyString + "' not found in testData");
      }
    } else {
      throw new Error(
        "Invalid source specified. Use" + data + " or" + locators + "."
      );
    }
  }
  async enterText(inputText, element) {
    this.text = await this.findValueOrLocatorFromTestData(inputText, data);
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    console.log('Text Entered '+this.text+' and Locator '+this.locator);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.type(this.text);
  }

  async clearText(element){
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.clear();
  }
  async submitLoginForm(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.click();
  }

  async verifyVisibility(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.isVisible();
  }

  async verifyNonVisibility(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.waitFor({state: 'hidden'});
  }

  async selectFromDropDown(optionValue,element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.text = await this.findValueOrLocatorFromTestData(optionValue, data);
    await this.page.selectOption(this.locator,this.text);
  }

  async verifyAfterLoginPage() {
    await global.page.waitForSelector(locators.inventory_container);
    const visible = await global.page.isVisible(locators.inventory_container);
    return expect(visible).to.equal(true);
  }
}
