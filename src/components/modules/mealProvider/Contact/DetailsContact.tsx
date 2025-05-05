import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { TContact } from "@/types/contact";

const DetailsContact = ({ data }: { data: TContact }) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-[#424242] text-white px-5 py-2 rounded-md">
        Details
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">Contact Details</DialogTitle>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{data.name}</h3>
              <p className="text-gray-600">{data.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{data.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID</p>
                <p className="truncate">{data.sendId}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p>{data.address}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Message</p>
              <p className="whitespace-pre-line">{data.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p>{format(new Date(data.createdAt), "MMM d, yyyy h:mm a")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsContact;
