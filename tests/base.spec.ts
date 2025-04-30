import { test, expect } from "@playwright/test";
import { LoginHelper } from "./helpers/login.helper";
import { TEST_CONFIG } from "./config";

test.describe("Base Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_CONFIG.BASE_URL);
  });

  test("should display all essential elements before the login", async ({
    page,
  }) => {
    const logo = page.getByRole("img", { name: "Tukios Logo" });
    const arrangementsText = page
      .getByRole("complementary")
      .filter({ hasText: "Arrangements." });
    const welcomeHeading = page.getByRole("heading", { name: "Welcome back." });
    const loginHeading = page.getByRole("heading", {
      name: "Login to your account.",
    });
    const loginButton = page.getByRole("button", { name: "Login" });

    await Promise.all([
      expect(logo).toBeVisible(),
      expect(arrangementsText).toBeVisible(),
      expect(welcomeHeading).toBeVisible(),
      expect(loginHeading).toBeVisible(),
      expect(loginButton).toBeVisible(),
    ]);
  });
});

test.describe("Login Page Complete Tests", () => {
  let loginHelper: LoginHelper;

  test.beforeEach(async ({ page }) => {
    loginHelper = new LoginHelper(page);
    await loginHelper.navigateToLogin();
  });

  test("should display login form elements", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
    await expect(page.locator("#username")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Continue", exact: true })
    ).toBeVisible();
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await expect(page.getByText("Wrong email or password")).toBeVisible();
  });

  test("forgot password and return", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Forgot password?" })
    ).toBeVisible();
    await page.getByRole("link", { name: "Forgot password?" }).click();
    await expect(
      page.getByRole("heading", { name: "Forgot Your Password?" })
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Email address" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Back to Arrangements" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Back to Arrangements" }).click();
  });

  test("success on valid credentials", async ({ page }) => {
    await loginHelper.loginWithTestUser();
    await page.waitForURL(TEST_CONFIG.PRODUCTS_URL);
    await expect(
      page.getByRole("heading", { name: "Global Products" })
    ).toBeVisible();
  });
});

test.describe("google login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_CONFIG.BASE_URL);
  });

  test("should display google login button", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Continue with Google" }).click();
    await page.getByRole("textbox", { name: "Email or phone" }).click();
    await page
      .getByRole("textbox", { name: "Email or phone" })
      .fill(TEST_CONFIG.TEST_USER_GOOGLE.EMAIL);
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .getByRole("textbox", { name: "Enter your password" })
      .fill(TEST_CONFIG.TEST_USER_GOOGLE.PASSWORD);
    await page.getByRole("button", { name: "Next" }).click();
    await expect(
      page.getByRole("heading", { name: "Global Products" })
    ).toBeVisible();
  });
});
