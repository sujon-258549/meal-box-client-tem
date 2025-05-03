"use client"
import { motion } from 'framer-motion';
import { TMealPlan } from "@/types";

type ImageGalleryProps = {
    menus: {
        data?: TMealPlan[];
    };
    className?: string;
};

const ImageGallery = ({ menus = { data: [] }, className = "" }: ImageGalleryProps) => {
    if (!menus?.data?.length) {
        return (
            <section className={`py-3 md:py-6 ${className}`}>
                <div className="text-center py-12">
                    <p className="text-gray-500">No menu items available</p>
                </div>
            </section>
        );
    }
    console.log(menus)
    return (
        <section className={`py-3 md:py-6 ${className}`}>
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    Our Gallery
                </h1>
                <div className="max-w-md mx-auto border-b-2 mt-4 border-[#424242]"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 py-8 md:py-14 lg:grid-cols-4 gap-4 md:gap-6">
                {menus?.data?.slice(0,12).map((menu) => (
                    <motion.div style={{boxShadow:"8px 8px 8px"}}
                        key={menu._id}
                        whileTap={{ scale: 1 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 2, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg"
                    >
                        <img
                            src={menu.menuImage}
                            alt={menu.shopId.shipName || "Menu item"}
                            className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                        {menu.shopId.shopName && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <h3 className="text-white font-medium truncate">{menu.shopId.shopName}</h3>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ImageGallery;