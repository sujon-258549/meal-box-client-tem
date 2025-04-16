/* eslint-disable @typescript-eslint/no-explicit-any */
export const createMenu = async (payload: any, userId: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_pUBLIC_API_URL}/menu/create-menu`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload, userId),
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const allMenus = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_pUBLIC_API_URL}/menu/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleMenu = async (menuId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_pUBLIC_API_URL}/menu/${menuId}`,
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
export const getMyMenu = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_pUBLIC_API_URL}/menu/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMyMenu = async (payload: any, id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_pUBLIC_API_URL}/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
