import teremock from 'teremock'
import 'expect-puppeteer'
import {Page} from "puppeteer";
import * as path from "path";
require('dotenv').config();

const globalAny: any = global;
let page: Page;

describe('Tasks', () => {
  beforeAll(async () => {
    const context = await globalAny.__BROWSER__.createIncognitoBrowserContext();
    page = await context.newPage();
    const appUrl = process.env.BASE_APP_URL;
    const mockOptions = {
      page: page,
      interceptors: {
        list: {
          url: 'api/tasks',
          methods: 'get'
        }
      },
      wd: path.resolve(__dirname, '../../resources/mocks/tasks')
    }
    await teremock.start(mockOptions)
    await page.goto(`${appUrl}/tasks`, {
      waitUntil: 'networkidle0',
    })
  })

  afterAll(async () => {
    await teremock.stop()
  })

  it('should display table', async () => {
    await expect(page).toMatch("No data found")
  })
})
