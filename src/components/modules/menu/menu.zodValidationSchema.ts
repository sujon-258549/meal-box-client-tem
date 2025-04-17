import { z } from "zod";

export const mealItemSchema = z.object({
  menu: z.string().min(1, "Menu is required"),
  price: z.number().min(1, "Price is required"),
});

export const dailyMealSchema = z.object({
  day: z.string(),
  morning: mealItemSchema,
  evening: mealItemSchema,
  night: mealItemSchema,
});

export const weeklyMenuSchema = z.object({
  meals: z.array(dailyMealSchema).length(7),
});
