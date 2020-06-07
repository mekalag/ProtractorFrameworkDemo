// conf.js
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html'
});

exports.config = {
  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },
  // Assign the test reporter to each running instance
  onPrepare: function() {
    jasmine.getEnv().addReporter(reporter);
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './',
      filePrefix: 'xmlresults'
    }));

    var fs = require('fs-extra');
 
    fs.emptyDir('screenshots/', function (err) {
      console.log(err);
    });
 
    jasmine.getEnv().addReporter({
      specDone: function(result) {
        if (result.status === 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');
 
            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });  // /Users/kalavathi/Desktop/ProtractorDemo/screenshots/chrome-Protractor Demo App sum.png
  },
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../tests/specs.js'],

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');

      var HTMLReport = require('protractor-html-reporter');

      var testConfig = {
        reportTitle: 'Test Execution Report',
        outputPath: 'htmlReport/',
        screenshotPath: '../screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true
      };
      new HTMLReport().from('xmlresults.xml', testConfig);
    });
  }

};

