import { test, expect, Page } from "@playwright/test";

// Constants
enum CoffeeType {
  ROBUSTA = "ROBUSTA",
  ARABICA = "ARABICA",
}

enum CoffeeFilters {
  ALL = "ALL",
  ROBUSTA = "ROBUSTA",
  ARABICA = "ARABICA",
}

const MIN_EXPECTED_COFFEES = 9;

// Helper functions
async function getCoffeeItems(page: Page) {
  return page.getByTestId("coffee-item");
}

async function getCoffeeCountByType(page: Page, type: string) {
  const coffeeItems = await page.locator(
    `[data-testid="coffee-item"][data-coffee-type="${type}"]`,
  );

  await page.waitForLoadState("networkidle");

  return await coffeeItems.count();
}

async function getTotalCoffeeCount(page: Page) {
  const coffeeItems = await getCoffeeItems(page);
  return await coffeeItems.count();
}

async function selectFilter(page: Page, filterName: string) {
  const filter = page.getByRole("button", { name: filterName });
  await filter.click();
}

async function getFilterButton(page: Page, filterName: string) {
  return page.getByRole("button", { name: filterName });
}

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Filter Buttons", () => {
    test("has all three coffee filters visible", async ({ page }) => {
      const allFilter = await getFilterButton(page, CoffeeFilters.ALL);
      const robustaFilter = await getFilterButton(page, CoffeeFilters.ROBUSTA);
      const arabicaFilter = await getFilterButton(page, CoffeeFilters.ARABICA);

      await expect(allFilter).toBeVisible();
      await expect(robustaFilter).toBeVisible();
      await expect(arabicaFilter).toBeVisible();
    });

    test("'All' filter is selected by default", async ({ page }) => {
      const allFilter = await getFilterButton(page, CoffeeFilters.ALL);

      await expect(allFilter).toHaveAttribute("aria-selected", "true");
    });

    test("only one filter is selected at a time", async ({ page }) => {
      // Click Robusta filter
      await selectFilter(page, CoffeeType.ROBUSTA);

      const robustaFilter = await getFilterButton(page, CoffeeType.ROBUSTA);
      const allFilter = await getFilterButton(page, CoffeeFilters.ALL);

      await expect(robustaFilter).toHaveAttribute("aria-selected", "true");
      await expect(allFilter).not.toHaveAttribute("aria-selected", "true");
    });
  });

  test.describe("Default State", () => {
    test("displays coffees on initial load", async ({ page }) => {
      const coffeeItems = await getCoffeeItems(page);

      await expect(coffeeItems.first()).toBeVisible();
      const count = await getTotalCoffeeCount(page);
      expect(count).toBeGreaterThanOrEqual(MIN_EXPECTED_COFFEES);
    });

    test("displays both Robusta and Arabica coffees by default", async ({
      page,
    }) => {
      const robustaCount = await getCoffeeCountByType(page, CoffeeType.ROBUSTA);
      const arabicaCount = await getCoffeeCountByType(page, CoffeeType.ARABICA);

      expect(robustaCount).toBeGreaterThan(0);
      expect(arabicaCount).toBeGreaterThan(0);
    });
  });

  test.describe("Filter Functionality", () => {
    test("'All' filter displays all coffee types", async ({ page }) => {
      // First select a different filter
      await selectFilter(page, CoffeeType.ROBUSTA);

      // Then select 'All' filter
      await selectFilter(page, CoffeeFilters.ALL);

      const robustaCount = await getCoffeeCountByType(page, CoffeeType.ROBUSTA);
      const arabicaCount = await getCoffeeCountByType(page, CoffeeType.ARABICA);

      expect(robustaCount).toBeGreaterThan(0);
      expect(arabicaCount).toBeGreaterThan(0);
    });

    test("'Robusta' filter displays only Robusta coffees", async ({ page }) => {
      await selectFilter(page, CoffeeType.ROBUSTA);

      const robustaCount = await getCoffeeCountByType(page, CoffeeType.ROBUSTA);
      const arabicaCount = await getCoffeeCountByType(page, CoffeeType.ARABICA);

      expect(robustaCount).toBeGreaterThan(0);
      expect(arabicaCount).toBe(0);
    });

    test("'Arabica' filter displays only Arabica coffees", async ({ page }) => {
      await selectFilter(page, CoffeeType.ARABICA);

      const robustaCount = await getCoffeeCountByType(page, CoffeeType.ROBUSTA);
      const arabicaCount = await getCoffeeCountByType(page, CoffeeType.ARABICA);

      expect(arabicaCount).toBeGreaterThan(0);
      expect(robustaCount).toBe(0);
    });

    test("can toggle between filters multiple times", async ({ page }) => {
      // Select Robusta
      await selectFilter(page, CoffeeType.ROBUSTA);
      let robustaCount = await getCoffeeCountByType(page, CoffeeType.ROBUSTA);
      expect(robustaCount).toBeGreaterThan(0);

      // Select Arabica
      await selectFilter(page, CoffeeType.ARABICA);
      let arabicaCount = await getCoffeeCountByType(page, CoffeeType.ARABICA);
      expect(arabicaCount).toBeGreaterThan(0);

      // Back to Robusta
      await selectFilter(page, CoffeeType.ROBUSTA);
      robustaCount = await getCoffeeCountByType(page, CoffeeType.ROBUSTA);
      arabicaCount = await getCoffeeCountByType(page, CoffeeType.ARABICA);

      expect(robustaCount).toBeGreaterThan(0);
      expect(arabicaCount).toBe(0);
    });
  });

  test.describe("Edge Cases", () => {
    test("clicking the same filter twice maintains the selection", async ({
      page,
    }) => {
      const robustaFilter = await getFilterButton(page, CoffeeType.ROBUSTA);

      await selectFilter(page, CoffeeType.ROBUSTA);
      await selectFilter(page, CoffeeType.ROBUSTA);

      await expect(robustaFilter).toHaveAttribute("aria-selected", "true");

      const robustaCount = await getCoffeeCountByType(page, CoffeeType.ROBUSTA);
      expect(robustaCount).toBeGreaterThan(0);
    });
  });
});
