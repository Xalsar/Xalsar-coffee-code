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
        src="XCGcoffee.svg"
        alt="XCG Coffee Logo"
        width={412 / 2}
        height={64 / 2}
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
