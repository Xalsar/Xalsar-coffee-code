import { test, expect, Page } from "@playwright/test";

// Helper function to generate unique coffee name
const getUniqueCoffeeName = () => `Playwright Coffee ${Date.now()}`;

// Helper function to open create coffee modal from header
const openCreateCoffeeModal = async (page: Page) => {
  const createButtonHeader = page.getByTestId("create-coffee-button-header");
  await createButtonHeader.click();
  const createCoffeeModal = page.getByTestId("create-coffee-modal");
  await expect(createCoffeeModal).toBeVisible();
};

// Helper function to fill form with valid data
const fillCoffeeForm = async (page: Page, coffeeName: string) => {
  await page.getByTestId("coffee-name-input").fill(coffeeName);
  await page.getByTestId("coffee-price-input").fill("9.99");
  await page.getByTestId("coffee-type-arabica-label").click();
  await page
    .getByTestId("coffee-image-url-input")
    .fill("https://example.com/image.jpg");
  await page
    .getByTestId("coffee-description-input")
    .fill("This is a test description for the coffee.");
};

test.describe("Create Coffee", () => {
  test.describe("Modal navigation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("should open the create coffee modal when clicking the 'Create' button in the header", async ({
      page,
    }) => {
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
      const createButtonHero = page.getByTestId("create-coffee-button-hero");
      await createButtonHero.click();

      const createCoffeeModal = page.getByTestId("create-coffee-modal");
      await expect(createCoffeeModal).toBeVisible();
    });

    test("should close the create coffee modal when clicking the close button", async ({
      page,
    }) => {
      await openCreateCoffeeModal(page);

      const createCoffeeModal = page.getByTestId("create-coffee-modal");
      const closeButton = page.getByTestId("close-create-coffee-modal-button");
      await closeButton.click();

      await expect(createCoffeeModal).toBeHidden();
    });
  });

  test.describe("Form submission", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await openCreateCoffeeModal(page);
    });

    test("should display all the form fields", async ({ page }) => {
      const formFields = [
        { testId: "coffee-name-input", label: "Name input" },
        { testId: "coffee-price-input", label: "Price input" },
        { testId: "coffee-type-arabica-label", label: "Arabica radio" },
        { testId: "coffee-type-robusta-label", label: "Robusta radio" },
        { testId: "coffee-image-url-input", label: "Image URL input" },
        { testId: "coffee-description-input", label: "Description input" },
        { testId: "confirm-coffee-creation", label: "Submit button" },
      ];

      for (const field of formFields) {
        const element = page.getByTestId(field.testId);
        await expect(element).toBeVisible();
      }
    });

    test("should display validation errors when submitting empty form", async ({
      page,
    }) => {
      const submitButton = page.getByTestId("confirm-coffee-creation");
      await submitButton.click();

      const expectedErrors = [
        "Coffee Name must be at least 3 characters.",
        "Price is required.",
        "Please select a coffee type.",
        "Must be a valid URL.",
        "Description must be at least 10 characters.",
      ];

      for (const errorMessage of expectedErrors) {
        await expect(page.getByText(errorMessage)).toBeVisible();
      }
    });
  });

  test.describe("Form submission with valid data", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await openCreateCoffeeModal(page);
    });

    test("should submit the form successfully and close the modal", async ({
      page,
    }) => {
      const coffeeName = getUniqueCoffeeName();
      await fillCoffeeForm(page, coffeeName);

      const submitButton = page.getByTestId("confirm-coffee-creation");
      await submitButton.click();

      const createCoffeeModal = page.getByTestId("create-coffee-modal");
      await expect(createCoffeeModal).toBeHidden();
    });

    test("should display the newly created coffee in the coffee list", async ({
      page,
    }) => {
      const coffeeName = getUniqueCoffeeName();
      await fillCoffeeForm(page, coffeeName);

      const submitButton = page.getByTestId("confirm-coffee-creation");
      await submitButton.click();

      // Wait for modal to close and content to load
      const createCoffeeModal = page.getByTestId("create-coffee-modal");
      await expect(createCoffeeModal).toBeHidden();

      // Verify the coffee item is visible in the list
      const coffeeItem = page.getByTestId("coffee-item").filter({
        hasText: coffeeName,
      });
      await expect(coffeeItem).toBeVisible();
      await expect(coffeeItem).toContainText("9.99");
      await expect(coffeeItem).toContainText("Arabica");
      await expect(coffeeItem).toContainText(
        "This is a test description for the coffee.",
      );
    });
  });

  test.describe("Discard functionality", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await openCreateCoffeeModal(page);
    });

    test("should discard the form data and clear all fields", async ({
      page,
    }) => {
      const coffeeName = getUniqueCoffeeName();
      await fillCoffeeForm(page, coffeeName);

      const discardButton = page.getByTestId("coffee-create-form-discard");
      await discardButton.click();

      const formFields = [
        "coffee-name-input",
        "coffee-price-input",
        "coffee-image-url-input",
        "coffee-description-input",
      ];

      for (const fieldTestId of formFields) {
        await expect(page.getByTestId(fieldTestId)).toHaveValue("");
      }
    });

    test("should keep the modal open after discarding", async ({ page }) => {
      const coffeeName = getUniqueCoffeeName();
      await fillCoffeeForm(page, coffeeName);

      const discardButton = page.getByTestId("coffee-create-form-discard");
      await discardButton.click();

      const createCoffeeModal = page.getByTestId("create-coffee-modal");
      await expect(createCoffeeModal).toBeVisible();
    });
  });
});
