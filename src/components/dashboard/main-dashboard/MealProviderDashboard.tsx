/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MealProviderReceivedOrder from "@/components/modules/order/mealProviderRecivedOrder/MealProviderReceivedOrder";
import Link from "next/link";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Order {
  total_price: string;
  paymentStatus: string;
  createdAt: string;
}

interface Meal {
  day: string;
  morning: { menu: string; price: string };
  evening: { menu: string; price: string };
  night: { menu: string; price: string };
}

interface ProviderData {
  data?: {
    shopLogo?: string;
    name?: string;
  };
}

interface DashboardProps {
  menu: {
    meals?: Meal[];
  };
  receivedOrdersData: any;
  providerData: ProviderData;
  meOrderData: {
    data?: Order[];
  };
}

export function MealProviderDashboard({
  menu,
  receivedOrdersData,
  providerData,
  meOrderData,
}: DashboardProps) {
  const date = new Date();
  const today = date.toLocaleDateString("en-US", { weekday: "long" });
  const orders = meOrderData?.data || [];
  const pendingOrder = orders.filter(
    (data) => data.paymentStatus === "Pending"
  );
  const paidOrder = orders.filter((data) => data.paymentStatus === "Paid");
  const totalPaidAmount = paidOrder.reduce(
    (acc: number, o: Order) => acc + Number(o.total_price),
    0
  );

  const orderStatusData = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        label: "Orders",
        data: [paidOrder.length, pendingOrder.length],
        backgroundColor: ["#4ade80", "#fbbf24"],
        borderColor: ["#22c55e", "#f59e0b"],
        borderWidth: 1,
      },
    ],
  };

  const weeklyRevenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 1500, 2000, 1800, 2200, 2500],
        backgroundColor: "#6366f1",
      },
    ],
  };

  const todaysMenu = menu?.meals?.find((item) => item.day === today);

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Meal Provider Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={providerData?.data?.shopLogo} />
            <AvatarFallback>
              {providerData?.data?.name?.charAt(0) || "MP"}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg">Total Revenue</CardTitle>
            <CardDescription>All paid orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalPaidAmount.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Paid Orders</CardTitle>
            <CardDescription>Completed transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{paidOrder.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg">Pending Orders</CardTitle>
            <CardDescription>Awaiting payment</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pendingOrder.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-pink-200">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Paid vs Pending orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Pie
                data={orderStatusData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 md:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar
                data={weeklyRevenueData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-200">
          <CardHeader>
            <CardTitle>Today,s Menu</CardTitle>
            <CardDescription>{today},s meal options</CardDescription>
          </CardHeader>
          <CardContent>
            {todaysMenu ? (
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-700">Morning</h3>
                  <p className="text-gray-900">{todaysMenu.morning.menu}</p>
                  <p className="text-sm text-gray-500">
                    Price: ${todaysMenu.morning.price}
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-700">Evening</h3>
                  <p className="text-gray-900">{todaysMenu.evening.menu}</p>
                  <p className="text-sm text-gray-500">
                    Price: ${todaysMenu.evening.price}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Night</h3>
                  <p className="text-gray-900">{todaysMenu.night.menu}</p>
                  <p className="text-sm text-gray-500">
                    Price: ${todaysMenu.night.price}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <h1>No menu for today</h1>
                <Link
                  href="/dashboard/menu/create-menu"
                  className="text-blue-500 underline"
                >
                  Create Today,s Menu
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-green-200 md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <MealProviderReceivedOrder orders={receivedOrdersData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
