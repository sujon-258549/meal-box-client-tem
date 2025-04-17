/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "./login.zodValidactionSchema";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/Loading/Loader";
import { loginUser } from "@/services/Auth/authServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

// import { toast } from "sonner";

type loginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const email = form.watch("emailOrPhone");
  const password = form.watch("password");

  const isDisabled = !email || !password;

  const [showPassword, setShowPassword] = useState(false);

  const submit: SubmitHandler<FieldValues> = async (data) => {
    // const toastId = toast.loading("User Creating...............", {
    //   duration: 2000,
    // });
    const userData = {
      emailOrPhone: data.emailOrPhone,
      password: data.password,
    };
    console.log(userData);
    try {
      const result = await loginUser(userData);
      if (result.success) {
        toast.success(result?.message || "User Registration successful");
        router.push("/");
      } else {
        toast.error(result?.message || "User Registration failed");
      }
      console.log(result);
    } catch (error: any) {
      return Error(error);
    }
  };

  return (
    <div className="mx-5">
      <div
        style={{ boxShadow: "2px 2px 20px" }}
        className=" my-10  shadow-input mx-auto w-full max-w-xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black"
      >
        {/* <div className="flex gap-2.5 items-center">
          <img className="w-20" src="./mealbox.png" alt="" />
          <div>
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
              Login to Your Mealbox Account
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
              Please enter your credentials to access your account and start
              enjoying delicious meals delivered to your doorstep.
            </p>
          </div>
        </div> */}
        <div className="flex gap-2.5 items-center">
          <Image
            src="/mealbox.png" // assuming it's in the /public folder
            alt="Mealbox logo"
            width={80}
            height={80}
            className="w-20 h-auto"
            priority
          />
          <div>
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
              Login to Your Mealbox Account
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
              Please enter your credentials to access your account and start
              enjoying delicious meals delivered to your doorstep.
            </p>
          </div>
        </div>

        <form className="my-8" onSubmit={handleSubmit(submit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              {...register("emailOrPhone")}
              placeholder="projectmayhem@gmail.com"
            />
            <ErrorMsg msg={errors.emailOrPhone?.message} />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="password"> Password</Label>
            <Input
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
            />
            <ErrorMsg msg={errors.password?.message} />
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
            {isSubmitting ? <LoadingButton /> : "Login"}
          </Button>
        </form>
        <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <p className="mt-4 text-sm text-center text-neutral-600 dark:text-neutral-300">
          Don t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

// Component to show errors
const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-sm mt-1">{msg}</p> : null;

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
