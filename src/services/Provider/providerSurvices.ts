/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isTokenExpired } from "@/lib/varifyToken";
import { cookies } from "next/headers";
import { getNewToken } from "../Auth/authServices";

export const updateMeal = async () => {};

export const getProviderMeals = async () => {};

// 2. View and Respond to Orders
export const getProviderOrders = async () => {};

export const respondToOrder = async () => {};

// 3. Track Deliveries
export const getDeliveries = async () => {};

// Create meal provider
export const createProvider = async (data: FormData) => {
  const cookieStore = await cookies();
  let token = cookieStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    console.log("first", data);
    token = data.accessToken;
    cookieStore.set("access-token", token);
  }
  console.log(data);
  try {
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
    const result = await res.json();
    console.log("provider", result);
    if (result?.success) {
      console.log("in the if block");
      const { data } = await getNewToken();
      console.log("AccessTokennnnnnnnnnnnnnnnn", data);

      token = data.accessToken;
      cookieStore.set("access-token", token);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// Update meal Provider
export const updateProvider = async (data: FormData) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meal-provider/update-mealProvider`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        credentials: "include",
        body: data,
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
