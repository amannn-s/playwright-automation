import { expect, Page } from "@playwright/test";

export class CartPage {
  page;
  cartProducts;
  checkoutButton;

  constructor(page: Page) {
    this.page = page;
    this.cartProducts = page.locator(".cart li");
    this.checkoutButton = page.locator("text=Checkout");
  }

  async VerifyProductDisplay(productName: string) {
    await this.cartProducts.waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  getProductLocator(productName: string) {
    return this.page.locator(`h3:has-text("${productName}")`);
  }
}
