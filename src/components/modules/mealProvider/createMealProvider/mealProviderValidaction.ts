import { z } from "zod";

export const mealProviderSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  shopAddress: z.string().min(1, "Shop address is required"),
  description: z.string().min(50, "Shop address is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number"),
  website: z
    .union([
      z.string().length(0),
      z.string().url("Invalid URL").startsWith("http", {
        message: "URL must start with http:// or https://",
      }),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  ownerName: z.string().min(1, "Owner name is required"),
  establishedYear: z
    .number()
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  productCategories: z
    .array(
      z.object({
        value: z.string().min(1, "Category name is required"),
      })
    )
    .min(1, "At least one product category is required"),
  shopFeatures: z
    .array(
      z.object({
        value: z.string().min(1, "Category name is required"),
      })
    )
    .min(1, "At least one product category is required"),
  socialMediaLinks: z.object({
    facebook: z
      .union([
        z.string().length(0),
        z.string().url("Invalid URL").startsWith("http", {
          message: "URL must start with http:// or https://",
        }),
      ])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    instagram: z
      .union([
        z.string().length(0),
        z.string().url("Invalid URL").startsWith("http", {
          message: "URL must start with http:// or https://",
        }),
      ])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    twitter: z
      .union([
        z.string().length(0),
        z.string().url("Invalid URL").startsWith("http", {
          message: "URL must start with http:// or https://",
        }),
      ])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    linkedin: z
      .union([
        z.string().length(0),
        z.string().url("Invalid URL").startsWith("http", {
          message: "URL must start with http:// or https://",
        }),
      ])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
  }),
  operatingHours: z.object({
    open: z.string().min(1, "Opening time is required"),
    close: z.string().min(1, "Closing time is required"),
    daysOpen: z.array(z.string()).min(1, "At least one day must be selected"),
  }),
  paymentMethods: z
    .array(z.string())
    .min(1, "At least one payment method must be selected"),
  customerServiceContact: z
    .string()
    .min(1, "Customer service contact is required")
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid contact number"),
});
