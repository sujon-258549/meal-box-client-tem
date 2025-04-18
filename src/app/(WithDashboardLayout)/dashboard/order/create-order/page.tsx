import { WeeklyMenuDisplay } from "@/components/modules/order/create-order/OrderForm";
import { getAllMenus } from "@/services/Menu/menuServices";

const CreateOrderPage = async () => {
  const { data } = await getAllMenus();
  console.log(data);
  return (
    <div>
      <WeeklyMenuDisplay orders={data}></WeeklyMenuDisplay>
    </div>
  );
};

export default CreateOrderPage;
