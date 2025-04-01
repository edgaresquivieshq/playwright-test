import { test, expect } from "@playwright/test";

test.describe("GlobalProductCategoryModal", () => {
  const mockCategories = [
    { id: "1", name: "Category 1" },
    { id: "2", name: "Category 2" },
    { id: "uncategorized", name: "Uncategorized" },
  ];

  test.beforeEach(async ({ page }) => {
    // Mock the API responses
    await page.route("**/global_product_categories", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(mockCategories),
      });
    });

    await page.route("**/global_product_categories/*", async (route) => {
      await route.fulfill({ status: 200 });
    });

    // Navigate to the page where the modal is used
    await page.goto("/your-page-url");
  });

  test("should display categories and allow selection", async ({ page }) => {
    // Open the modal
    await page.click('[data-testid="open-category-modal"]');

    // Verify categories are displayed
    for (const category of mockCategories) {
      await expect(page.getByText(category.name)).toBeVisible();
    }

    // Select a category
    await page.click(`[data-testid="category-radio-${mockCategories[0].id}"]`);

    // Verify selection
    await expect(
      page.getByTestId(`category-radio-${mockCategories[0].id}`)
    ).toBeChecked();
  });

  test("should add a new category", async ({ page }) => {
    await page.click('[data-testid="open-category-modal"]');
    await page.click("text=Add New Category");

    // Fill in the new category form
    await page.fill('[data-testid="category-name-input"]', "New Category");
    await page.click("text=Add category");

    // Verify success toast
    await expect(page.getByText("🎉 Category added!")).toBeVisible();
  });

  test("should update an existing category", async ({ page }) => {
    await page.click('[data-testid="open-category-modal"]');

    // Click edit button for first category
    await page.click(`[data-testid="edit-category-${mockCategories[0].id}"]`);

    // Update category name
    await page.fill(
      '[data-testid="update-category-name-input"]',
      "Updated Category"
    );
    await page.click("text=Update category");

    // Verify success toast
    await expect(page.getByText("🎉 Category updated!")).toBeVisible();
  });

  test("should delete a category", async ({ page }) => {
    await page.click('[data-testid="open-category-modal"]');

    // Click delete button for first category
    await page.click(`[data-testid="delete-category-${mockCategories[0].id}"]`);

    // Verify category is removed from the list
    await expect(page.getByText(mockCategories[0].name)).not.toBeVisible();
  });

  test("should not allow deletion of uncategorized category", async ({
    page,
  }) => {
    await page.click('[data-testid="open-category-modal"]');

    // Verify delete button is not present for uncategorized
    await expect(
      page.getByTestId(`delete-category-uncategorized`)
    ).not.toBeVisible();
  });

  test("should show validation error for empty category name", async ({
    page,
  }) => {
    await page.click('[data-testid="open-category-modal"]');
    await page.click("text=Add New Category");

    // Try to submit without entering a name
    await page.click("text=Add category");

    // Verify validation error
    await expect(
      page.getByText("Please enter name for your category.")
    ).toBeVisible();
  });
});
