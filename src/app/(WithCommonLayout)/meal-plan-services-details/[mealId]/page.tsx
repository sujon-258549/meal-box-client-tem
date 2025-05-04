import PlanDetailsPage from "@/components/home/PlanDetailsPage";
import { getSingleMenu } from "@/services/Menu/menuServices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Details Meal Provider",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const MealPlanServicesDetailsPage = async ({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) => {
  const { mealId } = await params;
  console.log(mealId, "orderId");

  const { data } = await getSingleMenu(mealId);
  return (
    <div>
      <PlanDetailsPage planData={data}></PlanDetailsPage>
    </div>
  );
};

export default MealPlanServicesDetailsPage;
