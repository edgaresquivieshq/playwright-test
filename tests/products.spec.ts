import { test, expect } from "@playwright/test";
import { LoginHelper } from "./helpers/login.helper";
import { TEST_CONFIG, SELECTORS } from "./config";

test.describe("Base Products Page Tests", () => {
  let loginHelper: LoginHelper;

  test.beforeEach(async ({ page }) => {
    loginHelper = new LoginHelper(page);
    await loginHelper.completeLogin();
  });

  /**
   * Navigator and all essential elements
   */
  test("should display navigator and all essential elements", async ({
    page,
  }) => {
    await expect(page.getByRole("img", { name: "Tukios Logo" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Reporting" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Products" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Users" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Funeral Homes" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Documents" })).toBeVisible();
  });

  /**
   * Products
   */
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
    /** Test Data */
    await expect(page.getByText("Basic Black")).toBeVisible();
    await expect(page.getByText("Mother Pink")).toBeVisible();

    /** Add New Product */
    await page.getByRole("button", { name: "Add Product" }).click();
    await expect(page.getByText("New Product", { exact: true })).toBeVisible();
    await page.getByPlaceholder("Product Name").fill("testdeleteProduct");
    await page.getByPlaceholder("Price").fill("0.03");
    await page.getByPlaceholder("Help Text").fill("testdeleteProduct");
    // await page.getByRole("button", { name: "Add Product" }).click();
    await page
      .getByLabel("Modal Dialog")
      .getByRole("button", { name: "Add Product" })
      .click();
    await expect(page.getByText("testdeleteProduct").first()).toBeVisible();

    /** Edit Product */
    await page
      .locator("tr", { has: page.getByText("testdeleteProduct") })
      .locator("td:last-child svg")
      .click();
    await expect(page.getByText("Update Product").first()).toBeVisible();
    await page
      .getByPlaceholder("Product Name")
      .fill("testdeleteProductUpdated");
    await page.getByPlaceholder("Price").fill("0.06");
    await page.getByPlaceholder("Help Text").fill("testdeleteProductUpdated");
    await page.getByRole("button", { name: "Update Product" }).click();
    await expect(page.getByText("testdeleteProductUpdated")).toBeVisible();

    /** Delete Product */
    await page
      .locator("tr", { has: page.getByText("testdeleteProductUpdated") })
      .locator("td:last-child svg")
      .click();
    await expect(page.getByText("Delete Global Product").first()).toBeVisible();
    await page.getByRole("button", { name: "Delete Global Product" }).click();
    await page.getByRole("button", { name: "Yes" }).click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("testdeleteProductUpdated")).not.toBeVisible();
  });

  /**
   * Categories
   */
  test("view and functionality of categories", async ({ page }) => {
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
    await page.getByPlaceholder("Category Name").fill("testdeleteCategory");
    await page.getByRole("button", { name: "Add category" }).click();

    // edit category
    const editBtn = page
      .locator("label", { hasText: "testdeleteCategory" })
      .first()
      .locator("../..")
      .locator('button[data-testid^="edit-category-"]');
    await editBtn.click();
    await expect(
      page.getByText("Update Category", { exact: true })
    ).toBeVisible();
    await page
      .locator('input[name="updateCategoryName"]')
      .fill("testdeleteUpdatedCategory");
    await page.getByRole("button", { name: "Update category" }).click();

    // delete category
    const deleteBtn = page
      .locator("label", { hasText: "testdeleteUpdatedCategory" })
      .first()
      .locator("../..")
      .locator('button[data-testid^="delete-category-"]');
    await deleteBtn.click();
    await page
      .getByTestId("open-category-modal")
      .getByRole("button", { name: "Close" })
      .click();
  });
});
