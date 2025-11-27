import { Coffee } from "@/app/types/Coffee.type";
import { CoffeeFilters } from "@/app/types/CoffeeFilters.type";

import { CoffeeItem } from "./components/CoffeeItem";

import { cn } from "@/app/utils/cn";

export const CoffeesList = ({
  coffeesList,
  selectedType,
  handleClickFilterByType,
}: {
  coffeesList: Coffee[];
  selectedType: CoffeeFilters;
  handleClickFilterByType: (type: CoffeeFilters) => void;
}) => {
  return (
    <div className="bg-[#101011] py-[11.43rem]">
      <h2 className="text-center font-heading text-4xl font-bold text-white md:text-[3.12rem]">
        XCG. EXCLUSIVE Coffee
      </h2>

      <div className="px-[1rem] md:px-0">
        <div className="mx-auto my-[3rem] flex h-[3.12rem] w-full max-w-[34.25rem] justify-evenly rounded-[2rem] bg-[#383838] text-[1rem] text-white">
          <button
            className={cn("h-full flex-1", {
              "rounded-[2rem] bg-white text-[#101011]":
                selectedType === CoffeeFilters.ALL,
            })}
            onClick={() => handleClickFilterByType(CoffeeFilters.ALL)}
            role="button"
            aria-selected={selectedType === CoffeeFilters.ALL}
          >
            All
          </button>
          <button
            className={cn("h-full flex-1", {
              "rounded-[2rem] bg-white text-[#101011]":
                selectedType === CoffeeFilters.ROBUSTA,
            })}
            onClick={() => handleClickFilterByType(CoffeeFilters.ROBUSTA)}
            role="button"
            aria-selected={selectedType === CoffeeFilters.ROBUSTA}
          >
            Robusta
          </button>
          <button
            className={cn("h-full flex-1", {
              "rounded-[2rem] bg-white text-[#101011]":
                selectedType === CoffeeFilters.ARABICA,
            })}
            onClick={() => handleClickFilterByType(CoffeeFilters.ARABICA)}
            role="button"
            aria-selected={selectedType === CoffeeFilters.ARABICA}
          >
            Arabica
          </button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[76.875rem] flex-wrap items-center justify-center gap-7 p-[1rem] font-body md:p-0">
        {coffeesList.map((coffe) => (
          <CoffeeItem
            key={coffe.id}
            name={coffe.name}
            type={coffe.type}
            description={coffe.description}
            price={coffe.price}
          />
        ))}
      </div>
    </div>
  );
};
