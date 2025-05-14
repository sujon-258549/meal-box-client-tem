import React from "react";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGlobe,
  FaPhone,
  FaClock,
  FaCalendarAlt,
  FaWallet,
  FaMapMarkerAlt,
  FaStore,
  FaUser,
  FaUtensils,
  FaMoneyBillWave,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart, UtensilsCrossed } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

// ... (keep your existing interfaces)

// Define the MenuData type if not already defined
interface MenuData {
  _id: string;
  menuImage?: string;
  meals?: {
    _id?: string;
    day?: string;
    morning?: { menu?: string; price?: number };
    evening?: { menu?: string; price?: number };
    night?: { menu?: string; price?: number };
  }[];
  shopId?: {
    shopName?: string;
    shopLogo?: string;
    ownerName?: string;
    phoneNumber?: string;
    customerServiceContact?: string;
    shopAddress?: string;
    operatingHours?: {
      open?: string;
      close?: string;
      daysOpen?: string[];
    };
    paymentMethods?: string[];
    socialMediaLinks?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
    website?: string;
    establishedYear?: string;
  };
}

const DetailsMenu: React.FC<{ menu?: MenuData }> = ({ menu }) => {
  if (!menu) {
    return (
      <div className="flex container justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-center gap-2">
              <UtensilsCrossed className="w-8 h-8 text-rose-500" />
              <h3 className="text-lg font-semibold">No Meals Available</h3>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              This provider hasn,t created any meal plans yet.
            </p>
            <div className="h-[1px] w-full bg-border my-2" />
            <p className="text-xs text-muted-foreground">
              Check back later or explore other providers
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      {menu?.menuImage && (
        <div className="relative w-full mt-5  md:mt-10 h-80 rounded-xl overflow-hidden mb-10 shadow-lg">
          <Image
            src={menu.menuImage}
            alt={`${menu?.shopId?.shopName || "Shop"} menu`}
            fill
            className="object-cover "
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070000] to-transparent flex items-end p-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {menu?.shopId?.shopName}
              </h1>
              <p className="text-lg text-gray-200">
                Discover our delicious meal plans
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Menu and Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Section */}
        <div className="lg:col-span-2 space-y-6 mb-5 md:mb-10">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <FaUtensils className="text-rose-500" />
            Weekly Meal Plan
          </h2>

          {menu?.meals?.length ? (
            <div className="space-y-4">
              {menu.meals.map((dayMenu: any) => (
                <Card key={dayMenu?._id || Math.random().toString()}>
                  <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-t-lg">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FaCalendarAlt />
                      {dayMenu?.day || "Day"}
                    </h3>
                  </CardHeader>
                  <CardContent className="p-0 divide-y divide-gray-100">
                    {/* Morning */}
                    <MealTimeCard
                      time="Morning"
                      icon={<IoMdTime className="text-yellow-500" />}
                      menu={dayMenu?.morning?.menu}
                      price={dayMenu?.morning?.price}
                    />

                    {/* Evening */}
                    <MealTimeCard
                      time="Evening"
                      icon={<IoMdTime className="text-orange-500" />}
                      menu={dayMenu?.evening?.menu}
                      price={dayMenu?.evening?.price}
                    />

                    {/* Night */}
                    <MealTimeCard
                      time="Night"
                      icon={<IoMdTime className="text-indigo-500" />}
                      menu={dayMenu?.night?.menu}
                      price={dayMenu?.night?.price}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <FaUtensils className="mx-auto text-4xl text-gray-400 mb-3" />
                <p className="text-gray-500">
                  No menu available for this shop yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Shop Info Sidebar */}
        <div className="space-y-6">
          {/* Shop Card */}
          <Card className="overflow-hidden">
            {menu?.shopId?.shopLogo && (
              <div className="relative h-48 w-full">
                <Image
                  src={menu.shopId.shopLogo}
                  alt={menu.shopId.shopName || "Shop logo"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <FaStore className="text-blue-500" />
                {menu?.shopId?.shopName}
              </h3>
              <p className="text-gray-600 mb-4 flex items-center gap-2">
                <FaUser className="text-green-500" />
                Owned by {menu?.shopId?.ownerName}
              </p>

              <InfoItem
                icon={<FaPhone className="text-blue-500" />}
                title="Contact"
                value={menu?.shopId?.phoneNumber}
              />
              <InfoItem
                icon={<FaPhone className="text-green-500" />}
                title="Customer Service"
                value={menu?.shopId?.customerServiceContact}
              />
              <InfoItem
                icon={<FaMapMarkerAlt className="text-red-500" />}
                title="Address"
                value={menu?.shopId?.shopAddress}
              />
              <InfoItem
                icon={<FaClock className="text-yellow-500" />}
                title="Hours"
                value={`${menu?.shopId?.operatingHours?.open} - ${menu?.shopId?.operatingHours?.close}`}
              />
              <InfoItem
                icon={<FaCalendarAlt className="text-purple-500" />}
                title="Days Open"
                value={menu?.shopId?.operatingHours?.daysOpen?.join(", ")}
              />

              {/* Payment Methods */}
              <div className="mt-4">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <MdPayment className="text-blue-500" />
                  Payment Methods
                </h4>
                <div className="flex flex-wrap gap-2">
                  {menu?.shopId?.paymentMethods?.map(
                    (method: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        <FaWallet className="mr-1" /> {method}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h4 className="font-medium mb-2">Connect With Us</h4>
                <div className="flex gap-4">
                  {menu?.shopId?.socialMediaLinks?.facebook && (
                    <SocialLink
                      icon={<FaFacebook className="h-5 w-5" />}
                      href={menu.shopId.socialMediaLinks.facebook}
                      color="hover:text-blue-600"
                    />
                  )}
                  {menu?.shopId?.socialMediaLinks?.instagram && (
                    <SocialLink
                      icon={<FaInstagram className="h-5 w-5" />}
                      href={menu.shopId.socialMediaLinks.instagram}
                      color="hover:text-pink-600"
                    />
                  )}
                  {menu?.shopId?.socialMediaLinks?.twitter && (
                    <SocialLink
                      icon={<FaTwitter className="h-5 w-5" />}
                      href={menu.shopId.socialMediaLinks.twitter}
                      color="hover:text-blue-400"
                    />
                  )}
                  {menu?.shopId?.socialMediaLinks?.linkedin && (
                    <SocialLink
                      icon={<FaLinkedin className="h-5 w-5" />}
                      href={menu.shopId.socialMediaLinks.linkedin}
                      color="hover:text-blue-700"
                    />
                  )}
                  {menu?.shopId?.website && (
                    <SocialLink
                      icon={<FaGlobe className="h-5 w-5" />}
                      href={menu.shopId.website}
                      color="hover:text-green-600"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Established Info */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Established</p>
                <p className="text-2xl font-bold text-gray-800">
                  {menu?.shopId?.establishedYear}
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="my-8 w-full">
            <Link href={`/dashboard/order/details-menu/${menu._id}`}>
              <Button className="px-8 py-6 text-lg w-full">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const MealTimeCard: React.FC<{
  time: string;
  icon: React.ReactNode;
  menu?: string;
  price?: number;
}> = ({ time, icon, menu, price }) => (
  <div className="p-4 flex justify-between items-center">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-full bg-opacity-20 bg-current">{icon}</div>
      <div>
        <h4 className="font-medium">{time}</h4>
        <p className="text-sm text-gray-600">{menu || "Not specified"}</p>
      </div>
    </div>
    <span className="font-semibold text-gray-900 flex items-center gap-1">
      <FaMoneyBillWave className="text-green-500" />$
      {price?.toFixed(2) || "0.00"}
    </span>
  </div>
);

const InfoItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  value?: string;
}> = ({ icon, title, value }) => (
  <div className="mb-3">
    <h4 className="text-sm font-medium text-gray-500 flex items-center gap-2">
      {icon} {title}
    </h4>
    <p className="text-gray-800 mt-1">{value || "Not available"}</p>
  </div>
);

const SocialLink: React.FC<{
  icon: React.ReactNode;
  href: string;
  color: string;
}> = ({ icon, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`text-gray-500 ${color} transition-colors`}
  >
    {icon}
  </a>
);

export default DetailsMenu;
