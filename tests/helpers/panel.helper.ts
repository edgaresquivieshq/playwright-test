import { Page } from "@playwright/test";
import { TEST_CONFIG, SELECTORS } from "../config";

export class PanelHelper {
  constructor(private page: Page) {}

  async navigateToLogin() {
    await this.page.goto(TEST_CONFIG.BASE_URL);
    await this.page.getByRole("button", { name: "Login" }).click();
    await this.page.waitForURL(TEST_CONFIG.LOGIN_URL);
  }
}
