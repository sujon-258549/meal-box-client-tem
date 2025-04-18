"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { isTokenExpired } from "@/lib/varifyToken";
import { jwtDecode } from "jwt-decode";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const signupUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    // console.log(res);
    // return res.json();
    const result = await res.json();
    // console.log(result);
    // if (result.success) {
    //   (await cookies()).set("access-token", result?.data?.accessToken);
    // }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (loginInfo: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    const result = await res.json();
    console.log(result);
    if (result.success) {
      (await cookies()).set("access-token", result?.data?.accessToken);
      (await cookies()).set("refresh-token", result?.data?.refreshToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("access-token")?.value;
  console.log(accessToken);
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};
// export const getMe = async () => {
//   const cookyStore = await cookies();
//   let token = cookyStore.get("access-token")!.value;
//   if (!token || (await isTokenExpired(token))) {
//     const { data } = await getNewToken();
//     token = data.accessToken;
//     cookyStore.set("access-token", token);
//   }
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {

//       method: "GET",
//       headers: {
//         Authorization: token,
//       },
//     });

//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

export const updateProfile = async (payload: any) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/update-user`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const updatePassword = async (payload: any) => {
  const cookieStore = await cookies();
  let token = cookieStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookieStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refresh-Token")!.value,
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const logout = async () => {
  (await cookies()).delete("access-token");
};

export const getMe = async () => {
  const cookieStore = await cookies();
  let token = cookieStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookieStore.set("access-token", token);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    console.log(result);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
