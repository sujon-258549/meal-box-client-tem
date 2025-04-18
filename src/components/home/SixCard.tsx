/* eslint-disable @typescript-eslint/no-explicit-any */
// components/IphoneCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlignLeft, ShoppingCart } from "lucide-react";
import { Key } from "react";
import Link from "next/link";

export const SixCard = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {data?.slice(0, 6).map((menu: any, index: Key | null | undefined) => (
          <div
            style={{ boxShadow: "10px 10px 15px", borderRadius: "10px" }}
            key={index}
          >
            <Card className="bg-[#130707]  text-white max-w-sm w-full rounded-xl p-2">
              {/* Image Placeholder */}
              <div className="bg-gray-600 w-full h-64 rounded-xl mb-4 flex items-center justify-center">
                <img src={menu?.menuImage} className="h-64 w-full" alt="" />
              </div>

              {/* Product Info */}
              <div className="p-4.5">
                <CardContent className="p-0 -mt-5 space-y-2">
                  <h2 className="text-lg font-semibold">
                    Apple iPhone 15 Pro Max
                  </h2>
                  <p className="text-sm text-gray-400">
                    256GB, Natural Titanium, 6.7 Inches – Unlocked (Renewed),
                    Unlocked for All Carriers.
                  </p>

                  {/* Price */}
                  <p className="text-2xl font-bold mt-3">$1299</p>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2 mt-4">
                    <Link href={`/dashboard/order/details-menu/${menu._id}`}>
                      <Button className="w-full">
                        <ShoppingCart className="w-4 h-4 mr-1" /> Buy now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-5">
        <Button>
          View All <AlignLeft />
        </Button>
      </div>
    </>
  );
};
