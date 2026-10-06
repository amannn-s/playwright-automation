import { Page } from "@playwright/test";

export class OrdersHistoryPage {
  page;
  ordersTable;
  rows;
  orderIdDetails;

  constructor(page: Page) {
    this.page = page;
    this.ordersTable = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderIdDetails = page.locator(".col-text");
  }

  async searchOrderAndSelect(orderId: string) {
    await this.ordersTable.waitFor();
    for (let i = 0; i < (await this.rows.count()); ++i) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      if (rowOrderId !== null) {
        if (orderId.includes(rowOrderId)) {
          await this.rows.nth(i).locator("button").first().click();
          break;
        }
      }
    }
  }

  async getOrderId() {
    const orderId = await this.orderIdDetails.textContent();
    if (orderId !== null) return orderId;
    return "";
  }
}
