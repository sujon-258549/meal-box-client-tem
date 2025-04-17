"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function PaymentFailedPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Card className="w-full max-w-md p-6 text-center rounded-2xl shadow-lg">
        <CardContent className="flex flex-col items-center">
          <XCircle className="w-16 h-16 text-red-500" />
          <h2 className="mt-4 text-2xl font-semibold text-black">
            Payment Failed
          </h2>
          <p className="text-gray-500">
            Something went wrong with your transaction. Please try again.
          </p>
          <Button
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white rounded-full"
            onClick={() => router.push("/")}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
