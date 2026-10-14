import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { loginScenarios } from './login-data';

for (const { id, username, password, expectedResult } of loginScenarios) {
  test(`login scenario: ${id}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(username, password);

    if (expectedResult === 'Products') {
      await expect(inventoryPage.title).toHaveText(expectedResult);
    } else {
      await expect(loginPage.errorMessage).toHaveText(expectedResult);
    }
  });
}
