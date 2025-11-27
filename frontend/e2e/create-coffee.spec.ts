import { test, expect, Page } from "@playwright/test";
import { it } from "node:test";

let nowString = "";

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

  test.describe("Form submission", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");

      const createButtonHeader = page.getByTestId(
        "create-coffee-button-header",
      );
      await createButtonHeader.click();
    });

    test("should display all the form fields", async ({ page }) => {
      const nameInput = page.getByTestId("coffee-name-input");
      const priceInput = page.getByTestId("coffee-price-input");
      const typeArabicaRadioLabel = page.getByTestId(
        "coffee-type-arabica-label",
      );
      const typeRobustaRadioLabel = page.getByTestId(
        "coffee-type-robusta-label",
      );
      const imageUrlInput = page.getByTestId("coffee-image-url-input");
      const descriptionInput = page.getByTestId("coffee-description-input");
      const submitButton = page.getByTestId("confirm-coffee-creation");

      await expect(nameInput).toBeVisible();
      await expect(priceInput).toBeVisible();
      await expect(typeArabicaRadioLabel).toBeVisible();
      await expect(typeRobustaRadioLabel).toBeVisible();
      await expect(imageUrlInput).toBeVisible();
      await expect(descriptionInput).toBeVisible();
      await expect(submitButton).toBeVisible();
    });

    test("should display validation errors when submitting empty form", async ({
      page,
    }) => {
      const submitButton = page.getByTestId("confirm-coffee-creation");
      await submitButton.click();

      const nameError = page.getByText(
        "Coffee Name must be at least 3 characters.",
      );
      const priceError = page.getByText("Price is required.");
      const typeError = page.getByText("Please select a coffee type.");
      const uploadImageUrlError = page.getByText("Must be a valid URL.");
      const descriptionError = page.getByText(
        "Description must be at least 10 characters.",
      );

      await expect(nameError).toBeVisible();
      await expect(priceError).toBeVisible();
      await expect(typeError).toBeVisible();
      await expect(uploadImageUrlError).toBeVisible();
      await expect(descriptionError).toBeVisible();
    });

    test.describe("form submission with valid data", () => {
      test.beforeEach(async ({ page }) => {
        const now = new Date();
        nowString = now.toISOString();

        await page
          .getByTestId("coffee-name-input")
          .fill(`Playwright Coffee ${nowString}`); // Modified to ensure uniqueness
        await page.getByTestId("coffee-price-input").fill("9.99");
        await page.getByTestId("coffee-type-arabica-label").click();
        await page
          .getByTestId("coffee-image-url-input")
          .fill("https://example.com/image.jpg");
        await page
          .getByTestId("coffee-description-input")
          .fill("This is a test description for the coffee.");

        const submitButton = page.getByTestId("confirm-coffee-creation");
        await submitButton.click();
      });

      test("should submit the form successfully and close the modal", async ({
        page,
      }) => {
        const createCoffeeModal = page.getByTestId("create-coffee-modal");
        await expect(createCoffeeModal).toBeHidden();
      });

      test("should hide the modal after submission", async ({ page }) => {
        const createCoffeeModal = page.getByTestId("create-coffee-modal");
        await expect(createCoffeeModal).toBeHidden();
      });

      test("should display the newly created coffee in the coffee list", async ({
        page,
      }) => {
        const coffeItem = page.getByTestId("coffee-item").filter({
          hasText: `Playwright Coffee ${nowString}`,
        });
        await expect(coffeItem).toBeVisible();
        await expect(coffeItem).toHaveText(/9.99/);
        await expect(coffeItem).toContainText("Arabica");
        await expect(coffeItem).toContainText(
          "This is a test description for the coffee.",
        );
      });
    });
  });

  test.describe("Discard functionality", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");

      const createButtonHeader = page.getByTestId(
        "create-coffee-button-header",
      );
      await createButtonHeader.click();

      const now = new Date();
      nowString = now.toISOString();

      await page
        .getByTestId("coffee-name-input")
        .fill(`Playwright Coffee ${nowString}`); // Modified to ensure uniqueness
      await page.getByTestId("coffee-price-input").fill("9.99");
      await page.getByTestId("coffee-type-arabica-label").click();
      await page
        .getByTestId("coffee-image-url-input")
        .fill("https://example.com/image.jpg");
      await page
        .getByTestId("coffee-description-input")
        .fill("This is a test description for the coffee.");
    });

    test("should discard the form data", async ({ page }) => {
      const discardButton = page.getByTestId("coffee-create-form-discard");
      await discardButton.click();

      const nameInput = page.getByTestId("coffee-name-input");
      const priceInput = page.getByTestId("coffee-price-input");
      const imageUrlInput = page.getByTestId("coffee-image-url-input");
      const descriptionInput = page.getByTestId("coffee-description-input");

      await expect(nameInput).toHaveValue("");
      await expect(priceInput).toHaveValue("");
      await expect(imageUrlInput).toHaveValue("");
      await expect(descriptionInput).toHaveValue("");
    });
  });
});
