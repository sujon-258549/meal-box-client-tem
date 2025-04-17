/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isTokenExpired } from "@/lib/varifyToken";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { getNewToken } from "../Auth/authServices";

export const createMenuByProvider = async (data: FieldValues) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    // console.log((await cookies()).get("access-token")!.value);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/create-menu`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      }
    );
    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllMenus = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        // Authorization: (await cookies()).get("access-token")!.value,
      },
    });
    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMyMenu = async () => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/my-menu`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMyMenu = async (payload: any, id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("access-token")!.value,
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleMenu = async (menuId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/${menuId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error: any) {
    return Error(error);
  }
};
