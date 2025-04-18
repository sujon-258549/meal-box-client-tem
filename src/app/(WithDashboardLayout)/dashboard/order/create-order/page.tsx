import { WeeklyMenuDisplay } from "@/components/modules/order/create-order/OrderForm";
import { getSingleMenu } from "@/services/Menu/menuServices";
const CreateOrderPage = async () => {
  const { data } = await getSingleMenu("68015a739d1380a629e1c48e");
  return (
    <div>
      <WeeklyMenuDisplay orders={data}></WeeklyMenuDisplay>
    </div>
  );
};

export default CreateOrderPage;
