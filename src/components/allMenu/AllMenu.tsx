/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/IphoneCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlignLeft, ShoppingCart } from "lucide-react";

import Link from "next/link";
import Pagination from "@/components/ui/paginaciton";
import { FaExternalLinkAlt } from "react-icons/fa";
import ShareBanner from "../shered/ShareBanner/ShareBanner";

export const AllMenu = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <>
      <ShareBanner
        heading="All Menu Product"
        paragraph="Home / All Menu Product"
      />
      <div className="py-10">
        <div className=" container ">
          <div className="grid grid-cols-1 pt-8 md:pt-12 pb-10 md:pb-20 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5">
            {data?.data?.map((menu: any, index: number) => {
              // Calculate total for this specific menu
              const menuTotal =
                menu.meals?.reduce(
                  (sum: number, day: any) =>
                    sum +
                    (day.morning?.price || 0) +
                    (day.evening?.price || 0) +
                    (day.night?.price || 0),
                  0
                ) || 0;

              return (
                <div
                  key={menu._id} // Better to use menu._id instead of index
                >
                  <Card
                    style={{
                      boxShadow: "8px 8px 8px",
                      borderRadius: "10px",
                    }}
                    className="bg-[#130707] text-white mx-auto max-w-sm w-full rounded-xl p-2"
                  >
                    {/* Image */}
                    <div className="bg-gray-600 w-full h-40 rounded-xl  overflow-hidden">
                      <img
                        src={menu?.menuImage}
                        className="h-full w-full object-cover"
                        alt={menu.shopId?.shopName || "Menu image"}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="px-2 pb-2 space-y">
                      <h2 className="text-lg font-semibold line-clamp-1">
                        {menu.shopId?.shopName || "Untitled Menu"}
                      </h2>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {menu.meals?.length || 0} days meal plan • Various
                        delicious options
                      </p>

                      {/* Price */}
                      <div className="flex gap-2.5">
                        <p className="text-[16px] font-semibold">
                          Weekly Price
                        </p>
                        <p className="text-[16px] font-bold">
                          ${menuTotal.toFixed(2)}
                        </p>
                      </div>

                      {/* Button */}
                      <div className=" mt-4 flex justify-between">
                        <div className="flex flex-col gap-2">
                          <Link href={`/details-menu/${menu._id}`}>
                            <Button className="w-full cursor-pointer px-2">
                              <FaExternalLinkAlt className="w-4 h-4 mr-1" />
                            </Button>
                          </Link>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/dashboard/order/details-menu/${menu._id}`}
                          >
                            <Button className="w-full cursor-pointer">
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              Order now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="py-10">
            <Pagination total={data?.meta?.totalPage} />
          </div>
        </div>
      </div>
    </>
  );
};
