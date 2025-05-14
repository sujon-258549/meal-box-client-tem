"use client";
import { TUser, TMeta } from "@/types";
import { MdAdminPanelSettings } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chart } from "react-google-charts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/ui/paginaciton";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  paymentStatus: string;
  total_price: number;
}

interface ApiResponse<T> {
  data: T[];
  meta?: TMeta;
}

interface DashboardProps {
  allUser: ApiResponse<TUser>;
  orders: ApiResponse<Order>;
  mealProvidersData: ApiResponse<TUser>;
  customersData: ApiResponse<TUser>;
}

const AdminDashboard = ({
  allUser,
  orders,
  mealProvidersData,
  customersData,
}: DashboardProps) => {
  // Process order data
  const pendingOrder = orders.data.filter(
    (data) => data.paymentStatus === "Pending"
  );
  const paidOrder = orders.data.filter((data) => data.paymentStatus === "Paid");

  const totalPaidAmount = paidOrder.reduce((acc: number, o: Order) => {
    return acc + Number(o.total_price);
  }, 0);

  // State for filtered users
  const [customers, setCustomers] = useState<TUser[]>([]);
  const [mealProviders, setMealProviders] = useState<TUser[]>([]);

  useEffect(() => {
    if (allUser?.data) {
      setCustomers(allUser?.data?.filter((user) => user.role === "customer"));
      setMealProviders(
        allUser.data.filter((user) => user?.role === "mealProvider")
      );
    }
  }, [allUser]);

  // Chart data functions
  const getUserDistributionData = () => {
    return [
      ["User Type", "Count", { role: "style" }],
      ["Customers", customers.length, "#4285F4"],
      ["Meal Providers", mealProviders.length, "#34A853"],
    ];
  };

  const getOrderStatusData = () => {
    return [
      ["Order Status", "Count", { role: "style" }],
      ["Pending", pendingOrder?.length, "#FBBC05"],
      ["Paid", paidOrder?.length, "#0F9D58"],
    ];
  };

  const getRevenueData = () => {
    return [
      ["Metric", "Amount", { role: "style" }],
      ["Total Revenue", totalPaidAmount, "#673AB7"],
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <main className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl flex items-center justify-center gap-1.5 font-semibold text-center">
            <MdAdminPanelSettings /> Admin Dashboard
          </h1>
        </header>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-4 rounded shadow">
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="300px"
              data={getUserDistributionData()}
              options={{
                title: "User Distribution",
                chartArea: { width: "80%" },
                hAxis: { title: "User Type" },
                vAxis: { title: "Count", minValue: 0 },
              }}
            />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Chart
              chartType="PieChart"
              width="100%"
              height="300px"
              data={getOrderStatusData()}
              options={{
                title: "Order Status",
                pieHole: 0.4,
                is3D: false,
              }}
            />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Chart
              chartType="BarChart"
              width="100%"
              height="300px"
              data={getRevenueData()}
              options={{
                title: "Revenue Overview",
                chartArea: { width: "80%" },
                hAxis: { title: "Amount", minValue: 0 },
              }}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="mt-1 text-xl font-bold">{totalPaidAmount} Taka</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="mt-1 text-xl font-bold">{allUser?.data?.length}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">Customers</p>
            <p className="mt-1 text-xl font-bold">{customers?.length}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">Meal Providers</p>
            <p className="mt-1 text-xl font-bold">{mealProviders?.length}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">Orders</p>
            <p className="mt-1 text-xl font-bold">{orders?.data?.length}</p>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="bg-white rounded shadow overflow-hidden p-5">
          <Tabs defaultValue="customers">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="providers">Meal Providers</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>

            {/* Customers Tab */}
            <TabsContent value="customers">
              <div className="p-4 overflow-x-auto">
                <Table>
                  <TableCaption>List of all customers</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Create Date
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="text-right">Phone Number</TableHead>
                      <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customersData.data.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                          <div className="font-medium">{user.fullName}</div>
                          <div className="text-sm text-gray-500 sm:hidden">
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-right capitalize">
                          {user.phoneNumber}
                        </TableCell>
                        <TableCell className="text-right capitalize">
                          {user.role}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="py-5 md:py-10 flex justify-center mx-auto items-center">
                  <Pagination total={customersData.meta?.totalPage || 1} />
                </div>
              </div>
            </TabsContent>

            {/* Meal Providers Tab */}
            <TabsContent value="providers">
              <div className="p-4 overflow-x-auto">
                <Table>
                  <TableCaption>List of all meal providers</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Create Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="text-right">Phone Number</TableHead>
                      <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mealProvidersData.data.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                          <div className="font-medium">{user.fullName}</div>
                          <div className="text-sm text-gray-500 sm:hidden">
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-right capitalize">
                          {user.phoneNumber}
                        </TableCell>
                        <TableCell className="text-right capitalize">
                          {user.role}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="py-5 md:py-10 flex justify-center mx-auto items-center">
                  <Pagination total={mealProvidersData.meta?.totalPage || 1} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
