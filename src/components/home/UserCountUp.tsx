"use client";

import { TUser } from "@/types";
import { Plus, Users, Utensils, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

interface CountUpProps {
  allUser: any;
  className?: string;
}

const UserCountUp: React.FC<CountUpProps> = ({ allUser, className }) => {
  const users = allUser?.data || [];
  const [isVisible, setIsVisible] = useState(false);
  console.log(users);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("user-count-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Calculate counts
  const mealProviderCount = users.filter(
    (user: TUser) => user.role === "mealProvider"
  ).length;
  const customerCount = users.filter(
    (user: TUser) => user.role === "customer"
  ).length;
  const totalUsers = users.length;

  return (
    <section
      id="user-count-section"
      className={`pb-10 md:pb-16 lg:pb-24 ${className}`}
    >
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div>
            <h1 className="text-2xl md:text-4xl text-center pt-6 md:pt-10 font-bold">
              Our Growing Community
            </h1>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Join thousands of users who are already enjoying our platform
            </p>
            <div className="max-w-md  mx-auto border-b-2 mt-4 mb-8 border-[#424242]"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users Card */}
          <div className="bg-gradient-to-br from-[#000000] to-[#2c2c2c] rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-[#424242] rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Total Users
              </h3>
              {isVisible && (
                <CountUp
                  start={0}
                  end={totalUsers}
                  duration={2.5}
                  delay={0.2}
                  className="text-4xl font-bold text-white"
                />
              )}
              <div className="flex items-center mt-2">
                <Plus className="w-5 h-5 text-green-400" />
                <span className="ml-1 text-sm text-gray-300">and counting</span>
              </div>
            </div>
          </div>

          {/* Meal Providers Card */}
          <div className="bg-gradient-to-br from-[#000000] to-[#2c2c2c] rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-[#424242] rounded-full mb-4">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Meal Providers
              </h3>
              {isVisible && (
                <CountUp
                  start={0}
                  end={mealProviderCount}
                  duration={2.5}
                  delay={0.4}
                  className="text-4xl font-bold text-white"
                />
              )}
              <div className="flex items-center mt-2">
                <Plus className="w-5 h-5 text-green-400" />
                <span className="ml-1 text-sm text-gray-300">
                  serving delicious meals
                </span>
              </div>
            </div>
          </div>

          {/* Customers Card */}
          <div className="bg-gradient-to-br from-[#000000] to-[#2c2c2c] rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-[#424242] rounded-full mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Happy Customers
              </h3>
              {isVisible && (
                <CountUp
                  start={0}
                  end={customerCount}
                  duration={2.5}
                  delay={0.6}
                  className="text-4xl font-bold text-white"
                />
              )}
              <div className="flex items-center mt-2">
                <Plus className="w-5 h-5 text-green-400" />
                <span className="ml-1 text-sm text-gray-300">
                  enjoying our service
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCountUp;
