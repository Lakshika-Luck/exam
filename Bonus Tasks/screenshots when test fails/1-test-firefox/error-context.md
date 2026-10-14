# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 1.spec.ts >> test
- Location: exam\tests\1.spec.ts:3:5

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[data-test="title"]')
Expected substring: "Test"
Received string:    "Products"
Timeout: 5000ms

Call log:
  - Expect "toContainText" locator('[data-test="title"]') with timeout 5000ms
  - waiting for locator('[data-test="title"]')
    11 × locator resolved to <span class="title" data-test="title">Products</span>
       - unexpected value "Products"

```

```yaml
- text: Products
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('test', async ({ page }) => {
  4  |   await page.goto('https://www.saucedemo.com/');
  5  |     await page.locator('[data-test="username"]').fill('standard_user');
  6  | 
  7  |   await page.locator('[data-test="password"]').fill('secret_sauce');
  8  |   await page.locator('[data-test="login-button"]').click();
> 9  |   await expect(page.locator('[data-test="title"]')).toContainText('Test');
     |                                                     ^ Error: expect(locator).toContainText(expected) failed
  10 | });
```