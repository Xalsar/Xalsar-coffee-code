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
  let btnClasses = `rounded-[30px] px-[1rem] py-[0.875rem] text-white min-w-[7.1875rem] text-[0.875rem] font-body border-[1px] border-[#BA8039] disabled:opacity-50 ${className}`;

  if (variant === "secondary") {
    btnClasses += " bg-[transparent]";
  } else {
    btnClasses += " bg-[#BA8039]";
  }

  return (
    <button
      className={btnClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
