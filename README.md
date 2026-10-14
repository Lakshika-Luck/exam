# Playwright Tests

## Setup

Install [Node.js](https://nodejs.org/), then from this folder install the project dependencies and Playwright browsers:

```bash
npm ci
npx playwright install
```

## Run tests

Run the suite in all configured browsers (Chromium, Firefox, and WebKit):

```bash
npm test
```

To run in a visible browser, or only in Chromium:

```bash
npm run test:headed
npm run test:chromium
```

The HTML report is generated after a run. Open it with:

```bash
npx playwright show-report
```

Tests use the SauceDemo URL configured in `test.settings.ts`.

Page locators and browser interactions are organized in `pages/`; test files contain the assertions.

Login credentials and expected login results are stored in `tests/data/login-data.json`. Update that file to change login data; tests load it through `tests/login-data.ts`.
