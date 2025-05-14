import DashboardMain from "@/components/dashboard/main-dashboard/DashboardMain";
import {} from "@/components/ui/breadcrumb";
import {} from "@/components/ui/sidebar";
import {
  getAllCustomer,
  getAllMealProvider,
  getAllUser,
  getMe,
} from "@/services/Auth/authServices";
import { getMyMenu } from "@/services/Menu/menuServices";
import {
  getAllOrder,
  getMealProviderOrder,
  getMealProviderOrder2,
  getMyOrder,
  getMyOrder2,
} from "@/services/Order/orderServices";
import { getMyProvider } from "@/services/Provider/providerSurvices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; sort: string }>;
}) => {
  const { data } = await getMyMenu();
  const { page } = await searchParams;
  console.log(page);
  const receivedOrdersData = await getMealProviderOrder(page);
  const myData = await getMyOrder(page);
  const userData = await getMe();
  const providerData = await getMyProvider();
  const allUser = await getAllUser();
  const orders = await getAllOrder();
  const mealProvidersData = await getAllMealProvider(page);
  const customersData = await getAllCustomer(page);
  const meOrderData = await getMealProviderOrder2();
  const myOrderData = await getMyOrder2();
  console.log(allUser);
  return (
    <div>
      <DashboardMain
        menu={data}
        userData={userData}
        myData={myData}
        receivedOrders={receivedOrdersData}
        providerData={providerData}
        allUser={allUser}
        orders={orders}
        customersData={customersData}
        mealProvidersData={mealProvidersData}
        meOrderData={meOrderData}
        myOrderData={myOrderData}
      />
    </div>
  );
};

export default Dashboard;
