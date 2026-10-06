import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";

test(`End To End Testing`, async ({ page }) => {
  const BASE_URL = "https://rahulshettyacademy.com/client";
  const email = "amantesting@gmail.com";
  const password = "Testing1234$";
  const productName = "ADIDAS ORIGINAL";
  const address = " India";
  const poManager = new POManager(page);

  // Login Page
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo(BASE_URL);
  await loginPage.validLogin(email, password);

  await page.locator(".card-body b").first().waitFor();
  // Dashboard Page
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();

  // Cart Page
  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductDisplay(productName);
  await cartPage.checkout();

  // OrderReview Page
  const orderReviewPage = poManager.getOrderReviewPage();
  orderReviewPage.searchCountryAndSelect("ind", address, email);
  const orderId = await orderReviewPage.submitAndGetOrderId();

  await dashboardPage.navigateToOrders();

  // My Orders Page
  const ordersHistoryPage = poManager.getOrderHistoryPage();

  if (orderId !== null) {
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  }
});
