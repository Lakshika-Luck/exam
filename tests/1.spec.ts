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
  await expect(inventoryPage.title).toContainText('Products');
});
