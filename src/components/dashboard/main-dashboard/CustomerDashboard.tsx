"use client";
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Pagination from "@/components/ui/paginaciton";

interface Order {
  transactionId: string;
  total_price: number;
  paymentStatus: "Paid" | "Pending";
  createdAt: string;
}

interface User {
  data: {
    fullName: string;
    profileCompletion?: number;
  };
}

interface MenuData {
  meta: {
    totalPage: number;
  };
  data: Order[];
}

interface SimpleCustomerDashboardProps {
  menu: MenuData;
  user: User;
  getMyOrders: Order[];
}

export default function SimpleCustomerDashboard({
  menu,
  user,
  getMyOrders,
}: SimpleCustomerDashboardProps) {
  const { data }: MenuData = menu;
  // @ts-expect-error data
  const getMyOrdersData = getMyOrders.data;
  const paidMeals = getMyOrdersData.filter(
    (menu: { paymentStatus: string }) => menu.paymentStatus === "Paid"
  );
  const pendingMeals = getMyOrdersData.filter(
    (menu: { paymentStatus: string }) => menu.paymentStatus === "Pending"
  );

  const totalAmount = paidMeals.reduce(
    (acc: any, order: { total_price: any }) => acc + order.total_price,
    0
  );
  const profileCompletion = user.data.profileCompletion || 90;

  const chartData = [
    { name: "Total Orders", value: data.length, fill: "#6366f1" },
    { name: "Delivered", value: paidMeals.length, fill: "#10b981" },
    { name: "Pending", value: pendingMeals.length, fill: "#ef4444" },
  ];

  const COLORS = ["#6366f1", "#10b981", "#ef4444"];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.data?.fullName} 👋
        </h1>
        <p className="text-muted-foreground">
          Heres whats happening with your orders
        </p>
      </div>

      {/* Three Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Orders Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#6366f1" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Order Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  name="Orders"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Order Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Spent"
          value={`$${totalAmount.toFixed(2)}`}
          description="All completed orders"
          icon="💰"
        />
        <StatCard
          title="Total Orders"
          value={data?.length}
          description="All time orders"
          icon="📦"
        />
        <StatCard
          title="Pending Orders"
          value={pendingMeals.length}
          description="Awaiting payment"
          icon="⏳"
        />
        <StatCard
          title="Delivered"
          value={paidMeals.length}
          description="Successful deliveries"
          icon="✅"
        />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {data.length ? (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {order.transactionId}
                        </TableCell>
                        <TableCell>${order.total_price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.paymentStatus === "Paid"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {order.paymentStatus === "Paid"
                              ? "Delivered"
                              : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(order.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-center">
                <Pagination total={menu.meta.totalPage} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 space-y-2">
              <p className="text-gray-500 text-lg">No recent orders found</p>
              <Button variant="outline" asChild>
                <Link href="/menu">Browse Menu</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {profileCompletion}% complete
            </span>
            <span className="text-sm font-medium">
              {profileCompletion < 100 ? "Almost there!" : "Complete!"}
            </span>
          </div>
          <Progress value={profileCompletion} className="h-2" />
          <div className="flex justify-end">
            <Button asChild>
              <Link href="/dashboard/user/update-profile">
                {profileCompletion < 100
                  ? "Complete Profile"
                  : "Update Profile"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: string;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <span className="text-3xl">{icon}</span>
        </div>
      </CardContent>
    </Card>
  );
}
