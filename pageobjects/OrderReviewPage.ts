import { expect, Page } from "@playwright/test";

export class OrderReviewPage {
  page;
  countryInput;
  dropdown;
  emailId;
  submitButton;
  orderConfirmationText;
  orderId;

  constructor(page: Page) {
    this.page = page;
    this.countryInput = page.locator("[placeholder='Select Country']");
    this.dropdown = page.locator(".ta-results");
    this.emailId = page.locator(".input.ng-valid.text-validated");
    this.submitButton = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async searchCountryAndSelect(
    input: string,
    countryName: string,
    email: string,
  ) {
    await this.countryInput.pressSequentially(input, { delay: 100 });

    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();

    for (let i = 0; i <= optionsCount - 1; i++) {
      const buttonName = await this.dropdown
        .locator("button")
        .nth(i)
        .textContent();

      if (buttonName === countryName) {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }

    expect(await this.emailId.inputValue()).toContain(email);
  }

  async submitAndGetOrderId() {
    await this.submitButton.click();

    await expect(this.orderConfirmationText).toHaveText(
      " Thankyou for the order. ",
    );

    return await this.orderId.textContent();
  }
}
