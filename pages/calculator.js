
let homePage = function () {

  let firstInput = element(by.model('first'));
  let secondInput = element(by.model('second'));
  //let clickGo = element(by.id('gobutton'));
  let clickGo = element(by.css('[ng-click="doAddition()"]'));
  let result = element(by.tagName('h2'));

  this.get = function(url) {
    browser.get(url);
  };

  this.inputOne = function(first) {
    firstInput.sendKeys(first);
  };

  this.secondOne = function(second) {
    secondInput.sendKeys(second);
  };

  this.clickGoButton = function() {
    clickGo.click();
  };

  this.verifyResult = function(res) {
    expect(result.getText()).toBe(res);
  };
};

module.exports = new homePage(); 
//AppFormsPage.prototype = new OwnAppPage();
//module.exports = AppFormsPage;