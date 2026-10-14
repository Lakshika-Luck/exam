import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { getLoginData } from './login-data';

function parseAmountInCents(label: string, text: string | null): number {
  const amount = text?.match(/\$(\d+)\.(\d{2})$/);
  if (!amount) {
    throw new Error(`Could not read a two-decimal amount from ${label}: ${text}`);
  }

  return Number(amount[1]) * 100 + Number(amount[2]);
}

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
  await expect(cartPage.cartItems).toContainText('$29.99');
  await expect(cartPage.cartItems).toContainText('$15.99');
  await cartPage.checkout();
  await checkoutPage.fillInformation('Lakshika', 'Rasanjali', '11200');
  await checkoutPage.continue();
  await expect(cartPage.cartItems).toContainText('$29.99');
  await expect(cartPage.cartItems).toContainText('$15.99');
  await expect(checkoutPage.totalInfoLabel).toContainText('Price Total');
  await expect(checkoutPage.subtotalLabel).toContainText('$45.98');
  await expect(checkoutPage.subtotalLabel).toContainText('Item total:');
  await expect(checkoutPage.taxLabel).toContainText('Tax:');
  await expect(checkoutPage.taxLabel).toContainText('$3.68');
  await expect(checkoutPage.totalLabel).toContainText('Total:');
  await expect(checkoutPage.totalLabel).toContainText('$49.66');

  const itemTotalInCents = parseAmountInCents('Item total', await checkoutPage.getSubtotalText());
  const taxInCents = parseAmountInCents('Tax', await checkoutPage.getTaxText());
  const orderTotalInCents = itemTotalInCents + taxInCents;
  await expect(checkoutPage.totalLabel).toHaveText(
    `Total: $${(orderTotalInCents / 100).toFixed(2)}`,
  );
});
