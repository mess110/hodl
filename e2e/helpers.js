import { Builder, until, By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

var options = new chrome.Options();
options.addArguments('--headless');

export const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .usingServer('http://localhost:4444/wd/hub')
  .build();

afterAll(async () => {
  // Cleanup `process.on('exit')` event handlers to prevent a memory leak caused by the combination of `jest` & `tmp`.
  for (const listener of process.listeners('exit')) {
    listener();
    process.removeListener('exit', listener);
  }
  await driver.quit();
});

export const defaultTimeout = 10e3;

const rootSelector = { css: '#root' };
export const root = () => driver.findElement(rootSelector);

export const load = async () => {
  await driver.get(`${__baseUrl__}/`);
  await driver.wait(until.elementLocated(root), defaultTimeout);
};

// Helper functions when writing tests

export const title = async () => {
  return await driver.getTitle();
};

export const click = async (selector) => {
  var tmp = await driver.findElement(By.css(selector));
  await tmp.click();
};

export const attr = async (selector, attribute) => {
  var tmp = await driver.findElement(By.css(selector));
  return await tmp.getAttribute(attribute);
}

export const setAttr = async (selector, value) => {
  var tmp = await driver.findElement(By.css(selector));
  await tmp.sendKeys(value);
}

export const innerHTML = async (selector, index) => {
  if (index !== undefined && index !== null) {
    return await driver.executeScript(function(selector, index) {
      return $(selector)[index].innerHTML;
    }, selector, index)
  } else {
    return await driver.executeScript(function(selector) {
      return $(selector).innerHTML;
    }, selector);
  }
}

// Forgive Me Father (I Have Sinned)
export const sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
