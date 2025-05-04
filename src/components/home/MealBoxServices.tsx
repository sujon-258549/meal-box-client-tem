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

export function MealBoxServices() {
  const mealPlans = [
    {
      id: 1,
      title: "Classic Meal Box",
      description:
        "Perfectly balanced meals with proteins, carbs, and veggies. 5 meals per week.",
      price: 89,
      features: [
        "500-600 calories per meal",
        "Gluten-free options",
        "15+ weekly rotating recipes",
      ],
      image:
        "https://img.freepik.com/premium-photo/indian-hindu-veg-thali-food-platter-selective-focus_466689-35658.jpg",
      featured: false,
    },
    {
      id: 2,
      title: "Family Meal Box",
      description:
        "Heartier portions designed to feed the whole family with minimal prep.",
      price: 129,
      features: [
        "4-6 servings per meal",
        "Kid-friendly options",
        "30-minute prep time",
      ],
      image: "https://images.unsplash.com/photo-1547592180-85f173990554",
      featured: true,
      badgeText: "Most Popular",
    },
    {
      id: 3,
      title: "Keto Meal Box",
      description:
        "Low-carb, high-fat meals to support your ketogenic lifestyle.",
      price: 99,
      features: [
        "Under 20g net carbs",
        "High-quality fats",
        "Chef-designed recipes",
      ],
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
      featured: false,
    },
    {
      id: 4,
      title: "Mediterranean Box",
      description: "Heart-healthy meals inspired by Mediterranean cuisine.",
      price: 109,
      features: ["Olive oil based", "Seafood options", "Antioxidant-rich"],
      image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
      category: "mediterranean",
      delivery: "weekly",
      servings: 5,
      featured: true,
      badgeText: "Chef's Choice",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Meal Box Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Delicious, nutritious meals delivered to your door
          </p>
          <div className="max-w-md  mx-auto border-b-2 mt-4 mb-8 md:mb-14 lg:mb-20 border-[#424242]"></div>
        </div>

        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mealPlans.map((plan) => (
            <Card
              style={{ padding: "5px" }}
              key={plan.id}
              className={`hover:shadow-lg bg-black transition-shadow text-white duration-300 ${
                plan.featured ? "border-2 border-green-600 " : ""
              }`}
            >
              {plan.featured && (
                <Badge
                  variant="default"
                  className="absolute -top-3 -right-3 bg-green-500 z-10"
                >
                  {plan.badgeText}
                </Badge>
              )}
              <div className="relative">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-32 rounded-md object-cover"
                  loading="lazy"
                />
              </div>
              <CardHeader className="-mt-2" style={{ padding: "0 10px" }}>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {plan.description.slice(0, 40)}.......
                </CardDescription>
              </CardHeader>
              <CardContent style={{ padding: "0 10px" }}>
                <ul className="space-y-1 mb-2 -mt-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckIcon className="h-3 w-3 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-2xl font-bold mb-4">
                  ${plan.price}
                  <span className="text-lg font-normal text-gray-200">
                    /week
                  </span>
                </div>
                <Button className="w-full mb-3">Choose Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={"/all-meal-plans-page"}>
            <Button>
              View All Meal Plans <ArrowRightIcon className="h-4 w-4 ml-2" />
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
