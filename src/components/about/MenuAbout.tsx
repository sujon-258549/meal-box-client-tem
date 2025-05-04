import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const MenuAbout = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-0 py-8  md:py-12">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#424242] dark:text-white mb-2">
          About Our Menu
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 italic">
          Discover the story behind our culinary creations
        </p>
      </header>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Philosophy Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-rose-600">
              Our Philosophy
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We believe in creating dishes that not only satisfy your hunger
              but also tell a story. Each item is crafted using locally-sourced
              ingredients and traditional cooking methods with a modern twist.
            </p>
          </CardContent>
        </Card>

        {/* Seasonal Ingredients Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-amber-600">
              Seasonal Ingredients
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our menu changes with the seasons to ensure the freshest flavors.
              We work closely with local farmers and producers to bring you the
              best of what,s available each season.
            </p>
          </CardContent>
        </Card>

        {/* Chef's Specialties Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-emerald-600">
              Chef,s Specialties
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our head chef brings 15 years of international experience. The
              signature dishes reflect a blend of global techniques with local
              flavors, creating unique taste experiences.
            </p>
          </CardContent>
        </Card>

        {/* Dietary Options Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-indigo-600">
              Dietary Options
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We cater to various dietary needs with clearly marked vegetarian,
              vegan, gluten-free, and dairy-free options. Just ask our staff
              about any specific requirements.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chef's Quote Section */}
      <Card className="mt-12 bg-[#424242] text-white">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Quote className="h-8 w-8 mt-1 text-rose-200 flex-shrink-0" />
            <div>
              <blockquote className="text-lg italic">
                Food is more than sustenance - it,s an experience, a memory, a
                connection. We pour our passion into every dish, hoping to
                create moments you,ll cherish
              </blockquote>
              <footer className="mt-4 font-semibold text-right text-rose-200">
                — Chef Michael
              </footer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuAbout;
