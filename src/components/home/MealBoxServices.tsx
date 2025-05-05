import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MealBoxServices({ menuData }: { menuData: any }) {
  console.log(menuData);
  return (
    <section className="py-10 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meal Box Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Delicious, nutritious meals delivered to your door
          </p>
          <div className="max-w-md  mx-auto border-b-2 mt-4 mb-8 md:mb-10 lg:mb-14 border-[#424242]"></div>
        </div>

        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {menuData?.data?.slice(0, 5).map((plan: any) => (
            <Card
              style={{ padding: "5px" }}
              key={plan._id}
              className={`hover:shadow-lg bg-black transition-shadow text-white duration-300 ${
                plan.featured ? "border-2 border-green-600 " : ""
              }`}
            >
              {plan.featured && (
                <Badge
                  variant="default"
                  className="absolute -top-3 -right-3 bg-green-500 z-10"
                ></Badge>
              )}
              <div className="relative">
                <img
                  src={plan.menuImage}
                  alt={plan.totalPrice}
                  className="w-full h-32 rounded-md object-cover"
                  loading="lazy"
                />
              </div>
              <CardHeader className="-mt-2" style={{ padding: "0 10px" }}>
                <CardTitle>
                  {plan?.shopId?.productCategories?.length
                    ? plan?.shopId?.productCategories[
                        Math.floor(
                          Math.random() * plan?.shopId?.productCategories.length
                        )
                      ]
                    : "Not Product Category "}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {plan?.shopId?.description?.slice(0, 40)}.......
                </CardDescription>
              </CardHeader>
              <CardContent style={{ padding: "0 10px" }}>
                <ul className="space-y-1 mb-2 -mt-4">
                  {plan.shopId?.shopFeatures?.map(
                    (feature: string, index: string) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckIcon className="h-3 w-3 text-green-500 mr-2" />
                        {feature}
                      </li>
                    )
                  )}
                </ul>
                <div className="text-2xl font-bold mb-4">
                  ${plan.totalPrice}
                  <span className="text-lg font-normal text-gray-200">
                    /week
                  </span>
                </div>
                <Link href={`/meal-plan-services-details/${plan._id}`}>
                  {" "}
                  <Button className="w-full mb-3 cursor-pointer">
                    Choose Plan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={"/meal-box-services"}>
            <Button>
              View All Meal Plans{" "}
              <ArrowRightIcon className="h-4 cursor-pointer w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
