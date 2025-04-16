/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// MealProviderForm.tsx
"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mealProviderSchema } from "./mealProviderValidaction"; // Fix typo in file name
import { z } from "zod";
import LoadingButton from "@/components/ui/Loading/Loader";
import { mealProviderCreate } from "@/services/Provider/providerSurvices";

type MealProviderSchema = z.infer<typeof mealProviderSchema>;

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const PRODUCT_CATEGORIES = [
  "Biryani",
  "Pulao",
  "Fried Rice",
  "Khichuri",
  "Beef Curry",
  "Chicken Curry",
  "Mutton Curry",
  "Fish Curry",
  "Shorshe Ilish",
  "Panta Bhat",
  "Prawn Curry",
  "Veg Bhaji",
  "Beguni",
  "Chingri Malai",
  "Macher Jhol",
];

const PAYMENT_METHODS = ["Cash", "Credit Card", "Debit Card", "Mobile Payment"];

export function MealProviderForm() {
  const form = useForm<MealProviderSchema>({
    resolver: zodResolver(mealProviderSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    watch,
  } = form;

  const submit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    try {
      const result = await mealProviderCreate(data);
      if (result.success) {
        console.log("meal provider create", result);
        return result.data;
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const toggleDay = (day: string) => {
    const currentDays = watch("operatingHours.daysOpen");
    setValue(
      "operatingHours.daysOpen",
      currentDays.includes(day)
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day]
    );
  };

  const toggleCategory = (category: string) => {
    const currentCategories = watch("productCategories");
    setValue(
      "productCategories",
      currentCategories.includes(category)
        ? currentCategories.filter((c) => c !== category)
        : [...currentCategories, category]
    );
  };

  const togglePaymentMethod = (method: string) => {
    const currentMethods = watch("paymentMethods");
    setValue(
      "paymentMethods",
      currentMethods.includes(method)
        ? currentMethods.filter((m) => m !== method)
        : [...currentMethods, method]
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 my-10 bg-white rounded-lg shadow">
      <div className="flex gap-2.5 items-center">
        <img className="w-20" src="./mealbox.png" alt="Mealbox Logo" />
        <div>
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
            Register as a Meal Provider
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
            Fill out the form below to create your meal provider account and
            start managing your offerings efficiently.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        {/* Basic Shop Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          <div>
            <Label className="pb-3.5" htmlFor="shopName">
              Shop Name*
            </Label>
            <Input
              id="shopName"
              placeholder="Enter your Shop name"
              {...register("shopName")}
              type="text"
            />
            {errors.shopName && (
              <p className="text-red-500 text-sm">{errors.shopName.message}</p>
            )}
          </div>

          <div>
            <Label className="pb-3.5" htmlFor="ownerName">
              Owner Name*
            </Label>
            <Input
              id="ownerName"
              {...register("ownerName")}
              placeholder="Enter your Owner Name"
              type="text"
            />
            {errors.ownerName && (
              <p className="text-red-500 text-sm">{errors.ownerName.message}</p>
            )}
          </div>
        </div>

        {/* <div>
          <Label className="pb-3.5">Shop Address*</Label>
          <Textarea
            {...register("shopAddress")}
            placeholder="Enter your address"
          />
          {errors.shopAddress && (
            <p className="text-red-500 text-sm">{errors.shopAddress.message}</p>
          )}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="pb-3.5" htmlFor="phoneNumber">
              Phone Number*
            </Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="Enter your phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <Label className="pb-3.5" htmlFor="establishedYear">
              Established Year*
            </Label>
            <Input
              type="number"
              placeholder="Enter establishment year"
              {...register("establishedYear", { valueAsNumber: true })}
              min={1900}
              max={new Date().getFullYear()}
            />
            {errors.establishedYear && (
              <p className="text-red-500 text-sm">
                {errors.establishedYear.message}
              </p>
            )}
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-4">
          <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          <h2 className="text-xl font-semibold">Operating Hours</h2>
          <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="pb-3.5">Opening Time*</Label>
              <Input type="time" {...register("operatingHours.open")} />
              {errors.operatingHours?.open && (
                <p className="text-red-500 text-sm">
                  {errors.operatingHours.open.message}
                </p>
              )}
            </div>

            <div>
              <Label className="pb-3.5">Closing Time*</Label>
              <Input type="time" {...register("operatingHours.close")} />
              {errors.operatingHours?.close && (
                <p className="text-red-500 text-sm">
                  {errors.operatingHours.close.message}
                </p>
              )}
            </div>
          </div>

          {/* <div>
            <Label className="pb-3.5">Days Open*</Label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <Button
                  key={day}
                  type="button"
                  variant={
                    watch("operatingHours.daysOpen").includes(day)
                      ? "default"
                      : "outline"
                  }
                  onClick={() => toggleDay(day)}
                  className="h-8 px-3"
                >
                  {day.substring(0, 3)}
                </Button>
              ))}
            </div>
            {errors.operatingHours?.daysOpen && (
              <p className="text-red-500 text-sm">
                {errors.operatingHours.daysOpen.message}
              </p>
            )}
          </div> */}
        </div>

        {/* Product Categories */}
        {/* <div className="space-y-4">
          <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          <Label>Product Categories*</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {PRODUCT_CATEGORIES.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={watch("productCategories").includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={`category-${category}`}>{category}</Label>
              </div>
            ))}
          </div>
          {errors.productCategories && (
            <p className="text-red-500 text-sm">
              {errors.productCategories.message}
            </p>
          )}
        </div> */}

        {/* Payment Methods */}
        {/* <div className="space-y-4">
          <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          <Label className="pb-3.5">Payment Methods*</Label>
          <div className="flex flex-wrap gap-4">
            {PAYMENT_METHODS.map((method) => (
              <div key={method} className="flex items-center space-x-2">
                <Checkbox
                  id={`payment-${method}`}
                  checked={watch("paymentMethods").includes(method)}
                  onCheckedChange={() => togglePaymentMethod(method)}
                />
                <Label htmlFor={`payment-${method}`}>{method}</Label>
              </div>
            ))}
          </div>
          {errors.paymentMethods && (
            <p className="text-red-500 text-sm">
              {errors.paymentMethods.message}
            </p>
          )}
        </div> */}

        {/* Optional Fields */}
        <div className="space-y-4">
          <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div>
            <Label className="pb-3.5">Website</Label>
            <Input {...register("website")} placeholder="https://" type="url" />
            {errors.website && (
              <p className="text-red-500 text-sm">{errors.website.message}</p>
            )}
          </div>

          <div>
            <Label className="pb-3.5">Facebook URL</Label>
            <Input
              {...register("socialMediaLinks.facebook")}
              placeholder="https://facebook.com/yourpage"
              type="url"
            />
            {errors.socialMediaLinks?.facebook && (
              <p className="text-red-500 text-sm">
                {errors.socialMediaLinks.facebook.message}
              </p>
            )}
          </div>

          <div>
            <Label className="pb-3.5">Instagram URL</Label>
            <Input
              {...register("socialMediaLinks.instagram")}
              placeholder="https://instagram.com/yourprofile"
              type="url"
            />
            {errors.socialMediaLinks?.instagram && (
              <p className="text-red-500 text-sm">
                {errors.socialMediaLinks.instagram.message}
              </p>
            )}
          </div>

          <div>
            <Label className="pb-3.5">Twitter URL</Label>
            <Input
              {...register("socialMediaLinks.twitter")}
              placeholder="https://twitter.com/yourprofile"
              type="url"
            />
            {errors.socialMediaLinks?.twitter && (
              <p className="text-red-500 text-sm">
                {errors.socialMediaLinks.twitter.message}
              </p>
            )}
          </div>

          <div>
            <Label className="pb-3.5">LinkedIn URL</Label>
            <Input
              {...register("socialMediaLinks.linkedin")}
              placeholder="https://linkedin.com/company/yourcompany"
              type="url"
            />
            {errors.socialMediaLinks?.linkedin && (
              <p className="text-red-500 text-sm">
                {errors.socialMediaLinks.linkedin.message}
              </p>
            )}
          </div>

          <div>
            <Label className="pb-3.5">Customer Service Contact</Label>
            <Input
              {...register("customerServiceContact")}
              placeholder="Enter customer service number"
            />
            {errors.customerServiceContact && (
              <p className="text-red-500 text-sm">
                {errors.customerServiceContact.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full">
          {isSubmitting ? <LoadingButton /> : "Register Shop"}
        </Button>
      </form>
    </div>
  );
}
