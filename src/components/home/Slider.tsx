/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "../ui/button";
import { View, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const bannerImages = [
  {
    url: "/image12.png",
    title: "Artisan Burgers",
    subtitle: "Premium Wagyu beef, house-made brioche",
    features: [
      "100% Organic Ingredients",
      "FDA Approved Kitchen",
      "Daily Fresh Preparation",
    ],
    rating: 4.9,
  },
  {
    url: "/image1.png",
    title: "Handcrafted Pasta",
    subtitle: "Imported Italian durum wheat, truffle infused",
    features: [
      "Authentic Italian Recipes",
      "ISO 22000 Certified",
      "Chef's Special Selection",
    ],
    rating: 4.8,
  },
  {
    url: "/image10.png",
    title: "Organic Salads",
    subtitle: "Farm-to-table freshness, seasonal produce",
    features: [
      "Locally Sourced Ingredients",
      "Vegan & Gluten-Free Options",
      "Nutritionist Approved",
    ],
    rating: 4.7,
  },
  {
    url: "/image2.png",
    title: "Prime Steaks",
    subtitle: "Dry-aged 28 days, grass-fed beef",
    features: ["USDA Prime Grade", "Hand-cut Daily", "Sous Vide Preparation"],
    rating: 5.0,
  },
  {
    url: "/image8.png",
    title: "Signature Sushi",
    subtitle: "Fresh-caught seafood, premium rice",
    features: ["Daily Fish Delivery", "Master Sushi Chef", "Organic Wasabi"],
    rating: 4.9,
  },
  {
    url: "/image3.png",
    title: "Neapolitan Pizza",
    subtitle: "San Marzano tomatoes, buffalo mozzarella",
    features: ["00 Flour Dough", "Wood-fired Oven", "72-hour Fermentation"],
    rating: 4.8,
  },
  {
    url: "/image6.png",
    title: "Artisan Desserts",
    subtitle: "French patisserie techniques",
    features: ["House-made Pastries", "Valrhona Chocolate", "Seasonal Fruit"],
    rating: 4.9,
  },
  {
    url: "/image4.png",
    title: "Mixology Cocktails",
    subtitle: "Small-batch spirits, house syrups",
    features: ["Aged Spirits Selection", "Hand-carved Ice", "Edible Flowers"],
    rating: 4.8,
  },
  {
    url: "/image14.png",
    title: "Artisan Cheese",
    subtitle: "Aged selections from Europe",
    features: [
      "Cave-aged Varieties",
      "Raw Milk Selection",
      "Seasonal Pairings",
    ],
    rating: 4.7,
  },
  {
    url: "/image11.png",
    title: "Specialty Coffee",
    subtitle: "Single-origin beans, slow extraction",
    features: ["Direct Trade Beans", "Small Batch Roasting", "Latte Art"],
    rating: 4.8,
  },
];
export default function FoodSlider() {
  return (
    <div className="relative w-full overflow-hidden bg-[#424242]">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
          renderBullet: (_, className) =>
            `<span class="${className} bg-[#FFD700] hover:bg-[#FFC000] w-3 h-3 transition-all shadow-md"></span>`,
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {bannerImages.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="md:hidden block">
              <div className="relative  items-center">
                {/* Image section with enhanced animations */}
                <motion.div
                  className="w-full h-[300px] relative overflow-hidden"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                  <motion.img
                    src={item.url}
                    alt={`Premium ${item.title}`}
                    className="w-full h-full object-cover object-center scale-100 md:scale-110 origin-center"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    loading="eager"
                  />
                  {/* Mobile title overlay with animation */}
                  <motion.div
                    className="md:hidden absolute bottom-0 left-0 right-0 p-6 z-20"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                      {item.title}
                    </h2>
                    <p className="text-[#FFD700] text-lg font-medium drop-shadow-md">
                      {item.subtitle}
                    </p>
                    <div className=" space-y-4 md:space-y-6">
                      <motion.ul
                        className="space-y-3 md:space-y-4 text-base md:text-lg text-white/90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        {item.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + i * 0.1 }}
                          >
                            <ChevronRight className="w-5 h-5 mt-1 text-[#FFD700] flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        <Link
                          href="/certifications"
                          className="inline-block mt-6 md:mt-8 group"
                        >
                          <Button className="bg-[#FFD700] hover:bg-[#FFC000] text-black px-8 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg group-hover:shadow-xl">
                            <span className="text-lg">
                              Discover Our Standards
                            </span>
                            <View className="ml-3 w-5 h-5 text-black transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            <div className="md:block hidden">
              <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full flex flex-col md:flex-row items-center">
                {/* Image section with enhanced animations */}
                <motion.div
                  className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                  <motion.img
                    src={item.url}
                    alt={`Premium ${item.title}`}
                    className="w-full h-full object-cover object-center scale-100 md:scale-110 origin-center"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    loading="eager"
                  />
                  {/* Mobile title overlay with animation */}
                  <motion.div
                    className="md:hidden absolute bottom-0 left-0 right-0 p-6 z-20"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                      {item.title}
                    </h2>
                    <p className="text-[#FFD700] text-lg font-medium drop-shadow-md">
                      {item.subtitle}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Content section with enhanced animations */}
                <motion.div
                  className="w-full md:w-1/2 z-50 h-1/2 md:h-full p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-b from-black/95 via-black/90 to-[#1a1a1a]/95 text-white"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, ease: "easeOut" }}
                >
                  <div className="max-w-md mx-auto space-y-4 md:space-y-6">
                    <motion.h2
                      className=" text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {item.title}
                    </motion.h2>

                    <motion.p
                      className="text-lg md:text-xl text-[#FFD700] font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      {item.subtitle}
                    </motion.p>

                    <motion.ul
                      className="space-y-3 md:space-y-4 text-base md:text-lg text-white/90"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      {item.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + i * 0.1 }}
                        >
                          <ChevronRight className="w-5 h-5 mt-1 text-[#FFD700] flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <Link
                        href="/certifications"
                        className="inline-block mt-6 md:mt-8 group"
                      >
                        <Button className="bg-[#FFD700] hover:bg-[#FFC000] text-black px-8 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg group-hover:shadow-xl">
                          <span className="text-lg">
                            Discover Our Standards
                          </span>
                          <View className="ml-3 w-5 h-5 text-black transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 30px !important;
        }

        @media (max-width: 768px) {
          .swiper-pagination {
            bottom: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}
