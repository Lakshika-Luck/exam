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
  await expect(cartPage.title).toContainText('Your Cart');
  await expect(cartPage.checkoutButton).toContainText('Checkout');
  await cartPage.checkout();
  await expect(checkoutPage.title).toContainText('Checkout: Your Information');
  await checkoutPage.fillInformation('Lakshika', 'Rasanjali', '11200');
  await expect(checkoutPage.continueButton).toContainText('Continue');
  await checkoutPage.continue();
  await expect(checkoutPage.title).toContainText('Checkout: Overview');
  await expect(checkoutPage.finishButton).toContainText('Finish');
  await checkoutPage.finish();
  await expect(checkoutPage.title).toContainText('Checkout: Complete!');
  await expect(checkoutPage.completeHeader).toContainText('Thank you for your order!');
});
