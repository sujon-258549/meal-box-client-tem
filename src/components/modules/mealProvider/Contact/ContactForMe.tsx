import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TContact } from "@/types/contact";
import Pagination from "@/components/ui/paginaciton";
import { format } from "date-fns";
import DetailsContact from "./DetailsContact";
const ContactForMe = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <div className="px-10">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Phone</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((contact: TContact) => (
            <TableRow key={contact._id}>
              <TableCell className="font-medium">
                {format(new Date(contact.createdAt), "MM/dd/yyyy hh:mm a")}
              </TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell className="text-right">{contact.phone}</TableCell>
              <TableCell className="text-right">
                <DetailsContact data={contact} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-10 md:mt-16">
        <Pagination total={data.meta.totalPage} />
      </div>
    </div>
  );
};

export default ContactForMe;
