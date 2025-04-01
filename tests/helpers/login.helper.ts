import { Page } from "@playwright/test";
import { TEST_CONFIG, SELECTORS } from "../config";

export class LoginHelper {
  constructor(private page: Page) {}

  async navigateToLogin() {
    await this.page.goto(TEST_CONFIG.BASE_URL);
    await this.page.getByRole("button", { name: "Login" }).click();
    await this.page.waitForURL(TEST_CONFIG.LOGIN_URL);
  }

  async login(email: string, password: string) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page
      .getByRole("button", { name: "Continue", exact: true })
      .click();
    await this.page.waitForURL(TEST_CONFIG.PRODUCTS_URL);
  }

  async loginWithTestUser() {
    await this.login(
      TEST_CONFIG.TEST_USER.EMAIL,
      TEST_CONFIG.TEST_USER.PASSWORD
    );
  }

  async completeLogin() {
    await this.navigateToLogin();
    await this.loginWithTestUser();
    await this.page
      .getByRole("dialog", { name: "Modal Dialog" })
      .getByRole("img")
      .click({ timeout: 3000 })
      .catch(() => {});
  }
}
