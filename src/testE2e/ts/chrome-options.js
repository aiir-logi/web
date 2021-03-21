module.exports = {
    headless: false,
    slowMo: 50,
    defaultViewport: { width: 1920, height: 1080 },
    executablePath: process.env.CHROME_BIN == null ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' : process.env.CHROME_BIN,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
      "--disable-gpu",
      "--start-maximized",
    ],
  }
