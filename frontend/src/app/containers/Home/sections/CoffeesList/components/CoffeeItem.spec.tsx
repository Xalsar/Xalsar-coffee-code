import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { CoffeeItem } from "./CoffeeItem";
import { CoffeeType } from "@/app/types/CoffeeType.type";

afterEach(() => {
  cleanup();
});

describe("CoffeeItem", () => {
  it("renders coffee name, description, and price", () => {
    render(
      <CoffeeItem
        name="Latte"
        type={CoffeeType.ROBUSTA}
        description="Smooth and creamy"
        price={3.5}
      />,
    );

    expect(screen.getByText("Latte")).toBeInTheDocument();
    expect(screen.getByText("Smooth and creamy")).toBeInTheDocument();
    expect(screen.getByText(/3.5 €/)).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(
      <CoffeeItem
        name="Espresso"
        type={CoffeeType.ROBUSTA}
        description="Bold flavor"
        price={2}
      />,
    );
    expect(screen.getByAltText("Coffee")).toBeInTheDocument();
  });

  it("has the correct data attributes", () => {
    render(
      <CoffeeItem
        name="Cappuccino"
        type={CoffeeType.ROBUSTA}
        description="Frothy and delicious"
        price={4}
      />,
    );
    const item = screen.getByTestId("coffee-item");
    expect(item).toHaveAttribute("data-coffee-type", CoffeeType.ROBUSTA);
  });
});
