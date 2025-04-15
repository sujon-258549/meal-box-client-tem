/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/Loading/Loader";
import { mealProviderSchema } from "./mealProviderValidaction";
import { Textarea } from "@/components/ui/textarea";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

// import { toast } from "sonner";

type loginSchema = z.infer<typeof mealProviderSchema>;
const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const PAYMENT_METHODS = ["Cash", "Credit Card", "Debit Card", "Mobile Payment"];
export function CreateMealProviderForm() {
  const form = useForm<loginSchema>({
    resolver: zodResolver(mealProviderSchema),
    defaultValues: {
      // @ts-expect-error value
      productCategories: [{ value: "" }],
      operatingHours: {
        open: "",
        close: "",
        daysOpen: [],
      },
    },
  });
  //   file upload
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };
  const {
    formState: { isSubmitting },
  } = form;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const toggleDay = (day: string) => {
    const currentDays = watch("operatingHours.daysOpen");
    setValue(
      "operatingHours.daysOpen",
      currentDays.includes(day)
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day]
    );
  };
  const togglePaymentMethod = (method: string) => {
    const currentMethods = watch("paymentMethods") || [];
    setValue(
      "paymentMethods",
      currentMethods.includes(method)
        ? currentMethods.filter((m) => m !== method)
        : [...currentMethods, method]
    );
  };

  //   mutiple add
  const { append: appendproductCategories, fields: productCategories } =
    useFieldArray({
      control: form.control,
      // @ts-expect-error value
      name: "productCategories",
    });
  const addAppendColor = () => {
    appendproductCategories({
      value: "",
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const toastId = toast.loading("User Creating...............", {
    const modifiedData = {
      shopName: data.shopName,
    };
    console.log(data);
    try {
      //   const formData = new FormData();
      //   formData.append("data", JSON.stringify(modifiedData));
      //   for (const file of files) {
      //     formData.append("file", file);
      //   }
      //   const result = "";
      //   if (result?.success) {
      //     toast.success(result?.message, { id: toastId, duration: 2000 });
      //     router.push("/");
      //   } else {
      //     toast.error(result?.message, { id: toastId, duration: 2000 });
      //   }
    } catch (error: any) {
      return Error(error);
    }
  };

  return (
    <div
      style={{ boxShadow: "2px 2px 20px" }}
      className=" my-10 shadow-input mx-auto w-full max-w-2xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black"
    >
      <div className="flex gap-2.5 items-center">
        <img className="w-20" src="./mealbox.png" alt="" />
        <div>
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
            Create Your Mealbox Account
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
            Please enter your credentials to access your account and start
            enjoying delicious meals delivered to your doorstep.
          </p>
        </div>
      </div>

      {/* <form className="my-8" onSubmit={handleSubmit(submit)}> */}
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          <div>
            <Label className="pb-3.5">Shop Name*</Label>
            <Input
              placeholder="Enter your Shop name"
              {...register("shopName")}
              type="text"
            />
            {errors.shopName && (
              <p className="text-red-500 text-sm">{errors.shopName.message}</p>
            )}
          </div>

          <div>
            <Label className="pb-3.5">Owner Name*</Label>
            <Input
              {...register("ownerName")}
              placeholder="Enter your Owner Name"
              type="text"
            />
            {errors.ownerName && (
              <p className="text-red-500 text-sm">{errors.ownerName.message}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Label className="pb-3.5">Shop Address*</Label>
          <Textarea
            {...register("shopAddress")}
            placeholder="Enter your address"
          />
          {errors.shopAddress && (
            <p className="text-red-500 text-sm">{errors.shopAddress.message}</p>
          )}
        </div>
        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="pb-3.5">Phone Number*</Label>
            <Input
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
            <Label className="pb-3.5">Established Year*</Label>
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

          <div>
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
          </div>
        </div>
        {/* Payment Methods */}
        <div className="my-6">
          <Label className="pb-2">Payment Methods*</Label>
          <div className="flex flex-wrap gap-4 mt-2">
            {PAYMENT_METHODS.map((method) => {
              const paymentMethods = watch("paymentMethods") || [];
              return (
                <div key={method} className="flex items-center space-x-2">
                  <Checkbox
                    id={`payment-${method}`}
                    checked={paymentMethods.includes(method)}
                    onCheckedChange={() => togglePaymentMethod(method)}
                  />
                  <Label htmlFor={`payment-${method}`}>{method}</Label>
                </div>
              );
            })}
          </div>
          <ErrorMsg msg={errors.paymentMethods?.message} />
        </div>
        <div className="space-y-4">
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
          <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          <div className="flex justify-between">
            <h2 className="text-xl  md:text-2xl font-bold">
              Product Categories
            </h2>
            <Button type="button" onClick={addAppendColor} variant={"outline"}>
              <CircleFadingPlus />
            </Button>
          </div>
          <div className="-mt-2 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="space-y-3">
            {productCategories.map((field, index) => (
              <div key={field.id} className="">
                <Input
                  // @ts-expect-error name
                  {...register(`productCategories?.${index}.name`)}
                  placeholder="Enter product category name"
                />
                {errors.customerServiceContact && (
                  <p className="text-red-500 text-sm">
                    {errors.customerServiceContact.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          {errors.productCategories?.root && (
            <p className="text-red-500 text-sm">
              {errors.productCategories.root.message}
            </p>
          )}
          <div>
            <Label className="pb-3.5">Customer Service Contact</Label>
            <Input
              {...register("customerServiceContact")}
              placeholder="Enter customer service number"
              type="number"
            />
            {errors.customerServiceContact && (
              <p className="text-red-500 text-sm">
                {errors.customerServiceContact.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full my-5 max-w-4xl mx-auto min-h-10 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
          <FileUpload onChange={handleFileUpload} />
        </div>
        <Button className="w-full" type="submit">
          {isSubmitting ? <LoadingButton /> : "Sign up "}
        </Button>
      </form>
    </div>
  );
}

// Component to show errors
const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-sm mt-1">{msg}</p> : null;
