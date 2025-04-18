import { SixCard } from "@/components/home/SixCard";
import { getAllMenus } from "@/services/Menu/menuServices";
import React from "react";

const HomePage = async () => {
  const { data } = await getAllMenus();

  return (
    <div className="max-w-5xl py-10 mx-auto px-5">
      <SixCard data={data} />
    </div>
  );
};

export default HomePage;
