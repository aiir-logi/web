import 'expect-puppeteer'
import {Page} from "puppeteer";
require('dotenv').config();

const globalAny: any = global;
let page: Page;

describe('Home', () => {
  beforeAll(async () => {
    const context = await globalAny.__BROWSER__.createIncognitoBrowserContext();
    page = await context.newPage();
    const appUrl = process.env.BASE_APP_URL;
    await page.goto(`${appUrl}`, {
      waitUntil: 'networkidle0',
    })
  })

  it('should display "Nie #w4rto" text on page', async () => {
    await expect(page).toMatch('Nie #w4rto')
  })
})
