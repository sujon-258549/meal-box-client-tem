import { z } from "zod";

export const mealProviderSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  shopAddress: z.string().min(1, "Shop address is required"),
  authorShopId: z.string().min(1, "Author Shop ID is required"),
  shopLogo: z.string().url("Invalid logo URL").optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  website: z.string().url("Invalid website URL").optional(),
  ownerName: z.string().min(1, "Owner name is required"),
  establishedYear: z
    .number({ invalid_type_error: "Established year must be a number" })
    .min(1900, "Year must be valid")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  productCategories: z
    .array(z.string().min(1))
    .min(1, "At least one product category is required"),
  socialMediaLinks: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
    })
    .optional(),
  rating: z
    .number()
    .min(0, "Rating must be between 0 and 5")
    .max(5, "Rating must be between 0 and 5")
    .optional(),
  operatingHours: z.object({
    open: z.string().min(1, "Opening time is required"),
    close: z.string().min(1, "Closing time is required"),
    daysOpen: z
      .array(z.string().min(1))
      .min(1, "At least one operating day is required"),
  }),
  paymentMethods: z
    .array(z.string().min(1))
    .min(1, "At least one payment method is required"),
  customerServiceContact: z.string().optional(),
});
