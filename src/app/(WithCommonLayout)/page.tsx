import ImageGallery from "@/components/home/ImageGallery";
import { MealBoxServices } from "@/components/home/MealBoxServices";
import { SixCard } from "@/components/home/SixCard";
import Slider from "@/components/home/Slider";
import { Testimonial } from "@/components/home/Testimonial";
import {
  getAllMenusForServices,
  getSixMenus,
  getTenMenus,
} from "@/services/Menu/menuServices";
import { getAllProvider } from "@/services/Provider/providerSurvices";
import React from "react";

const HomePage = async () => {
  const { data } = await getSixMenus();
  const menus = await getTenMenus();
  const menuData = await getAllMenusForServices();
  const mealProvider = await getAllProvider();

  return (
    <>
      <div>
        <Slider sliderData={data} />
      </div>
      <div className="max-w-5xl py-10 mx-auto px-5">
        <SixCard data={data} />
        <ImageGallery menus={menus} />
        <MealBoxServices menuData={menuData} />
        <Testimonial mealProvider={mealProvider} />
      </div>
    </>
  );
};

export default HomePage;
