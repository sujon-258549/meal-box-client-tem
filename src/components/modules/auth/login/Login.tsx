/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { forgetPassword, loginUser } from "@/services/Auth/authServices";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

type loginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsLoading } = useUser();
  const redirect = searchParams.get("redirectPath");
  const [showPassword, setShowPassword] = useState(false);

  // Demo credentials
  const DEMO_CREDENTIALS = {
    USER: {
      email: "user@gmail.com",
      password: "Pa$$w0rd!",
      role: "User",
    },
    ADMIN: {
      email: "admin@gmail.com",
      password: "Pa$$w0rd!",
      role: "Admin",
    },
    MEAL_PROVIDER: {
      email: "sujon1@email.com",
      password: "Pa$$w0rd!",
      role: "Meal Provider",
    },
  };

  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = form;

  const emailOrPhone = watch("emailOrPhone");
  const password = watch("password");
  const isDisabled = !emailOrPhone || !password;

  const fillDemoCredentials = (credentials: {
    email: string;
    password: string;
    role: string;
  }) => {
    setValue("emailOrPhone", credentials.email);
    setValue("password", credentials.password);
    toast.info(
      `Demo ${credentials.role} credentials filled. Click Login to continue.`
    );
  };

  const submit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in...");
    const userData = {
      emailOrPhone: data.emailOrPhone,
      password: data.password,
    };

    try {
      setIsLoading(true);
      const result = await loginUser(userData);

      if (result?.success) {
        toast.success(result.message || "Login successful", { id: toastId });
        sessionStorage.setItem("justLoggedIn", "true");
        router.push(redirect || "/");
      } else {
        toast.error(result?.message || "Login failed. Please try again.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error("An error occurred during login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handelForgetPassword = async () => {
    if (!emailOrPhone) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      const result = await forgetPassword({ email: emailOrPhone });
      if (result.success) {
        toast.success(`${result.message} Please check your email`);
      }
    } catch (error) {
      toast.error("Failed to send password reset email");
    }
  };

  return (
    <div className="mx-5">
      <div
        style={{ boxShadow: "2px 2px 20px rgba(0, 0, 0, 0.1)" }}
        className="my-10 shadow-input mx-auto w-full max-w-xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black"
      >
        <div className="flex gap-2.5 items-center">
          <Image
            src="/mealbox.png"
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
            <Label htmlFor="emailOrPhone">Email or Phone</Label>
            <Input
              id="emailOrPhone"
              autoComplete="username"
              {...register("emailOrPhone")}
              placeholder="your@email.com or +1234567890"
            />
            <ErrorMsg msg={errors.emailOrPhone?.message} />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              autoComplete="current-password"
              {...register("password")}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
            />
            <ErrorMsg msg={errors.password?.message} />
          </LabelInputContainer>

          <div className="flex justify-between items-center pb-5">
            <div className="flex items-center">
              <Checkbox
                id="showPassword"
                checked={showPassword}
                onCheckedChange={() => setShowPassword(!showPassword)}
              />
              <Label htmlFor="showPassword" className="ml-2 cursor-pointer">
                {showPassword ? "Hide Password" : "Show Password"}
              </Label>
            </div>
            <button
              onClick={handelForgetPassword}
              type="button"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            disabled={isDisabled || isSubmitting}
            className="w-full cursor-pointer bg-primary hover:bg-primary-dark transition-colors"
            type="submit"
          >
            {isSubmitting ? <LoadingButton /> : "Login"}
          </Button>

          {/* Demo Credentials Section */}
          <div className="mt-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500 dark:bg-black dark:text-gray-400">
                  Or try demo accounts
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(DEMO_CREDENTIALS).map(([key, value]) => (
                <Button
                  key={key}
                  type="button"
                  variant="outline"
                  onClick={() => fillDemoCredentials(value)}
                  className="bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Demo {value.role}
                </Button>
              ))}
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Don,t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-sm mt-1">{msg}</p> : null;

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
