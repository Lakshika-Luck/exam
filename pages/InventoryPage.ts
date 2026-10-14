import type { Locator, Page } from '@playwright/test';

export type Product = 'sauce-labs-backpack' | 'sauce-labs-bolt-t-shirt';

export class InventoryPage {
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly itemNames: Locator;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  itemName(name: string): Locator {
    return this.itemNames.filter({ hasText: name });
  }

  async getItemPriceTexts(): Promise<string[]> {
    return this.itemPrices.allTextContents();
  }

  async addToCart(product: Product): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${product}"]`).click();
  }

  async sortBy(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
