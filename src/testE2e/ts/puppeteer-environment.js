// puppeteer_environment.js
const fs = require("fs");
const os = require("os");
const path = require("path");
const puppeteer = require("puppeteer");
const NodeEnvironment = require("jest-environment-node");
const chromeOptions = require('./chrome-options.js')

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");
let browser;

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    // connect to puppeteer chromium instance via config's executablePath
    var config = await this.getConfig();
    browser = await puppeteer.launch(config);
    this.global.__BROWSER__ = browser;
  }

  async teardown() {
    await browser.close();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }

  async getConfig() {
    let conf;

    conf =
      process.env.LOCAL_ENV === "true"
        ? chromeOptions
        : {
          executablePath: process.env.CHROME_BIN,
          slowMo: 50,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-background-timer-throttling",
            "--disable-backgrounding-occluded-windows",
            "--disable-renderer-backgrounding",
          ],
        };

    return conf;
  }
}

module.exports = PuppeteerEnvironment;
