import Image from "next/image";

import { CoffeeType } from "@/app/types/CoffeeType.type";
import { CoffeeTypePill } from "./CoffeeTypePill";

export const CoffeeItem = ({
  name,
  type,
  description,
  price,
}: {
  name: string;
  type: CoffeeType;
  description: string;
  price: number;
}) => {
  return (
    <div
      className="relative min-h-[31.25rem] w-full rounded-[0.37rem] bg-[#191919] px-[3.12rem] py-[2.37rem] text-center text-white shadow-md md:max-w-[24.37rem]"
      data-testid="coffee-item"
      data-coffee-type={type}
    >
      <CoffeeTypePill type={type} />
      <Image
        src="/coffee.png"
        alt="Coffee"
        width={289}
        height={216}
        className="w-full"
      />
      <p className="mt-[2.5rem] text-[1.5rem] font-semibold leading-[1.25rem] text-[#D3AD7F]">
        {name}
      </p>
      <p className="my-[0.75rem] text-[1rem] leading-[1.625rem] text-[#909090]">
        {description}
      </p>
      <p className="mt-[1.4rem] text-[1.25rem] font-bold leading-[1.62rem]">
        {price} €
      </p>
    </div>
  );
};
