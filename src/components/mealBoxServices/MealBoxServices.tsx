import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Leaf,
  Heart,
  Shield,
  CheckIcon,
  Quote,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import Pagination from "../ui/paginaciton";
import ShareBanner from "../shered/ShareBanner/ShareBanner";

export default function MealBoxServices({ menuData }: { menuData: any }) {
  const benefits = [
    {
      icon: <CheckCircle className="h-8 w-8 text-red-500" />,
      title: "Customizable",
      description: "Swap meals to suit your preferences",
    },
    {
      icon: <Leaf className="h-8 w-8 text-red-500" />,
      title: "Fresh Ingredients",
      description: "Locally sourced, organic when possible",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Healthy",
      description: "Nutritionist-approved balanced meals",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Flexible",
      description: "Pause or cancel anytime",
    },
  ];

  return (
    <>
      <ShareBanner
        heading="Meal Box Services"
        paragraph="Home / Meal Box Services"
      />
      <div className="container">
        <main className="py-12">
          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Why Choose Our Meal Boxes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  style={{ boxShadow: "1px 1px 10px" }}
                  key={index}
                  className="text-center p-6 rounded-lg bg-gray-50"
                >
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Our Meal Plans
            </h2>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {menuData?.data?.map((plan: any) => (
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
                              Math.random() *
                                plan?.shopId?.productCategories.length
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
                      {plan.shopId?.shopFeatures
                        ?.slice(0, 2)
                        .map((feature: string, index: string) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckIcon className="h-3 w-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
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
            <div className="py-10 md:py-20">
              <Pagination total={menuData.meta.totalPage} />
            </div>

            {/* Chef's Quote Section */}
            <Card className="mt-12 bg-[#424242] text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 mt-1 text-rose-200 flex-shrink-0" />
                  <div>
                    <blockquote className="text-lg italic">
                      Food is more than sustenance - it,s an experience, a
                      memory, a connection. We pour our passion into every dish,
                      hoping to create moments you,ll cherish
                    </blockquote>
                    <footer className="mt-4 font-semibold text-right text-rose-200">
                      — Md Sujon Mia
                    </footer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </>
  );
}
