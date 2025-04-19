import MealProviderReceivedOrder from "@/components/modules/order/mealProviderRecivedOrder/MealProviderReceivedOrder";
import { getMealProviderOrder } from "@/services/Order/orderServices";

const MealProviderOrders = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getMealProviderOrder(page);
  return (
    <div>
      <MealProviderReceivedOrder orders={data} />
    </div>
  );
};

export default MealProviderOrders;
