import { cn } from "../utils/cn";

export const Button = ({
  className,
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled,
}: {
  className?: string;
  children: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
  return (
    <button
      className={cn(
        `min-w-[7.1875rem] rounded-[30px] border-[1px] border-[#BA8039] px-[1rem] py-[0.875rem] font-body text-[0.875rem] text-white disabled:opacity-50`,
        className,
        {
          "bg-[transparent]": variant === "secondary",
          "bg-[#BA8039]": variant === "primary",
        },
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
