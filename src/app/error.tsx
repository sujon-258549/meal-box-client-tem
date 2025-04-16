"use client";

import Image from "next/image";

import NotFoundImage from "../assets/error/404-computer (1).svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface ErrorProps {
  error: Error & { message?: string }; // Ensures error has a message property
  reset: () => void; // Function to reset error state
}
const Error = ({ error, reset }: ErrorProps) => {
  console.log(error?.message);
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <div className="flex flex-col items-center justify-center h-screen">
              <Image
                src={NotFoundImage}
                alt="404 Not Found"
                width={400}
                height={300}
              />
              <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
              <p className="text-lg mt-2">
                {error?.message || "Something went wrong."}
              </p>

              <div className="mt-3">
                <Link href="/">
                  <Button> Back to Homepage</Button>
                </Link>

                <Button onClick={() => reset()} className="ml-3 bg-red-600">
                  {" "}
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
