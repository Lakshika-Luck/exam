import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { getLoginData } from './login-data';

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const { username, password } = getLoginData('standard-user');

  await loginPage.goto();
  await loginPage.login(username, password);
  await expect(inventoryPage.itemName('Sauce Labs Backpack')).toContainText('Sauce Labs Backpack');
  await inventoryPage.addToCart('sauce-labs-backpack');
  await expect(inventoryPage.itemName('Sauce Labs Bolt T-Shirt')).toContainText(
    'Sauce Labs Bolt T-Shirt',
  );
  await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
  await inventoryPage.openCart();
  await expect(cartPage.itemNames).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bolt T-Shirt',
  ]);
});
