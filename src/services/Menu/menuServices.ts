/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createMenuByProvider = async (data: FieldValues) => {
  try {
    // console.log((await cookies()).get("access-token")!.value);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/create-menu`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: (await cookies()).get("access-token")!.value,
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
