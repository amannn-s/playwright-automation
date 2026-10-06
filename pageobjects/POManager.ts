import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";
import { CartPage } from "./CartPage";
import { OrderReviewPage } from "./OrderReviewPage";
import { OrdersHistoryPage } from "./OrderHistoryPage";
import { Page } from "@playwright/test";

export class POManager {
  loginPage;
  dashboardPage;
  cartPage;
  orderReviewPage;
  orderHistoryPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPage = new CartPage(page);
    this.orderReviewPage = new OrderReviewPage(page);
    this.orderHistoryPage = new OrdersHistoryPage(page);
  }

  // getter methods
  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getOrderReviewPage() {
    return this.orderReviewPage;
  }

  getOrderHistoryPage() {
    return this.orderHistoryPage;
  }
}
