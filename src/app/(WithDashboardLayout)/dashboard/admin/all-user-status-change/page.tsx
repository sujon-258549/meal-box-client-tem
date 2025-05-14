import AllUser from "@/components/admin/AllUser";
import {
  getAllCustomer,
  getAllMealProvider,
} from "@/services/Auth/authServices";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const customers = await getAllCustomer(page);
  const mealProvider = await getAllMealProvider(page);
  return (
    <div>
      <AllUser customers={customers} mealProvider={mealProvider}></AllUser>
    </div>
  );
};

export default page;
