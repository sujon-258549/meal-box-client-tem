/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Pagination from "@/components/ui/paginaciton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import SearchAndSort from "../myorder/SearchAndSort";

const MealProviderReceivedOrder = ({ orders }: { orders: any }) => {
  console.log(orders);
  return (
    <div className="m-5 border p-2 rounded-md shadow-sm overflow-x-auto">
      <div className="mt-5">
        <SearchAndSort />
      </div>
      <Table className="min-w-full">
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Shop Logo</TableHead>
            <TableHead className="min-w-[120px]">Shop Name</TableHead>
            <TableHead className="min-w-[120px]">Author Name</TableHead>
            <TableHead className="min-w-[120px]">Shop C Number</TableHead>
            <TableHead className="min-w-[100px]">Total Price</TableHead>
            <TableHead className="min-w-[120px]">Payment Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.data.map(
            (
              order: {
                id: any;
                shopId: {
                  shopLogo: string | Blob | undefined;
                  shopName:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactPortal
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                  customerServiceContact:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactPortal
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                };
                authorId: {
                  fullName:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactPortal
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                };
                total_price: number;
                paymentStatus:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              },
              index: any
            ) => (
              <TableRow key={order.id || `order-${index}`}>
                <TableCell>
                  {order?.shopId?.shopLogo && (
                    <img
                      src={order?.shopId?.shopLogo}
                      alt={`${order.shopId.shopName} logo`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {order.shopId.shopName}
                </TableCell>
                <TableCell>{order.authorId.fullName}</TableCell>
                <TableCell>{order.shopId.customerServiceContact}</TableCell>
                <TableCell>${order.total_price.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      order.paymentStatus === "success"
                        ? "bg-green-100 text-green-800"
                        : order.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.paymentStatus === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <Pagination total={orders.meta.totalPage} />
    </div>
  );
};

export default MealProviderReceivedOrder;
