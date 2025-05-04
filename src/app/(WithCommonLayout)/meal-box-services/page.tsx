import MealBoxServices from "@/components/mealBoxServices/MealBoxServices";
import { getAllMenusForServices } from "@/services/Menu/menuServices";

const MealBoxServicesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const menuData = await getAllMenusForServices(page);
  return (
    <div>
      <MealBoxServices menuData={menuData} />
    </div>
  );
};

export default MealBoxServicesPage;
