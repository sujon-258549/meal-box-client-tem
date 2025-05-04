import AllMealProvider from "@/components/allMealProvider/AllMealProviders";
import { getAllProvider } from "@/services/Provider/providerSurvices";
import React from "react";

const AllMealProviderPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const provider = await getAllProvider(page);
  return (
    <div>
      <AllMealProvider provider={provider} />
    </div>
  );
};

export default AllMealProviderPage;
