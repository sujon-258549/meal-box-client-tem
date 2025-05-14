import BlogSection from "@/components/home/BlogSection";
import ImageGallery from "@/components/home/ImageGallery";
import { MealBoxServices } from "@/components/home/MealBoxServices";
import { SixCard } from "@/components/home/SixCard";
import Slider from "@/components/home/Slider";
import { Testimonial } from "@/components/home/Testimonial";
import UserCountUp from "@/components/home/UserCountUp";
import { getAllUser } from "@/services/Auth/authServices";
import { allBlog } from "@/services/blog/blogServices";
import {
  getAllMenusForServices,
  getSixMenus,
  getTenMenus,
} from "@/services/Menu/menuServices";
import { getAllProvider } from "@/services/Provider/providerSurvices";

const HomePage = async () => {
  const { data } = await getSixMenus();
  const menus = await getTenMenus();
  const menuData = await getAllMenusForServices();
  const mealProvider = await getAllProvider();
  const allUser = await getAllUser();
  const Blogs = await allBlog();

  return (
    <>
      <div>
        <Slider />
      </div>
      <div className="container py-10">
        <SixCard data={data} />
        <ImageGallery menus={menus} />
        <MealBoxServices menuData={menuData} />
        <UserCountUp allUser={allUser} />
        <BlogSection blogs={Blogs} />
        <Testimonial mealProvider={mealProvider} />
      </div>
    </>
  );
};

export default HomePage;
