import { z } from "zod";

export const userValidationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string(),
  gender: z.enum(["male", "female", "other"]),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
  secondaryPhone: z.string().optional(),
  address: z.object({
    village: z.string().min(2, "Village name is required"),
    district: z.string().min(2, "District is required"),
    subDistrict: z.string().min(2, "Sub-district is required"),
    post: z.string().min(2, "Post office is required"),
    postCode: z.string().min(4, "Post code must be 4 digits"),
  }),
});
