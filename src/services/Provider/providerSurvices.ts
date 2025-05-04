/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isTokenExpired } from "@/lib/varifyToken";
import { cookies } from "next/headers";
import { getNewToken } from "../Auth/authServices";

export const getProviderMeals = async () => {};

// Create meal provider
export const createProvider = async (data: FormData) => {
  const cookieStore = await cookies();
  let token = cookieStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const cookie = await getNewToken();
    console.log("cookie data", cookie);
    token = cookie?.accessToken;
    cookieStore.set("access-token", token);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meal-provider/create-mealProvider`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        // credentials: "include",
        body: data,
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error(error);
    return Error(error);
  }
};

export const getMyProvider = async () => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meal-provider/my-meal-provider`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getAllProvider = async (page?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meal-provider?page=${page}`,
      {
        method: "GET",
      }
    );

    return res.json();
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
        // credentials: "include",
        body: data,
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
