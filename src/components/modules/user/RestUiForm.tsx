/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { resetPassword } from "@/services/Auth/authServices";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/ui/Loading/Loader";

// Define validation schema
const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, {
        message: "New password must be at least 8 characters long",
      })
      .refine(
        (value) => /[A-Z]/.test(value),
        "Password must contain at least one uppercase letter"
      )
      .refine(
        (value) => /[0-9]/.test(value),
        "Password must contain at least one number"
      )
      .refine(
        (value) => /[^A-Za-z0-9]/.test(value),
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof ResetPasswordSchema>;

export function RestUiForm({ token, email }: { token: string; email: string }) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  console.log(token, email);
  const router = useRouter();
  const onSubmit = async (data: ChangePasswordFormValues) => {
    const modifyData = {
      email: email,
      newPassword: data.newPassword,
    };
    const toastId = toast.loading("Update password ...........", {
      duration: 2000,
    });
    console.log(modifyData);
    try {
      const result = await resetPassword(modifyData, token);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 2000 });
        router.push("/login");
      } else {
        toast.error(result?.message, { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      toast.error("An error occurred while updating menu.", {
        id: toastId,
        duration: 2000,
      });
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto box-shadow mb-5  p-6 mt-5 md:mt-20 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2 text-sm text-gray-600">
            <p>Password must contain:</p>
            <ul className="list-disc pl-5">
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One number</li>
              <li>One special character</li>
            </ul>
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            {form.formState.isSubmitting ? (
              <LoadingButton />
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
