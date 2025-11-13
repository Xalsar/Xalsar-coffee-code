"use client";

import { Hero } from "@/app/containers/Home/sections/Hero";
import { CoffeesList } from "@/app/containers/Home/sections/CoffeesList/CoffeesList";
import { Footer } from "@/app/containers/Home/sections/Footer";

import { useFetchCoffeesData } from "./hooks/use-fetchCoffeesData";
import { useFilterCoffeesByType } from "./hooks/use-filterCofeesByType";
import { useShowCreateCoffeeModal } from "./hooks/use-showCreateCoffeModal";
import { CreateCoffee } from "@/app/containers/CreateCoffee/CreateCoffee";

export function Home() {
  const { data, error, isLoading } = useFetchCoffeesData();

  const { selectedType, handleClickFilterByType, filteredCoffees } =
    useFilterCoffeesByType({
      coffeesList: data || [],
    });

  const { showCreateCoffeeModal, handleClickToggleCreateCoffeeModal } =
    useShowCreateCoffeeModal();

  if (showCreateCoffeeModal) {
    return (
      <CreateCoffee handleClickClose={handleClickToggleCreateCoffeeModal} />
    );
  }

  return (
    <>
      <Hero handleClickCreateCoffe={handleClickToggleCreateCoffeeModal} />
      <CoffeesList
        coffeesList={filteredCoffees!}
        selectedType={selectedType}
        handleClickFilterByType={handleClickFilterByType}
      />
      <Footer />
    </>
  );
}
