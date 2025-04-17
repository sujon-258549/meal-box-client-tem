"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Card className="w-full max-w-md p-6 text-center rounded-2xl shadow-lg">
        <CardContent className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-customcolor" />
          <h2 className="mt-4 text-2xl font-semibold text-black">
            Payment Successful!
          </h2>
          <p className="text-gray-500">
            Your transaction has been completed successfully.
          </p>
          <Button
            className="mt-6 w-full bg-customcolor hover:bg-blue-700 text-white rounded-full"
            onClick={() => router.push("/products")}
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
