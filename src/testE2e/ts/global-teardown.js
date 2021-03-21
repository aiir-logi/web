const {teardown: teardownPuppeteer} = require('jest-environment-puppeteer')
const rimraf = require('rimraf')

module.exports = async function globalTeardown() {
  // Your global teardown
  await global.__NGINX__.stop();
  rimraf.sync(global.__ENVPAATH__);
}
