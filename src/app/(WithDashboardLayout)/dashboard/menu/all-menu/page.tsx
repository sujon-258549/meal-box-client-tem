import { AllMenuCard } from "@/components/modules/menu/allMenu/AllMenuCards";
import { getAllMenus } from "@/services/Menu/menuServices";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getAllMenus(page);

  return (
    <div className="max-w-5xl py-10 mx-auto px-5">
      <AllMenuCard data={data} />
    </div>
  );
};

export default page;
