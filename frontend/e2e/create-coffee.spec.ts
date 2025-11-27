import { test, expect, Page } from "@playwright/test";

test.describe("Create Coffee", () => {
  test.describe("Modal navigation", () => {
    test("should open the create coffee modal when clicking the 'Create' button in the header", async ({
      page,
    }) => {
      await page.goto("/");

      const createButtonHeader = page.getByTestId(
        "create-coffee-button-header",
      );
      await createButtonHeader.click();

      const createCoffeeModal = page.getByTestId("create-coffee-modal");
      await expect(createCoffeeModal).toBeVisible();
    });

    test("should open the create coffee modal when clicking the 'Create your own coffee' button in the hero section", async ({
      page,
    }) => {
      await page.goto("/");

      const createButtonHero = page.getByTestId("create-coffee-button-hero");
      await createButtonHero.click();

      const createCoffeeModal = page.getByTestId("create-coffee-modal");
      await expect(createCoffeeModal).toBeVisible();
    });

    test("should close the create coffee modal when clicking the close button", async ({
      page,
    }) => {
      await page.goto("/");

      const createButtonHeader = page.getByTestId(
        "create-coffee-button-header",
      );
      await createButtonHeader.click();

      const createCoffeeModal = page.getByTestId("create-coffee-modal");
      await expect(createCoffeeModal).toBeVisible();

      const closeButton = page.getByTestId("close-create-coffee-modal-button");
      await closeButton.click();

      await expect(createCoffeeModal).toBeHidden();
    });
  });
});
