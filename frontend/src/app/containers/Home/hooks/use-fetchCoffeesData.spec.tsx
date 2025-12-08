import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { useFetchCoffeesData } from "./use-fetchCoffeesData";
import { SWRConfig } from "swr";

// Mock global fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch as any;

const MOCK_API_URL = "http://mock-api.com/v3";
vi.stubEnv("NEXT_PUBLIC_API_URL", MOCK_API_URL);

const mockCoffeeData = [
  { id: 1, name: "Espresso", origin: "Italy" },
  { id: 2, name: "Latte", origin: "France" },
];

const cacheKey = `${MOCK_API_URL}/coffees`;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
    {children}
  </SWRConfig>
);

describe("useFetchCoffeesData", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    mockFetch.mockReset();
    cleanup();
  });

  it("should return data on successful fetch", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCoffeeData,
    });

    const { result } = renderHook(() => useFetchCoffeesData(), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 },
    );

    expect(result.current.data).toEqual(mockCoffeeData);
    expect(result.current.error).toBeUndefined();

    expect(mockFetch).toHaveBeenCalledWith(cacheKey);
  });

  it("should return error on failed fetch", async () => {
    const mockError = new Error("API failed");

    mockFetch.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useFetchCoffeesData(), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 },
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
  });
});
