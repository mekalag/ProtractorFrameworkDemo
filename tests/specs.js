// spec.js
let homePage = require('../pages/calculator');

describe('Protractor Demo App', () => {
  it('sum', () => {
    homePage.get('http://juliemr.github.io/protractor-demo/');
    homePage.inputOne(5);
    homePage.secondOne(6);
    homePage.clickGoButton();
    homePage.verifyResult('11');
    //browser.sleep(5000);
  });
});
