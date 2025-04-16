/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";

// 1. Post or Update Meal Menus
export const createMeal = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_pUBLIC_API_URL}/auth/create-mealProvider'`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMeal = async () => {};

export const getProviderMeals = async () => {};

// 2. View and Respond to Orders
export const getProviderOrders = async () => {};

export const respondToOrder = async () => {};

// 3. Track Deliveries
export const getDeliveries = async () => {};
