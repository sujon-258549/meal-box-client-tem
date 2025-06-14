/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import RadioGroup
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { registrationSchema } from "./signup.validaction";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingButton from "@/components/ui/Loading/Loader";
import Link from "next/link";
import { signupUser } from "@/services/Auth/authServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

type RegistrationSchema = z.infer<typeof registrationSchema>;

export function SignupForm() {
  const router = useRouter();
  const form = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Use setValue for manual setting of the radio group value
  } = form;
  const fullName = form.watch("fullName");
  const email = form.watch("email");
  const phoneNumber = form.watch("phoneNumber");
  const secondaryPhone = form.watch("secondaryPhone");
  const village = form.watch("address.village");
  const subDistrict = form.watch("address.subDistrict");
  const postCode = form.watch("address.postCode");
  const district = form.watch("address.district");
  const dateOfBirth = form.watch("dateOfBirth");
  const gender = form.watch("gender");

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");
  const isDisabled =
    !fullName ||
    !phoneNumber ||
    !dateOfBirth ||
    !email ||
    !password ||
    !confirmPassword ||
    !village ||
    !secondaryPhone ||
    !subDistrict ||
    !postCode ||
    !gender ||
    !district;
  const [showPassword, setShowPassword] = useState(false);

  const submit: SubmitHandler<FieldValues> = async (data) => {
    // const toastId = toast.loading("User Creating...............", {
    //   duration: 2000,
    // });
    const userData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      secondaryPhone: data.secondaryPhone,
      dateOfBirth: data.dateOfBirth,
      address: {
        village: data.address?.village || "",
        subDistrict: data.address?.subDistrict || "",
        postCode: data.address?.postCode || "",
        post: data.address?.post || "",
        district: data.address?.district || "",
      },
      gender: data.gender as "male" | "female" | "other",
    };
    console.log(userData);

    try {
      const result = await signupUser(userData);
      if (result?.success) {
        toast.success(result?.message || "signup success");
        router.push("/login");
      } else {
        toast.error(result?.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ boxShadow: "2px 2px 20px" }}
      className="my-10 shadow-input mx-auto w-full max-w-2xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black"
    >
      {/*img tag use here*/}
      {/* <div className="flex gap-2.5 items-center">
        <img className="w-20" src="./mealbox.png" alt="" />
        <div>
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome to Mealbox Registration
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Please fill out the form below to create your Mealbox account and
            get started with delicious meals delivered to your doorstep.
          </p>
        </div>
      </div> */}

      <div className="flex gap-2.5 items-center">
        <Image
          src="/mealbox.png" // Must be in the /public folder
          alt="Mealbox logo"
          width={80}
          height={80}
          className="w-20 h-auto"
          priority // Optional: loads image faster
        />
        <div>
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome to Mealbox Registration
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Please fill out the form below to create your Mealbox account and
            get started with delicious meals delivered to your doorstep.
          </p>
        </div>
      </div>

      <form className="my-8" onSubmit={handleSubmit(submit)}>
        <h3 className="text-2xl font-semibold pb-2">General Information</h3>
        <Divider />

        <LabelInputContainer className="mb-4">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="Enter your fullName"
          />
          <ErrorMsg msg={errors.fullName?.message} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            {...register("email")}
            placeholder="projectmayhem@gmail.com"
          />
          <ErrorMsg msg={errors.email?.message} />
        </LabelInputContainer>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="phone">Mobile</Label>
            <Input
              id="phone"
              {...register("phoneNumber")}
              placeholder="Enter your mobile"
            />
            <ErrorMsg msg={errors.phoneNumber?.message} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="secondaryPhone">Secondary Mobile</Label>
            <Input
              id="secondaryPhone"
              {...register("secondaryPhone")}
              placeholder="Secondary mobile number"
            />
            <ErrorMsg msg={errors.secondaryPhone?.message} />
          </LabelInputContainer>
        </div>

        <LabelInputContainer>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input id="dateOfBirth" {...register("dateOfBirth")} type="date" />
          <ErrorMsg msg={errors.dateOfBirth?.message} />
        </LabelInputContainer>

        <div className="py-4">
          <Label>Gender</Label>
          <div className="flex pt-2 gap-4">
            <RadioGroup
              {...register("gender")} // Registering the gender radio group
              onValueChange={(value: "male" | "female" | "other") =>
                setValue("gender", value)
              }
            >
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <span>Female</span>
                </label>
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <span>Other</span>
                </label>
              </div>
            </RadioGroup>
          </div>
          <ErrorMsg msg={errors.gender?.message} />
        </div>

        <Divider />
        <h3 className="text-2xl font-semibold pb-2">Address Information</h3>
        <Divider />

        <LabelInputContainer className="mb-4">
          <Label htmlFor="village">Village</Label>
          <Input
            id="village"
            {...register("address.village")}
            placeholder="Enter your village"
          />
          <ErrorMsg msg={errors.address?.village?.message} />
        </LabelInputContainer>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              {...register("address.district")}
              placeholder="Enter your district"
            />
            <ErrorMsg msg={errors.address?.district?.message} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="subDistrict">Sub-district</Label>
            <Input
              id="subDistrict"
              {...register("address.subDistrict")}
              placeholder="Enter your sub-district"
            />
            <ErrorMsg msg={errors.address?.subDistrict?.message} />
          </LabelInputContainer>
        </div>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="post">Post</Label>
            <Input
              id="post"
              {...register("address.post")}
              placeholder="Enter your post"
            />
            <ErrorMsg msg={errors.address?.post?.message} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="postCode">Post Code</Label>
            <Input
              id="postCode"
              {...register("address.postCode")}
              placeholder="Enter your post code"
            />
            <ErrorMsg msg={errors.address?.postCode?.message} />
          </LabelInputContainer>
        </div>
        <Divider />
        <h3 className="text-2xl font-semibold pb-2">Password</h3>
        <Divider />
        <LabelInputContainer className="my-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            {...register("password")}
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
          />
          <ErrorMsg msg={errors.password?.message} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            {...register("confirmPassword")}
            placeholder="Re-enter your password"
            type={showPassword ? "text" : "password"}
          />
          <ErrorMsg msg={errors.confirmPassword?.message} />
        </LabelInputContainer>

        <div className="pb-5 -mt-2.5">
          <Checkbox onClick={() => setShowPassword(!showPassword)} />
          <span className="ml-2.5">
            {showPassword ? "Hide Password" : "Show Password"}
          </span>
        </div>

        <Button
          disabled={isDisabled}
          className="w-full cursor-pointer"
          type="submit"
        >
          {isSubmitting ? <LoadingButton /> : "Sign up"}
        </Button>
      </form>
      <Divider />
      <p className="mt-4 text-sm text-center text-neutral-600 dark:text-neutral-300">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Log in here
        </Link>
      </p>
    </div>
  );
}

// Component to show errors
const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-sm mt-1">{msg}</p> : null;

// Divider Component
const Divider = () => (
  <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
);

// Wrapper for input + label
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
