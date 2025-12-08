import { useState } from "react";

import type { Coffee } from "@/app/types/Coffee.type";

import { CoffeeFilters } from "@/app/types/CoffeeFilters.type";

export const useFilterCoffeesByType = ({
  coffeesList,
}: {
  coffeesList: Coffee[];
}) => {
  const [selectedType, setSelectedType] = useState<CoffeeFilters>(
    CoffeeFilters.ALL,
  );

  const handleClickFilterByType = (type: CoffeeFilters) => {
    setSelectedType(type);
  };

  const filteredCoffees = coffeesList.filter((coffee: Coffee) => {
    if (selectedType === CoffeeFilters.ALL) return true;
    // @ts-ignore
    return coffee.type === selectedType;
  });

  return { selectedType, handleClickFilterByType, filteredCoffees };
};
