import { CoffeeType } from "@/app/types/CoffeeType.type";

export const CoffeeTypePill = ({ type }: { type: CoffeeType }) => {
  return (
    <div
      data-testid="coffee-type-pill"
      className={`absolute left-[1.5rem] top-[1.5rem] rounded-[2.56rem] px-[0.75rem] py-[0.5rem] ${
        type === CoffeeType.ARABICA ? "bg-[#77A9B0]" : "bg-[#C69A6D]"
      }`}
    >
      {type === CoffeeType.ARABICA ? "Arabica" : "Robusta"}
    </div>
  );
};
