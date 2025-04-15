"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const signupUser = async (userData: FieldValues) => {
  console.log(process.env.NEXT_pUBLIC_API_URL);
  console.log(userData);
  try {
    const res = await fetch(
      `${process.env.NEXT_pUBLIC_API_URL}/users/create-user`,
      //   "http://localhost:5000/users/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    console.log(res);
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (loginInfo: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_pUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    const result = res.json()
    // if(result)
  } catch (error: any) {
    return Error(error);
  }
};
