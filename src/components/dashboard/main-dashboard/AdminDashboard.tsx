"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from "@/types";
import { useEffect, useState } from "react";
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
import { getAllUser, getAllUser2 } from "@/services/Auth/authServices";
import { toast } from "sonner";
interface ApiResponse {
  data: {
    data: TUser[];
    meta?: {
      totalPage: number;
    };
  };
  success: boolean;
  message?: string;
}
const AdminDashboard = ({ allUser }: { allUser: any }) => {
  console.log("allUser", allUser.data.data);
  const [allCustomers, setAllCustomers] = useState<TUser[]>([]);
  const [allMealProviders, setAllMealProviders] = useState<TUser[]>([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  console.log("result", allUser.data.data);
  useEffect(() => {
    if (allUser?.data) {
      const customers = allUser?.data?.data.filter(
        (user: TUser) => user.role === "customer"
      );

      const mealProviders = allUser?.data?.data.filter(
        (user: TUser) => user.role === "mealProvider"
      );

      setAllCustomers(customers);
      setAllMealProviders(mealProviders);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUser2();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const [allCustomersData, setAllCustomersData] = useState<TUser[]>([]);
  const [allMealProvidersData, setAllMealProvidersData] = useState<TUser[]>([]);
  const [allAdminsData, setAllAdminsData] = useState<TUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getAllUser2();

        setData(result);

        if (result?.data?.data) {
          const customers = result?.data?.data.filter(
            (user: TUser) => user.role === "customer"
          );

          const mealProviders = result?.data?.data.filter(
            (user: TUser) => user.role === "mealProvider"
          );
          const admins = result?.data?.data?.filter(
            (user: TUser) => user.role === "admin"
          );

          setAllCustomersData(customers);
          setAllMealProvidersData(mealProviders);
          setAllAdminsData(admins);
        }
      } catch (err) {
        toast.error("Failed to fetch user data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate dynamic chart data
  const generateChartData = () => {
    const roleCounts = {
      customer: allCustomersData?.length,
      mealProvider: allMealProvidersData?.length,
      admin: allAdminsData?.length,
    };

    return [
      ["Role", "Count", { role: "style" }],
      ["Customers", roleCounts.customer, "#4285F4"],
      ["Meal Providers", roleCounts.mealProvider, "#34A853"],
      ["Admins", roleCounts.admin, "#EA4335"],
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
        <div className="mb-10">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="100%"
            data={generateChartData()}
          />
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">Customer</p>
            <p className="mt-1 text-xl font-bold">{allAdminsData.length}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">All Meal Provider</p>
            <p className="mt-1 text-xl font-bold">
              {allMealProvidersData.length}
            </p>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="bg-white rounded shadow overflow-hidden p-5">
          <Tabs defaultValue="customers">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="providers">Meal Providers</TabsTrigger>
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
                        Email
                      </TableHead>
                      <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allCustomers.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{user.fullName}</div>
                          <div className="text-sm text-gray-500 sm:hidden">
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-right capitalize">
                          {user.role}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allMealProviders.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500 sm:hidden">
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-right capitalize">
                          {user.role}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <Pagination total={allUser?.data?.meta?.totalPage} />
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
