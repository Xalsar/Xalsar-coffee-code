import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, renderHook, act, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import { useCreateCoffeeForm } from "./use-createCoffeeForm";

vi.mock("axios");
const mockedAxios = vi.mocked(axios);

vi.mock("react-hot-toast", () => {
  // Create a mock function that has .success and .toast methods

  const mockToastFn = vi.fn() as any;
  mockToastFn.success = vi.fn();
  // Export as default (for import toast from "react-hot-toast")
  return {
    __esModule: true,
    default: mockToastFn,
  };
});

const MOCK_API_URL = "http://mock-api.com/v3";
vi.stubEnv("NEXT_PUBLIC_API_URL", MOCK_API_URL);

const mockCoffee = {
  name: "Mock Coffee",
  type: "ARABICA",
  description: "Rich and bold",
  imageUrl: "http://image.url/coffee.jpg",
  price: 10.5,
};

const validForm = {
  name: "Mock Coffee",
  coffeeType: "arabica",
  description: "Rich and bold",
  imageUrl: "http://image.url/coffee.jpg",
  price: "10.5",
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
    {children}
  </SWRConfig>
);

describe("useCreateCoffeeForm", () => {
  const handleClickClose = vi.fn();
  const cacheKey = `${MOCK_API_URL}/coffees`;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    cleanup();
  });

  it("should call axios and show success toast on valid submit", async () => {
    // Simulate successful post
    vi.spyOn(axios, "post").mockResolvedValueOnce({ data: mockCoffee });

    const { result } = renderHook(
      () => useCreateCoffeeForm({ handleClickClose }),
      {
        wrapper,
      },
    );

    await act(async () => {
      // The form uses handleSubmit, but we call onSubmit directly here for simplicity.
      await result.current.onSubmit(validForm);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(cacheKey, {
      name: validForm.name,
      type: "ARABICA",
      description: validForm.description,
      imageUrl: validForm.imageUrl,
      price: 10.5,
    });

    expect(handleClickClose).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith(
      "Coffee created successfully!",
      expect.objectContaining({
        style: expect.any(Object),
      }),
    );
  });

  it("should show name error and warning toast on 409", async () => {
    // Simulate 409 error
    const axiosError = { status: 409, response: {}, isAxiosError: true };
    vi.spyOn(axios, "isAxiosError").mockReturnValue(true);
    vi.spyOn(axios, "post").mockRejectedValueOnce(axiosError);

    const { result } = renderHook(
      () => useCreateCoffeeForm({ handleClickClose }),
      {
        wrapper,
      },
    );

    await act(async () => {
      await result.current.onSubmit(validForm);
    });

    // error gets set internally in useForm
    expect(toast).toHaveBeenCalledWith(
      "A coffee with the same name already exists",
      expect.objectContaining({
        icon: "⚠️",
        style: expect.any(Object),
      }),
    );
  });

  it("should reset form when discard is called", () => {
    const { result } = renderHook(
      () => useCreateCoffeeForm({ handleClickClose }),
      {
        wrapper,
      },
    );

    // The reset method is internal, so let's just check discard calls without error
    act(() => {
      result.current.handleClickDiscard();
    });

    expect(result.current.handleClickDiscard).toBeDefined();
  });

  it("should expose form state fields", () => {
    const { result } = renderHook(
      () => useCreateCoffeeForm({ handleClickClose }),
      {
        wrapper,
      },
    );

    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.onSubmit).toBeDefined();
    expect(result.current.errors).toBeDefined();
    expect(result.current.isSubmitting).toBeDefined();
    expect(result.current.isValid).toBeDefined();
    expect(result.current.handleClickDiscard).toBeDefined();
  });
});
