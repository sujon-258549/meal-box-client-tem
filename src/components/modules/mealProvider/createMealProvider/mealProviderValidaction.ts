// import { z } from "zod";

// export const mealProviderSchema = z.object({
//   shopName: z.string().min(1, "Shop name is required"),
//   shopAddress: z.string().min(1, "Shop address is required"),
//   phoneNumber: z.string().min(1, "Phone number is required"),
//   website: z.string().url("Invalid website URL").optional(),
//   ownerName: z.string().min(1, "Owner name is required"),
//   establishedYear: z
//     .number({ invalid_type_error: "Established year must be a number" })
//     .min(1900, "Year must be valid")
//     .max(new Date().getFullYear(), "Year cannot be in the future"),
//   //   productCategories: z
//   //     .array(z.string().min(1))
//   //     .min(1, "At least one product category is required"),
//   socialMediaLinks: z
//     .object({
//       facebook: z.string().optional(),
//       instagram: z.string().optional(),
//       twitter: z.string().optional(),
//       linkedin: z.string().optional(),
//     })
//     .optional(),
//   rating: z
//     .number()
//     .min(0, "Rating must be between 0 and 5")
//     .max(5, "Rating must be between 0 and 5")
//     .optional(),
//   operatingHours: z.object({
//     open: z.string().min(1, "Opening time is required"),
//     close: z.string().min(1, "Closing time is required"),
//     daysOpen: z
//       .array(z.string().min(1))
//       .min(1, "At least one operating day is required"),
//   }),
//   paymentMethods: z
//     .array(z.string().min(1))
//     .min(1, "At least one payment method is required"),
//   customerServiceContact: z.string().optional(),
// });

import { z } from "zod";

export const mealProviderSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  shopAddress: z.string().min(1, "Shop address is required"),
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
