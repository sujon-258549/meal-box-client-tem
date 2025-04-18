import UpdateMealProviderForm from "@/components/modules/mealProvider/updateMeapProvider/UpdateMealProvider";
import { getMyProvider } from "@/services/Provider/providerSurvices";
import React from "react";

const UpdateMealProvider = async () => {
  const { data } = await getMyProvider();
  return (
    <div>
      <UpdateMealProviderForm data={data} />
    </div>
  );
};

export default UpdateMealProvider;
