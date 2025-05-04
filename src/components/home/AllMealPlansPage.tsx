import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AllMealPlansPage() {
  const mealPlans = [
    {
      id: 1,
      title: "Classic Meal Box",
      description:
        "Perfectly balanced meals with proteins, carbs, and veggies.",
      price: 89,
      features: ["500-600 calories", "Gluten-free options", "15+ recipes"],
      image:
        "https://img.freepik.com/premium-photo/indian-hindu-veg-thali-food-platter-selective-focus_466689-35658.jpg",
      category: "balanced",
      delivery: "weekly",
      servings: 5,
      featured: false,
    },
    {
      id: 2,
      title: "Family Meal Box",
      description: "Heartier portions for the whole family with minimal prep.",
      price: 129,
      features: ["4-6 servings", "Kid-friendly", "30-min prep"],
      image: "https://images.unsplash.com/photo-1547592180-85f173990554",
      category: "family",
      delivery: "weekly",
      servings: 4,
      featured: true,
      badgeText: "Most Popular",
    },
    {
      id: 3,
      title: "Keto Meal Box",
      description: "Low-carb, high-fat meals for ketogenic lifestyle.",
      price: 99,
      features: ["Under 20g net carbs", "High-quality fats", "Chef-designed"],
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
      category: "keto",
      delivery: "weekly",
      servings: 5,
      featured: false,
    },
    {
      id: 4,
      title: "Vegan Delight Box",
      description: "Plant-based meals packed with nutrients and flavor.",
      price: 94,
      features: ["100% plant-based", "High protein", "Seasonal produce"],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      category: "vegan",
      delivery: "bi-weekly",
      servings: 5,
      featured: false,
    },
    {
      id: 5,
      title: "Athlete's Performance Box",
      description: "High-protein meals for muscle recovery and performance.",
      price: 119,
      features: ["40g+ protein", "Macro-balanced", "Recovery focused"],
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
      category: "high-protein",
      delivery: "weekly",
      servings: 7,
      featured: false,
    },
    {
      id: 6,
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
    <div className="min-h-screen bg-gradient-to-br max-w-5xl mx-auto  ">
      <div className="container px-4 py-16 mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Explore All Meal Plans
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our diverse selection of nutritionist-approved meal
            plans
          </p>
        </div>

        {/* Meal Plans Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mealPlans.map((plan) => (
            <Card
              style={{ padding: "5px" }}
              key={plan.id}
              className={`hover:shadow-lg transition-shadow duration-300 ${
                plan.featured ? "border-2 border-green-500" : ""
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
                  className="w-full rounded-md h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    {plan.servings} meals • {plan.delivery}
                  </span>
                  <Badge variant="outline" className="capitalize">
                    {plan.category}
                  </Badge>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-500">
                      /week
                    </span>
                  </div>
                  <Button>Select</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
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
