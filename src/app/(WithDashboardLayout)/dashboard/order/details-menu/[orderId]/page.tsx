import { WeeklyMenuDisplay } from "@/components/modules/order/create-order/OrderForm";
import { getSingleMenu } from "@/services/Menu/menuServices";

const OrderDetails = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;

  const { data } = await getSingleMenu(orderId);
  return (
    <div>
      <WeeklyMenuDisplay orders={data}></WeeklyMenuDisplay>
    </div>
  );
};

export default OrderDetails;
