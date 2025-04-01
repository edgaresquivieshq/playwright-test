import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/admin/s/products");
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("edgar+playw@builtbyhq.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("Edgar123123");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("dialog", { name: "Modal Dialog" }).click();
  await page
    .getByRole("dialog", { name: "Modal Dialog" })
    .getByRole("img")
    .click();
  await page.getByText("Basic Black").click();
  await page.getByText("Golden Hummingbird Wood").click();
  await page.getByText("Sapphire").click();
  await page.getByRole("button", { name: "Add Product" }).click();
  await page.getByPlaceholder("Product Name").click();
  await page.getByPlaceholder("Product Name").fill("testdelete");
  await page.getByPlaceholder("Price").click();
  await page.getByPlaceholder("Price").fill("0.003");
  await page.getByPlaceholder("Help Text").click();
  await page.getByPlaceholder("Help Text").fill("testdelete");
  await page
    .getByTestId("select-global_product_category_id")
    .selectOption("f2930bff-1ec0-45a0-ac68-dafcc9b65f38");
  await page
    .getByLabel("Modal Dialog")
    .getByRole("button", { name: "Add Product" })
    .click();
  // await page.locator("nextjs-portal > div > div").first().click();
  // await page.getByRole("button", { name: "Close" }).click();
  await page.getByText("testdelete").click();
  await page
    .getByRole("row", {
      name: "https://tukioshqbucket.s3.amazonaws.com/6b9ca4680e864948fa2a8e923190daf8fb3e7bda2617475db914de5794929b2c.png testdelete Uncategorized $0.00",
      exact: true,
    })
    .locator("svg")
    .click();
  await page.getByRole("button", { name: "Delete Global Product" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.locator("header").getByRole("link", { name: "Contact" }).click();
});
