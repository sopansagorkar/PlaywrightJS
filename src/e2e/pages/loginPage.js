const { expect } = require("@playwright/test");

const locators = "locators";
const data = "data";

exports.BasePage = class BasePage {
  constructor(page) {
    this.page = page;
  }
  async visitUrl() {
    await this.page.goto("/");
  }

  async verifyTitle(titleValue) {
    const expectedValue = await this.findValueOrLocatorFromTestData(
      titleValue,
      data
    );
    const actualValue = await this.page.title();
    expect(actualValue).toContain(expectedValue);
  }

  async findValueOrLocatorFromTestData(filename_key, dataType) {
    const [file, keyString] = filename_key.split("_");
    const fileName = require("../data/" + file + "");
    const testData =
      dataType === data
        ? fileName.data
        : dataType === locators
        ? fileName.locators
        : null;
    if (testData) {
      const entry = await testData.find((entry) => entry.key === keyString);
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
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.type(this.text);
  }

  async clearText(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.clear();
  }
  async clickElement(element) {
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
    await this.elementHandle.waitFor({ state: "hidden" });
  }

  async selectFromDropDown(optionValue, element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.text = await this.findValueOrLocatorFromTestData(optionValue, data);
    await this.page.selectOption(this.locator, this.text);
  }

  async verifyAfterLoginPage() {
    await global.page.waitForSelector(locators.inventory_container);
    const visible = await global.page.isVisible(locators.inventory_container);
    return expect(visible).to.equal(true);
  }
  async clickAllElement(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    this.elementCount = await this.page.locator(this.locator).count();
    for (let i = 0; i < this.elementCount; i++) {
      await this.elementHandle.click();
    }
  }

  async checkImageIsNotBroken(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    const imgUrl = await this.elementHandle.getAttribute("src");
    const fullImgUrl = new URL(imgUrl, this.page.url()).href;
    const response = await this.page.evaluate(async (url) => {
      const fetchResponse = await fetch(url);
      return fetchResponse.status;
    }, fullImgUrl);
    expect(response).toBe(200);
  }

  async verifyText(text, element) {
    this.text = await this.findValueOrLocatorFromTestData(text, data);
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.waitFor({ state: "visible" });
    const eleText = await this.elementHandle.innerText();
    expect(eleText).toBe(this.text);
  }
};
