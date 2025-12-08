import type { Coffee } from "@/app/types/Coffee.type";

import useSWR from "swr";

export const useFetchCoffeesData = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR<Coffee[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/coffees`,
    fetcher,
  );

  return { data, error, isLoading };
};
