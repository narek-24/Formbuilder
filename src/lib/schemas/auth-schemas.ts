import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z
    .string()
    .trim()
    .min(6, { error: "Password needs to be atleast 6 characters long" }),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().trim().min(1, { error: "Name is required" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { error: "Password needs to be at least 6 characters long" }),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
