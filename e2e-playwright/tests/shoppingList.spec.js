const { test, expect } = require("@playwright/test");

test("Create and list shopping lists", async ({ page }) => {
  await page.goto("http://localhost:7777/lists");
  const taskName = `My task: ${Math.random()}`;
  await page.locator("input[type=text]").type(taskName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await expect(page.locator(`a >> text='${taskName}'`)).toHaveText(taskName);
});

test("Show a single shopping list", async ({ page }) => {
  await page.goto("http://localhost:7777/lists");
  const taskName = `${Math.random()}`;
  await page.locator("input[type=text]").type(taskName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await page.locator(`a >> text='${taskName}'`).click();
  await expect(page.locator("h1")).toHaveText(taskName);
});

test("add and list items for a single shopping list", async ({ page }) => {
  await page.goto("http://localhost:7777/lists");
  const taskName = `${Math.random()}`;
  await page.locator("input[type=text]").type(taskName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await page.locator(`a >> text='${taskName}'`).click();
  await expect(page.locator("h1")).toHaveText(taskName);
  const itemName = `${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit][value='Start a list entry!']").click({ timeout: 60000 });
  await expect(page.locator(`text=${itemName}`)).toBeVisible(); 
});

test("mark items in the shopping list as collected.", async ({ page }) => {
  await page.goto("http://localhost:7777/lists");
  const taskName = `${Math.random()}`;
  await page.locator("input[type=text]").type(taskName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await page.locator(`a >> text='${taskName}'`).click();
  await expect(page.locator("h1")).toHaveText(taskName);
  const itemName = `${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit][value='Start a list entry!']").click({ timeout: 60000 });
  await expect(page.locator(`text=${itemName}`)).toBeVisible(); 
  await expect(page.locator(`li:has-text("${itemName}") >> text="Mark collected"`)).toBeVisible();
  await page.locator("input[type=submit][value='Mark collected']").click({ timeout: 60000 });
});

test("deactivate shopping lists", async ({ page }) => {
  await page.goto("http://localhost:7777/lists");
  const taskName = `${Math.random()}`;
  await page.locator("input[type=text]").type(taskName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await page.locator(`a >> text='${taskName}'`).click();
  await expect(page.locator("h1")).toHaveText(taskName);
  await page.locator("input[type=submit][value='Deactivate list!']").click({ timeout: 60000 });
  await page.goto("http://localhost:7777/lists");
});




