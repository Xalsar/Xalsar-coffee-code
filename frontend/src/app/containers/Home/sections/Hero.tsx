import { Button } from "../../../components/Button";
import Image from "next/image";

export const Hero = ({
  handleClickCreateCoffe,
}: {
  handleClickCreateCoffe: () => void;
}) => {
  return (
    <div
      className="relative h-[58.25rem] w-full bg-cover bg-center text-center md:text-left"
      style={{
        backgroundImage: 'url("coffee_banner.jpg")',
      }}
    >
      <div className="absolute z-[1] h-full w-full bg-gradient-to-t from-[#101011] via-[#101011]/50 to-[#101011]"></div>
      <div className="relative z-[2] mx-auto flex w-full max-w-[83rem] items-center justify-between px-[1.5rem] py-[1.8rem] md:px-[2rem]">
        <Image
          src="MVST_Coffee_logo.svg"
          alt="MVST Coffee Logo"
          width={166.70668029785156}
          height={24.8868465423584}
        />
        <Button onClick={handleClickCreateCoffe}>Create</Button>
      </div>
      <div className="absolute left-1/2 top-1/2 z-[2] w-full max-w-[17rem] -translate-x-1/2 -translate-y-1/2 text-white md:max-w-[85rem] md:px-[2rem]">
        <h1 className="font-heading text-7xl font-bold leading-[8.1rem] md:text-[8.1rem]">
          ROASTED COFFEE
        </h1>
        <p className="text-[1.25rem] leading-[1.87rem] text-[#938E8E]">
          Choose a coffe from below or create your own.
        </p>
        <Button onClick={handleClickCreateCoffe} className="mt-5 w-[14.62rem]">
          Create your own coffee
        </Button>
      </div>
    </div>
  );
};
