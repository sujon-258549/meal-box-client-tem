/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TUser } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import Pagination from "../ui/paginaciton";
import { toast } from "sonner";
import { changeUserStatus } from "@/services/Auth/authServices";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type UserDataResponse = {
  data: TUser[];
  meta: {
    totalPage: number;
    totalCustomers?: number;
    totalProviders?: number;
  };
};

const AllUser = ({
  customers,
  mealProvider,
}: {
  customers: UserDataResponse;
  mealProvider: UserDataResponse;
}) => {
  const router = useRouter();
  console.log("................................customers", customers);
  const handleBlockUser = async (userId: string, isBlocked?: boolean) => {
    const blockUserData = {
      id: userId,
      status: {
        isBlock: isBlocked === false ? true : false,
      },
    };
    console.log(blockUserData);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (swalResult) => {
      const result = await changeUserStatus(blockUserData);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your User has been Block.",
            icon: "success",
          });
        }
        router.refresh();
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    });
  };

  const handleDeleteUser = async (userId: string, isDelete?: boolean) => {
    const deleteUserData = {
      id: userId,
      status: {
        isDelete: isDelete === false ? true : false,
      },
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (swalResult) => {
      const deleteResult = await changeUserStatus(deleteUserData);
      if (deleteResult?.success) {
        toast.success(deleteResult?.message, { duration: 3000 });
        router.refresh();
        if (swalResult.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      } else {
        toast.error(deleteResult?.message, { duration: 3000 });
      }
    });
  };

  return (
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
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-right">Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers?.data?.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {user.fullName || user.name}
                      </div>
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
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleBlockUser(user._id, user.isBlock)}
                        aria-label={user.isBlock ? "true" : "false"}
                      >
                        {user.isBlock ? "Unblock" : "Block"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDeleteUser(user._id, user.isDelete)
                        }
                        aria-label={user.isDelete ? "false" : "true"}
                      >
                        {user.isDelete ? "Restore" : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center items-center py-10">
              <Pagination total={customers?.meta?.totalPage} />
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
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-right">Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mealProvider?.data?.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {user.name || user.fullName}
                      </div>
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
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleBlockUser(user._id, user.isBlock)}
                        aria-label={user.isBlock ? "false" : "true"}
                      >
                        {user.isBlock ? "Unblock" : "Block"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDeleteUser(user._id, user.isDelete)
                        }
                        aria-label={user.isDelete ? "false" : "true"}
                      >
                        {user.isDelete ? "Restore" : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center items-center py-10">
            <Pagination total={mealProvider?.meta?.totalPage} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AllUser;
