type MealTime = {
  menu: string;
  price: number;
  _id: string;
};

type DailyMeal = {
  day: string;
  morning: MealTime;
  evening: MealTime;
  night: MealTime;
  _id: string;
};

export type WeeklyMealPlan = {
  _id: string;
  meals: DailyMeal[];
  author_id: string;
  shopId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};
