"user client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CustomerDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Pagination from "@/components/ui/paginaciton";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";

export default function SimpleCustomerDashboard({
  menu,
  user,
}: {
  menu: any[];
  user: any;
}) {
  const { meta, data }: any = menu;
  const [pendingMeal, setPendingMeal] = useState<any[]>([]);
  const [successMeal, setSuccessMeal] = useState<any[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const paidMeals = data.filter(
        (menu: any) => menu.paymentStatus === "Paid"
      );
      const pendingMeals = data.filter(
        (menu: any) => menu.paymentStatus === "Pending"
      );
      setPendingMeal(pendingMeals);
      setSuccessMeal(paidMeals);
    }
  }, [data]);
  const generateChartData = () => {
    const roleCounts = {
      totalOrder: data.length,
      success: successMeal.length,
      pending: pendingMeal.length,
    };

    return [
      ["Role", "Count", { role: "style" }],
      ["Total Order", roleCounts.totalOrder, "#424242"],
      ["Delivery", roleCounts.success, "#34A853"],
      ["Pending", roleCounts.pending, "#EA4335"],
    ];
  };
  return (
    <div className="p-6 space-y-6">
      <div className="text-2xl font-bold text-center py-5">
        Welcome back, {user?.data?.fullName} 👋
      </div>
      <div className="mb-10">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="100%"
          data={generateChartData()}
        />
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="box-shadow">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {data?.length}
          </CardContent>
        </Card>
        <Card className="box-shadow">
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {pendingMeal.length}
          </CardContent>
        </Card>
        <Card className="box-shadow">
          <CardHeader>
            <CardTitle>Delivery</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {successMeal.length}
          </CardContent>
        </Card>
      </div>

      {/* Menu Card */}
      {data.length ? (
        <Card className="box-shadow">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((order: any, index: string) => (
                  <TableRow key={index}>
                    <TableCell>{order?.transactionId}</TableCell>
                    <TableCell>{order.total_price}</TableCell>
                    <TableCell>
                      {order.paymentStatus === "Paid" ? "Delivered" : "Pending"}
                    </TableCell>
                    <TableCell>{order.createdAt.slice(0, 10)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center py-10 border-t">
              <Pagination total={meta?.totalPage} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="box-shadow">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-gray-500">No recent orders found</p>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Profile Card */}
      <Card className="mt-4 box-shadow">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <span>You,re 90% done completing your profile</span>
          <Link href={"/dashboard/user/update-profile"}>
            <Button variant="default" className="cursor-pointer">
              Update Profile
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
