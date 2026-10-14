import { defineConfig, devices } from '@playwright/test';
import { testSettings } from './test.settings';

const isCI = Boolean((globalThis as { process?: { env?: { CI?: string } } }).process?.env?.CI);
type BrowserName = (typeof testSettings.browsers)[number];

const browserDevices = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari'],
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 1000000,   // Timeout for each test if 3test run beyond this time, it will be considered as failed
  globalTimeout: 10000000, // Global timeout for the entire test suite if test takes  more than this time 10 mins, the entire test suite will be considered as failed 
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: testSettings.baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    actionTimeout: 0, // Timeout for each action if action takes more than this time, it will be considered as failed
    ignoreHTTPSErrors: true, // Ignore HTTPS errors for all the tests
    video: 'retain-on-failure', // Record video only on failure
    screenshot: 'only-on-failure', // Take screenshot only on failure
    headless: testSettings.headless,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name:"setup", //THis is dependency.  setup project to run before other projects, this project will run first and then other projects will run
      testMatch: /.*\.setup\.ts/,// Match only setup files(regex-> regular expression)
      //Here playwright knows how to match file names with setup.ts for theproject, so it will only run the setup files and not the other test files
      //if we haven't mentioned testMatch, then it will run all the test files  with .test, .spec, .ts, .js(mentioned in playwright documentation)  
    },
    ...testSettings.browsers.map((name: BrowserName) => ({
      name,
      dependencies: ['setup'],
      use: {
        ...browserDevices[name],
        ...(name === 'chromium' ? { permissions: ['clipboard-read'] } : {}),
      },
    })),

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !isCI,
  // },
});
