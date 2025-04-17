/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  day: z.string().min(1, "Day is required"),
  time: z.enum(["morning", "evening", "night"]),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  specialInstructions: z.string().optional(),
});

export function OrderForm({ orders }: { orders: any[] }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: "",
      time: "morning",
      quantity: 1,
      specialInstructions: "",
    },
  });

  const selectedDay = form.watch("day");
  const selectedTime = form.watch("time");
  const quantity = form.watch("quantity");
  const selectedMenu = orders.find((o) => o.day === selectedDay)?.[
    selectedTime
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Place Order</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Day Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Day</label>
          <Select
            onValueChange={(val) => form.setValue("day", val)}
            value={selectedDay}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {orders.map((order) => (
                <SelectItem key={order.day} value={order.day}>
                  {order.day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.day && (
            <p className="text-sm text-red-500">
              {form.formState.errors.day.message}
            </p>
          )}
        </div>

        {/* Time Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Time</label>
          <Select
            onValueChange={(val) => form.setValue("time", val)}
            value={selectedTime}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="night">Night</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Menu Display */}
      {selectedMenu && (
        <div className="p-3 border rounded bg-gray-50">
          <h3 className="font-medium">{selectedMenu.menu}</h3>
          <p className="text-sm text-gray-600">{selectedMenu.description}</p>
          <p className="text-sm font-medium mt-1">
            Price: ৳{selectedMenu.price}
          </p>
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Quantity</label>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => form.setValue("quantity", parseInt(e.target.value))}
        />
        {form.formState.errors.quantity && (
          <p className="text-sm text-red-500">
            {form.formState.errors.quantity.message}
          </p>
        )}
      </div>

      {/* Special Instructions */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Special Requests</label>
        <Textarea
          placeholder="Any special instructions?"
          value={form.watch("specialInstructions")}
          onChange={(e) => form.setValue("specialInstructions", e.target.value)}
        />
      </div>

      {/* Total Price */}
      {selectedMenu && (
        <div className="text-right font-medium">
          Total: ৳{selectedMenu.price * quantity}
        </div>
      )}

      <Button
        className="w-full"
        onClick={form.handleSubmit((data) => console.log(data))}
      >
        Place Order
      </Button>
    </div>
  );
}
