import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { getLoginData } from './login-data';

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const { username, password } = getLoginData('standard-user');

  await loginPage.goto();
  await loginPage.login(username, password);
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
  await inventoryPage.openCart();
  const itemPrices = await cartPage.getItemPriceTexts();
  await expect(cartPage.itemPrices).toHaveText([
    '$29.99',
    '$15.99',
  ]);
  const itemTotalInCents = itemPrices.reduce(
    (total, price) => total + Math.round(Number(price.replace('$', '')) * 100),
    0,
  );
  await cartPage.checkout();
  await checkoutPage.fillInformation('Lakshika', 'Rasanjali', '11200');
  await checkoutPage.continue();
  await expect(checkoutPage.title).toContainText('Checkout: Overview');
  await expect(checkoutPage.totalInfoLabel).toContainText('Price Total');
  await expect(checkoutPage.subtotalLabel).toHaveText(
    `Item total: $${(itemTotalInCents / 100).toFixed(2)}`,
  );
});
