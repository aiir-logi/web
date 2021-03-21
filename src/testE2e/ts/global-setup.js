const {setup: setupPuppeteer} = require('jest-environment-puppeteer')
const {GenericContainer} = require('testcontainers');
const path = require('path');
const fs = require('fs');
const ip = require('ip');
const fetch = require('node-fetch');

const ipAddress = process.env.NODE_NAME ?? ip.address();
const pathToStaticBuildContents = '/build/resources/main/static';

module.exports = async function globalSetup() {
  //ngnix container setup
  const nginxContainer = await getNginxContainer();
  global.__NGINX__ = nginxContainer;
  const appPort = await nginxContainer.getMappedPort(80).toString();
  await forContainerToStart(appPort, 10000);
  const appUrl = `${ipAddress}:${appPort}`
  await writeEnvVariables(appUrl);

}

async function writeEnvVariables(appUrl) {
  const BASE_APP_URL = appUrl;
  console.log(`\nWebapp @ http://${BASE_APP_URL}`);
  const dotEnvPath = path.join(process.cwd(), '/.env');
  global.__ENVPAATH__ = dotEnvPath;

  await fs.writeFile(dotEnvPath,
    `BASE_APP_URL=http://${BASE_APP_URL}\n`, () => {
    });
}


async function getNginxContainer() {
  return await new GenericContainer("nginx", "stable-alpine")
    .withCmd(['nginx', '-g', 'daemon off;'])
    .withBindMount(path.join(process.cwd(), pathToStaticBuildContents), '/usr/share/nginx/html')
    .withBindMount(path.join(process.cwd(), '/src/testE2e/resources/server-config/ng.conf'), '/etc/nginx/conf.d/default.conf')
    .withExposedPorts(80)
    .start();
}


async function forContainerToStart(mappedPort, timeout) {
  let isCntrStarted = false;
  const startTime = Date.now();
  let timePassed = 0;
  while (!isCntrStarted && timePassed < timeout) {
    await fetch(`http://${ipAddress}:${mappedPort}`).then(response => {
      if (response.ok) {
        isCntrStarted = true;
      }
    });
    timePassed = Date.now() - startTime;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return isCntrStarted;
}
