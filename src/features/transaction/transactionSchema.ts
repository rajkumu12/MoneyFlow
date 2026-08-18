import { z } from "zod";

export const transactionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(
      50,
      "Title must be less than 50 characters",
    ),

  amount: z
    .number({
      error: "Amount is required",
    })
    .positive(
      "Amount must be greater than 0",
    ),

  type: z.enum(["income", "expense"], {
    error: "Transaction type is required",
  }),

  category: z
    .string()
    .min(1, "Category is required"),

  date: z
    .string()
    .min(1, "Date is required"),

  transactionTime: z
    .string()
    .min(1, "Time is required"),
});

export type TransactionFormData =
  z.infer<typeof transactionSchema>;