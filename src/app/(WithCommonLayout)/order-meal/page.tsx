import { getAllMenus } from "@/services/Menu/menuServices";
import React from "react";

const OrderMealPage = async () => {
  const allMenuData = await getAllMenus();
  console.log("all menu data", allMenuData);
  return (
    <div>
      <h1>This is order meal page</h1>
    </div>
  );
};

export default OrderMealPage;
