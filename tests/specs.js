// spec.js
let homePage = require('../pages/calculator');

describe('Protractor Demo App', () => {
  it('sum', () => {
    homePage.get('http://juliemr.github.io/protractor-demo/');
    homePage.inputOne(4);
    homePage.secondOne(5);
    homePage.clickGoButton();
    homePage.verifyResult('98');
    //browser.sleep(5000);
  });
});
