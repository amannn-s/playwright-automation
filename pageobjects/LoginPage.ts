import { Page } from "@playwright/test";

export class LoginPage {
  page;
  emailInput;
  passwordInput;
  loginButton;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("input#userEmail");
    this.passwordInput = page.locator("input#userPassword");
    this.loginButton = page.locator(".login-btn");
  }

  async goTo(url: string) {
    await this.page.goto(url);
  }

  async validLogin(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
