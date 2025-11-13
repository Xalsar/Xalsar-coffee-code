import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import toast from "react-hot-toast";
import {
  CreateCoffeeFormInput,
  CreateCoffeeSchema,
} from "../schemas/CreateCoffeeSchema";

import { CoffeeType } from "@/app/types/CoffeeType.type";

type SubmitArg = {
  name: string;
  type: CoffeeType;
  description: string;
  price: number;
  imageUrl: string;
};

export const useCreateCoffeeForm = ({
  handleClickClose,
}: {
  handleClickClose: () => void;
}) => {
  const { trigger: createCoffee } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/`,
    async (url, { arg }: { arg: SubmitArg }) => {
      const response = await axios.post(url, arg);
      return response.data;
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setError,
  } = useForm<CreateCoffeeFormInput>({
    resolver: zodResolver(CreateCoffeeSchema),
    defaultValues: {
      name: "",
      price: "",
      coffeeType: "",
      imageUrl: "",
      description: "",
    },
  });

  const handleClickDiscard = () => {
    reset();
  };

  const onSubmit: SubmitHandler<CreateCoffeeFormInput> = async (data) => {
    try {
      await createCoffee({
        name: data.name,
        type: data.coffeeType.toUpperCase() as CoffeeType,
        description: data.description,
        imageUrl: data.imageUrl,
        price: parseFloat(data.price),
      });

      handleClickClose();
      toast.success("Coffee created successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 409) {
          setError("name", {
            type: "manual",
            message: "Coffee with this name already exists.",
          });

          toast("A coffee with the same name already exists", {
            icon: "⚠️",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      }
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isValid,
    handleClickDiscard,
  };
};
