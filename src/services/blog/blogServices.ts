"use server";
import { isTokenExpired } from "@/lib/varifyToken";
import { getNewToken } from "../Auth/authServices";
import { cookies } from "next/headers";
export const createBlog = async (blogData: FormData) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/create-blog`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: blogData,
      }
    );

    const result = await res.json();
    console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
    // console.log("Here is error");
  }
};
export const updateBlog = async (blogData: FormData, blogId: string) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${blogId}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: blogData,
      }
    );

    const result = await res.json();
    console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
    // console.log("Here is error");
  }
};

export const allBlog = async (page?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog?page=${page}&limit=10`,
      {
        method: "GET",
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const singleBlog = async (id: string) => {
  console.log(id);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getMyBlog = async (page?: string) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  console.log(token);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/my-blog?page=${page}&limit=10`,
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
export const deleteMyBlog = async (id: string) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, {
      method: "DELETE",
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
