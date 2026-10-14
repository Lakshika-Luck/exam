import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="cart-list"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="cart-list"] [data-test="inventory-item-price"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async getItemPriceTexts(): Promise<string[]> {
    return this.itemPrices.allTextContents();
  }
}
