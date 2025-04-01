import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.paramountglobal.com/");
  await page.getByRole("link", { name: "Products", exact: true }).click();
  await page
    .getByRole("link", { name: "Small family of glass bottles" })
    .click();
  await page
    .getByRole("link", { name: "200 cc glass cobalt packer 45" })
    .click();
  await page
    .getByRole("link", { name: "60 cc glass amber packer 38-" })
    .click();
  await page.getByRole("heading", { name: "60cc 38-400 Amber Glass" }).click();
});
