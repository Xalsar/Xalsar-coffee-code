import { Button } from "../../components/Button";
import Image from "next/image";
import { TextFormInput } from "./components/TextFormInput";
import { useCreateCoffeeForm } from "./hooks/use-createCoffeeForm";

export const CreateCoffee = ({
  handleClickClose,
}: {
  handleClickClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    handleClickDiscard,
  } = useCreateCoffeeForm({ handleClickClose });

  return (
    <div
      className="w-full overflow-hidden pb-[10.0625rem] pt-[5.6875rem] font-body text-white md:absolute md:left-1/2 md:top-1/2 md:max-w-[44.625rem] md:-translate-x-1/2 md:-translate-y-1/2 md:bg-[#191919] md:p-[8.5rem]"
      data-testid="create-coffee-modal"
    >
      <button
        className="absolute right-[2.5rem] top-[2.5rem]"
        onClick={handleClickClose}
        data-testid="close-create-coffee-modal-button"
      >
        <Image src="/x.svg" alt="Close" width={40} height={40} />
      </button>
      <Image
        src="/footer_coffe_beans_over.png"
        alt="Coffee Beans"
        width={251.33}
        height={168.04}
        className="absolute bottom-[2.1875rem] left-[-5.625rem] hidden rotate-[31deg] md:block"
      />
      <h2 className="mb-[1.5rem] text-center font-heading text-[3.125rem] leading-[3.125rem]">
        CREATE NEW
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="px-[1.1rem]">
        <div className="flex flex-col gap-[1.5rem]">
          <div className="flex flex-col gap-[1rem] md:flex-row">
            <div className="flex-[2]">
              <TextFormInput
                label="Coffee Name"
                id="name"
                placeholder="Enter coffee name"
                fieldName="name"
                register={register}
                error={errors.name?.message}
                data-testid="coffee-name-input"
              />
            </div>
            <div className="flex-[1]">
              <div className="relative">
                <TextFormInput
                  label="Price"
                  id="price"
                  placeholder="0.00"
                  fieldName="price"
                  register={register}
                  error={errors.price?.message}
                  data-testid="coffee-price-input"
                />
                <span className="absolute right-4 top-[2.28125rem]">€</span>
              </div>
            </div>
          </div>

          <div>
            <span className="mb-[0.5rem] block text-[0.875rem] font-medium text-[#9B9B9B]">
              Type
            </span>

            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="radio"
                  id="coffee-arabica"
                  value="ARABICA"
                  className="peer hidden"
                  {...register("coffeeType")}
                  data-testid="coffee-type-arabica-input"
                />
                <label
                  htmlFor="coffee-arabica"
                  className="block flex-[1] rounded-[0.5rem] border-[1px] border-[#2D2D2D] p-[0.5rem] text-center text-[#838382] transition peer-checked:border-[#FFFFFF] peer-checked:text-[#FFFFFF] "
                  data-testid="coffee-type-arabica-label"
                >
                  Arabica
                </label>
              </div>
              <div className="flex-1">
                <input
                  type="radio"
                  id="coffee-robusta"
                  value="ROBUSTA"
                  className="peer hidden"
                  {...register("coffeeType")}
                  data-testid="coffee-type-robusta-input"
                />
                <label
                  htmlFor="coffee-robusta"
                  className="block flex-[1] rounded-[0.5rem] border-[1px] border-[#2D2D2D] p-[0.5rem] text-center text-[#838382] transition peer-checked:border-[#FFFFFF] peer-checked:text-[#FFFFFF] "
                  data-testid="coffee-type-robusta-label"
                >
                  Robusta
                </label>
              </div>
            </div>
            {errors.coffeeType && (
              <p className="mt-1 text-xs text-red-500">
                {errors.coffeeType.message}
              </p>
            )}
          </div>

          <TextFormInput
            label="Upload image"
            id="imageUrl"
            placeholder="Paste image URL here"
            fieldName="imageUrl"
            register={register}
            error={errors.imageUrl?.message}
            data-testid="coffee-image-url-input"
          />
          <TextFormInput
            label="Description"
            id="description"
            placeholder="Add a description"
            fieldName="description"
            register={register}
            error={errors.description?.message}
            data-testid="coffee-description-input"
          />
        </div>

        <div className="mt-[2rem] flex justify-center gap-[1rem]">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClickDiscard}
            data-testid="coffee-create-form-discard"
          >
            Discard
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            data-testid="confirm-coffee-creation"
          >
            {isSubmitting ? "Submitting..." : "Confirm"}
          </Button>
        </div>
      </form>
    </div>
  );
};
