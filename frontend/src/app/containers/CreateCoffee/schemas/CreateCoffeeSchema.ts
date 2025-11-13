import * as z from "zod";

export const CreateCoffeeSchema = z.object({
  name: z.string().min(3, "Coffee Name must be at least 3 characters."),

  price: z
    .string()
    .nonempty("Price is required.")
    .refine(
      (val) => val === "" || /^\d+(\.\d{1,2})?$/.test(val),
      "Price must be a valid number (e.g., 5.99).",
    ),

  coffeeType: z
    .string()
    .nonempty("Please select a coffee type.")
    .refine((val) => ["ARABICA", "ROBUSTA"].includes(val), {
      message: "Invalid coffee type selected.",
    }),

  imageUrl: z.httpUrl("Must be a valid URL."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
});

export type CreateCoffeeFormInput = z.infer<typeof CreateCoffeeSchema>;
