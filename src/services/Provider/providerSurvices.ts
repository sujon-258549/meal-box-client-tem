/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

// 1. Post or Update Meal Menus
export const createMeal = async (data: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/create-mealProvider'`,
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: (await cookies()).get("access-token")!.value,
        },
        body: data,
      }
    );

    return res.json();
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

export const createProvider = async (data: FormData) => {
  console.log("root api", `${process.env.NEXT_PUBLIC_API_URL}`);
  try {
    const token = (await cookies()).get("access-token")!.value;
    console.log("ftoken", token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meal-provider/create-mealProvider`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        credentials: "include",
        body: data,
      }
    );
    console.log("From service file", res);
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
