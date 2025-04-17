export interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: "customer" | "meal-provider" | "admin";
  iat?: number;
  exp?: number;
}
