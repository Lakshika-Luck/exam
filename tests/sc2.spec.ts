import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { getLoginData } from './login-data';

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const { username, password } = getLoginData('standard-user');

  await loginPage.goto();
  await loginPage.login(username, password);
  await inventoryPage.sortBy('lohi');
  await expect(inventoryPage.sortDropdown).toHaveValue('lohi');

  const priceTexts = await inventoryPage.getItemPriceTexts();
  const pricesInCents = priceTexts.map((price) => {
    const match = price.trim().match(/^\$(\d+)\.(\d{2})$/);
    if (!match) {
      throw new Error(`Could not read product price: ${price}`);
    }

    return Number(match[1]) * 100 + Number(match[2]);
  });

  expect(pricesInCents.length).toBeGreaterThan(0);
  expect(pricesInCents).toEqual([...pricesInCents].sort((a, b) => a - b));
});
