"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { TOrderMenuList } from "@/types";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/services/Order/orderServices";

interface FormData {
  days: Record<
    string,
    {
      meals: Record<
        string,
        {
          selected: boolean;
          modifications: string;
        }
      >;
    }
  >;
}

const dayColors = {
  Saturday: "bg-orange-50 border-orange-200",
  Sunday: "bg-blue-50 border-blue-200",
  Monday: "bg-green-50 border-green-200",
  Tuesday: "bg-purple-50 border-purple-200",
  Wednesday: "bg-pink-50 border-pink-200",
  Thursday: "bg-yellow-50 border-yellow-200",
  Friday: "bg-red-50 border-red-200",
};

export function WeeklyMenuDisplay({
  orders = [],
}: {
  orders?: TOrderMenuList[];
}) {
  console.log(orders);
  const form = useForm<FormData>();
  const allMeals = orders.flatMap((order) => order?.meals || []);

  const calculateTotal = () => {
    let total = 0;
    const formData = form.getValues();

    allMeals.forEach((day) => {
      const dayData = formData.days?.[day._id];
      if (!dayData) return;

      (["morning", "evening", "night"] as const).forEach((mealTime) => {
        if (day[mealTime] && dayData.meals?.[mealTime]?.selected) {
          total += day[mealTime]?.price || 0;
        }
      });
    });

    return total;
  };
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    const orders = allMeals.map((day) => {
      const dayFormData = data.days[day._id] || { meals: {} };
      const meals: {
        menu: string;
        price: number;
        description: string;
        time: string;
      }[] = [];

      (["morning", "evening", "night"] as const).forEach((mealTime) => {
        if (day[mealTime] && dayFormData.meals?.[mealTime]?.selected) {
          meals.push({
            menu: day[mealTime]?.menu || "",
            price: day[mealTime]?.price || 0,
            description: dayFormData.meals[mealTime]?.modifications || "",
            time: mealTime,
          });
        }
      });

      return {
        meals,
      };
    });
    const orderData = {
      orders,
    };
    console.log(orderData);
    const toastId = toast.loading("Meal Creating......", { duration: 2000 });
    try {
      const result = await createOrder(orderData, "68015a739d1380a629e1c48e");
      console.log(result);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 2000 });

        router.push(result?.data?.paymentUrl);
      } else {
        toast.error(result?.message, { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      return Error(error);
    }
  };

  if (!allMeals.length) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Weekly Menu</h1>
        <p className="text-gray-500">No menu available for this week.</p>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto p-6"
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            Weekly Meal Menu
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allMeals.map((day) => (
              <div
                key={day._id}
                className={`rounded-xl p-5 shadow-md ${
                  dayColors[day.day as keyof typeof dayColors] || "bg-gray-50"
                } border`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{day.day}</h2>
                  <span className="font-bold">৳{calculateTotal()}</span>
                </div>

                {(["morning", "evening", "night"] as const).map((mealTime) => {
                  if (!day[mealTime]) return null;

                  return (
                    <div
                      key={mealTime}
                      className="mb-4 p-4 bg-white rounded-lg"
                    >
                      <FormField
                        control={form.control}
                        name={`days.${day._id}.meals.${mealTime}.selected`}
                        defaultValue={false}
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2 mb-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="flex justify-between flex-1">
                              <FormLabel className="font-semibold capitalize">
                                {mealTime}
                              </FormLabel>
                              <span className="font-bold">
                                ৳{day[mealTime]?.price}
                              </span>
                            </div>
                          </FormItem>
                        )}
                      />

                      <h4 className="text-lg font-medium">
                        {day[mealTime]?.menu}
                      </h4>
                      {day[mealTime]?.description && (
                        <p className="text-sm text-gray-600">
                          {day[mealTime]?.description}
                        </p>
                      )}

                      <FormField
                        control={form.control}
                        name={`days.${day._id}.meals.${mealTime}.modifications`}
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem className="mt-3">
                            <FormLabel className="block text-sm font-medium mb-1">
                              Special Instructions:
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any modifications?"
                                className="min-h-[60px] text-sm"
                                disabled={
                                  !form.watch(
                                    `days.${day._id}.meals.${mealTime}.selected`
                                  )
                                }
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl border">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Order Summary</h3>
                <p className="text-sm text-gray-600">Review your selections</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">৳{calculateTotal()}</p>
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">
              Confirm Order
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
