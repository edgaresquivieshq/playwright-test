import { test, expect } from "@playwright/test";

test("article news pg-expanding", async ({ page }) => {
  await page.goto("https://www.paramountglobal.com/");
  await page.getByText("Resources", { exact: true }).click();
  await page.locator("header").getByRole("link", { name: "News" }).click();
  await page.getByRole("textbox", { name: "Search" }).click();
  await page.getByRole("textbox", { name: "Search" }).fill("texas");
  await page.getByRole("button", { name: "Search" }).click();
  await page
    .getByRole("link", { name: "Paramount Global Is Expanding" })
    .click();
});
