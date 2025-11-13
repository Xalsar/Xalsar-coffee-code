import Image from "next/image";

export const Footer = () => {
  return (
    <div
      className="relative h-[22.72rem] overflow-hidden bg-[#101011]"
      style={{
        backgroundImage: 'url("footer_coffe_beans.png")',
      }}
    >
      <Image
        src="MVST_Coffee_logo.svg"
        alt="MVST Coffee Logo"
        width={589}
        height={88}
        className="absolute left-1/2 top-1/2 w-[40%] min-w-[17.43rem] max-w-[36.81rem] -translate-x-1/2 -translate-y-1/2"
      />
      <Image
        src="/footer_coffe_beans_over.png"
        width={413}
        height={276}
        alt="Footer Coffee Beans Over"
        className="absolute bottom-0 left-[58%]"
      />
    </div>
  );
};
