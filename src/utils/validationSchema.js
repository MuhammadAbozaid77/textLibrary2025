import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "firstName Required" }),
    secondName: z.string().min(1, { message: "SecondName Required" }),
    email: z.string().email().min(1, { message: "email address is Required" }),
    password: z
      .string()
      .min(8, { message: "password must be at least character" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is Required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password Not Confirm",
    path: ["confirmPassword"],
  });
