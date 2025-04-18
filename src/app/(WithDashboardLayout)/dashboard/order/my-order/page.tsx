import MyOrder from "@/components/modules/order/myorder/MyOrder";
import { getMyOrder } from "@/services/Order/orderServices";
import React from "react";

const MyOrderPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getMyOrder(page);
  return (
    <div>
      <MyOrder orders={data} />
    </div>
  );
};

export default MyOrderPage;
