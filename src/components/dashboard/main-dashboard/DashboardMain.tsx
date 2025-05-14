"use client";
import React from "react";
import { MealProviderDashboard } from "./MealProviderDashboard";
import SimpleCustomerDashboard from "./CustomerDashboard";
import { useUser } from "@/context/UserContext";
import AdminDashboard from "./AdminDashboard";

const DashboardMain = ({
  menu,
  receivedOrders,
  myData,
  userData,
  providerData,
  allUser,
  mealProvidersData,
  orders,
  customersData,
  meOrderData,
  myOrderData,
}: {
  menu: any;
  receivedOrders: any;
  myData: any;
  userData: any;
  providerData: any;
  allUser: any;
  orders: any;
  customersData: any;
  mealProvidersData: any;
  meOrderData: any;
  myOrderData: any;
}) => {
  const { user }: any = useUser();
  return (
    <div>
      {user?.role === "admin" && (
        <AdminDashboard
          allUser={allUser}
          orders={orders}
          mealProvidersData={mealProvidersData}
          customersData={customersData}
        />
      )}
      {user?.role === "mealProvider" && (
        <MealProviderDashboard
          menu={menu}
          receivedOrdersData={receivedOrders}
          providerData={providerData}
          meOrderData={meOrderData}
        />
      )}
      {user?.role === "customer" && (
        <SimpleCustomerDashboard
          menu={myData}
          user={userData}
          getMyOrders={myOrderData}
        />
      )}
    </div>
  );
};

export default DashboardMain;
