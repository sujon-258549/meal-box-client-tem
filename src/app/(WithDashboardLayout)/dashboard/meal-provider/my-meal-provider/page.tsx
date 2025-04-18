import ShopInfoCard from "@/components/modules/mealProvider/MealProvider/MealProvider";
import { getMyProvider } from "@/services/Provider/providerSurvices";
import React from "react";

const MyMealProvider = async () => {
  const { data } = await getMyProvider();
  return (
    <div>
      <ShopInfoCard data={data}></ShopInfoCard>
    </div>
  );
};

export default MyMealProvider;
