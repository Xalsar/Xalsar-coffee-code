import { UseFormRegister } from "react-hook-form";
import { CreateCoffeeFormInput } from "../schemas/CreateCoffeeSchema";

export const TextFormInput = ({
  label,
  id,
  placeholder,
  register,
  fieldName,
  error,
  "data-testid": dataTestId,
}: {
  label: string;
  id: string;
  placeholder: string;
  register: UseFormRegister<CreateCoffeeFormInput>;
  fieldName: keyof CreateCoffeeFormInput;
  error?: string;
  "data-testid"?: string;
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-[0.5rem] block text-[0.875rem] text-[#9B9B9B]"
      >
        {label}
      </label>
      <input
        type={"text"}
        id={id}
        placeholder={placeholder}
        {...register(fieldName)}
        className="block w-full rounded-[0.5rem] border-[0.0625rem] border-[#838382] bg-[#2D2D2D] p-[0.5rem] text-[0.875rem] placeholder:text-[#838382]"
        data-testid={dataTestId}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
