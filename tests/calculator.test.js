const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:3001');

    // Test addition
    await driver.findElement(By.id('two')).click();
    await driver.findElement(By.id('three')).click();
    await driver.findElement(By.id('add')).click();
    await driver.findElement(By.id('four')).click();
    await driver.findElement(By.id('five')).click();
    await driver.findElement(By.id('equal')).click();

    await driver.wait(async function() {
      const result = await driver.findElement(By.id('result')).getAttribute('textContent');
      return result === '68';
    }, 10000);

    result = await driver.findElement(By.id('result')).getAttribute('textContent');;

    assert.equal(result, '68');

    // Test subtraction
    await driver.findElement(By.id('seven')).click();
    await driver.findElement(By.id('five')).click();
    await driver.findElement(By.id('subtract')).click();
    await driver.findElement(By.id('two')).click();
    await driver.findElement(By.id('zero')).click();
    await driver.findElement(By.id('equal')).click();
    await driver.wait(async function() {
      const result = await driver.findElement(By.id('result')).getAttribute('textContent');
      return result === '55';
    }, 10000);
    result = await driver.findElement(By.id('result')).getAttribute('textContent');
    assert.equal(result, '55');

    // Test division
    await driver.findElement(By.id('three')).click();
    await driver.findElement(By.id('six')).click();
    await driver.findElement(By.id('divide')).click();
    await driver.findElement(By.id('two')).click();
    await driver.findElement(By.id('equal')).click();
    await driver.wait(async function() {
      const result = await driver.findElement(By.id('result')).getAttribute('textContent');
      return result === '18';
    }, 10000);
    result = await driver.findElement(By.id('result')).getText();
    assert.equal(result, '18');

    // Test multiplication
    await driver.findElement(By.id('five')).click();
    await driver.findElement(By.id('multiply')).click();
    await driver.findElement(By.id('nine')).click();
    await driver.findElement(By.id('equal')).click();
    await driver.wait(async function() {
      const result = await driver.findElement(By.id('result')).getAttribute('textContent');
      return result === '45';
    }, 10000);
    result = await driver.findElement(By.id('result')).getText();
    assert.equal(result, '45');
    
    console.log('All tests passed!');
  } finally {
    await driver.quit();
  }
})();
