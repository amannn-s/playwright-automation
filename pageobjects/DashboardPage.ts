import { Page } from "@playwright/test";

export class DashboardPage {
  page;
  products;
  productsTitle;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsTitle = page.locator(".card-body b");
  }

  async searchProductAddCart(productName: string) {
    const titles = await this.productsTitle.allTextContents();
    console.log(titles);

    const totalProductsCount = await this.products.count();

    for (let i = 0; i <= totalProductsCount - 1; i++) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.page.locator("[routerlink*='/cart']").click();
  }

  async navigateToOrders() {
    await this.page.locator("button[routerlink*='myorders']").click();
  }
}
