import ImageGallery from "@/components/home/ImageGallery";
import { SixCard } from "@/components/home/SixCard";
import Slider from "@/components/home/Slider";
import { Testimonial } from "@/components/home/Testimonial";
import { getAllMenus, getSixMenus } from "@/services/Menu/menuServices";
import { getAllProvider } from "@/services/Provider/providerSurvices";
import React from "react";

const HomePage = async () => {
  const { data } = await getSixMenus();
  const menus = await getAllMenus();
  const mealProvider = await getAllProvider();

  return (
    <>
      <div>
        <Slider sliderData={data} />
      </div>
      <div className="max-w-5xl py-10 mx-auto px-5">
        <SixCard data={data} />
        <ImageGallery menus={menus} />
        <Testimonial mealProvider={mealProvider} />
        
      </div>
    </>
  );
};

export default HomePage;
