import { test, expect } from "@playwright/test";
import { LoginHelper } from "./helpers/login.helper";
import { TEST_CONFIG, SELECTORS } from "./config";

test.describe("Base Products Page Tests", () => {
  let loginHelper: LoginHelper;

  test.beforeEach(async ({ page }) => {
    loginHelper = new LoginHelper(page);
    await loginHelper.completeLogin();
  });

  test("should display navigator all essential elements", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Tukios Logo" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Reporting" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Products" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Users" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Funeral Homes" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Documents" })).toBeVisible();
  });

  test("should display products table all essential elements", async ({
    page,
  }) => {
    /** Table Heading */
    await expect(
      page.getByRole("heading", { name: "Global Products" })
    ).toBeVisible();
    await expect(page.getByText("Product", { exact: true })).toBeVisible();
    await expect(page.getByText("Category", { exact: true })).toBeVisible();
    await expect(page.getByText("Price", { exact: true })).toBeVisible();
    await expect(page.getByText("Edit", { exact: true })).toBeVisible();
    /** Table Rows */
    await expect(page.getByText("Basic Black")).toBeVisible();
    await expect(page.getByText("Mother Pink")).toBeVisible();
  });

  test("view categories", async ({ page }) => {
    await page.getByRole("button", { name: "View Categories" }).click();
    // essential - table - buttons
    await expect(
      page.getByTestId("open-category-modal").getByText("Categories")
    ).toBeVisible();
    await expect(
      page.getByTestId("open-category-modal").getByText("Uncategorized")
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Add New Category" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Close" })).toBeVisible();

    // add category
    await page.getByRole("button", { name: "Add New Category" }).click();
    await page.getByRole("button", { name: "Add category" }).click();
    await expect(page.getByText("Please enter name for your")).toBeVisible();
    await page.getByPlaceholder("Category Name").fill("testdelete");
    await page.getByRole("button", { name: "Add category" }).click();

    // edit category
    const editBtn = page
      .locator("label", { hasText: "testdelete" })
      .first()
      .locator("../..")
      .locator('button[data-testid^="edit-category-"]');
    await editBtn.click();
    await expect(
      page.getByText("Update Category", { exact: true })
    ).toBeVisible();
    await page
      .locator('input[name="updateCategoryName"]')
      .fill("testdeleteUpdated");
    await page.getByRole("button", { name: "Update category" }).click();

    // delete category
    const deleteBtn = page
      .locator("label", { hasText: "testdeleteUpdated" })
      .first()
      .locator("../..")
      .locator('button[data-testid^="delete-category-"]');
    await deleteBtn.click();
  });

  test("add new product", async ({ page }) => {
    // essential - table - buttons
    // add category
    // edit category
    // delete category
  });
});
