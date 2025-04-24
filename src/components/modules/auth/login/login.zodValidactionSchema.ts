import * as z from "zod";

export const loginSchema = z.object({
  emailOrPhone: z.string().email("Invalid email address"),
  password: z.string().min(2, "Password must be at least 6 characters long"), // Minimum length validation
});
