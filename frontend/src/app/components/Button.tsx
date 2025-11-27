import { cn } from "../utils/cn";

export const Button = ({
  className,
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled,
  "data-testid": dataTestId,
}: {
  className?: string;
  children: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "data-testid"?: string;
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
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};
