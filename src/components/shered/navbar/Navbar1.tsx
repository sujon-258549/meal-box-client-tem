"use client";
import "./style.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { GiMeal } from "react-icons/gi";
import ProfileDropdown from "@/components/profileDropdown/ProfileDropdown";
import { LogIn, Menu } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useEffect } from "react";
import { logout } from "@/services/Auth/authServices";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
    title: "Meal Box",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "About",
      url: "/about-meal-provider",
      items: [
        {
          title: "About Meal Provider",
          url: "/about-meal-provider",
        },
        {
          title: "About Our Menu ",

          url: "/menu-about",
        },
      ],
    },
    {
      title: "All menu",
      url: "/all-menu",
    },
    {
      title: "All Meal provider",
      url: "/all-meal-provider",
    },
    {
      title: "Meal Box Services",
      url: "/meal-box-services",
    },
    {
      title: "All Blog",
      url: "/all-blogs",
    },
    {
      title: "Contact Us ",

      url: "/contact-us",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
  },
}: Navbar1Props) => {
  const { user, setIsLoading } = useUser();
  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("justLoggedIn");
    if (justLoggedIn) {
      sessionStorage.removeItem("justLoggedIn");
      window.location.reload();
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoading(true);
  };
  const pathname = usePathname();

  return (
    <section className="box-shadow py-4 sticky top-0 z-50 bg-background">
      <div className="container sticky px-5">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                alt={logo.alt}
                height={32}
                width={32}
                className="h-8 w-auto"
                priority
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
          </div>
          <div>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => {
                    const isActive =
                      pathname === item.url ||
                      pathname.startsWith(item.url + "/");

                    if (item.items) {
                      return (
                        <NavigationMenuItem key={item.title}>
                          <NavigationMenuTrigger
                            className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                              isActive
                                ? "text-white border bg-[#424242]"
                                : "text-[#424242]"
                            }`}
                          >
                            {item.title}
                          </NavigationMenuTrigger>

                          <NavigationMenuContent className="!w-[250px] sub-menu !max-w-none !pt-4 bg-white shadow-lg rounded-md">
                            <div className="grid gap-2 p-2 ">
                              {item.items.map((subItem) => (
                                <SubMenuLink
                                  key={subItem.title}
                                  item={subItem}
                                />
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      );
                    }

                    return (
                      <NavigationMenuLink
                        key={item.title}
                        href={item.url}
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? "text-white border bg-[#424242]"
                            : "text-[#424242]"
                        }`}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex max-lg:ml-auto space-x-4">
            <div className="flex flex-col items-center gap-2">
              <div className="group relative">
                {user && user?.role === "customer" && (
                  <Link href={"/create-meal-provider"}>
                    <Button
                      variant="outline"
                      className="rounded-full flex items-center gap-1 cursor-pointer"
                    >
                      C M Provider
                      <GiMeal className="text-2xl" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            {user ? (
              <ProfileDropdown />
            ) : (
              <div>
                <Button variant="default">
                  <Link
                    className="flex gap-1.5 items-center "
                    href={auth.login.url}
                  >
                    {auth.login.title}
                    <span className="">
                      <LogIn />
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={32}
                height={32}
                className="max-h-8 object-contain"
              />
            </a>
            <Sheet>
              <div className="flex gap-2 items-center">
                {user && <ProfileDropdown />}
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="border-b-2 border-black pb-1">
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8" alt={logo.alt} />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => {
                      const isActive =
                        pathname === item.url ||
                        pathname.startsWith(item.url + "/");

                      if (item.items) {
                        return (
                          <AccordionItem key={item.title} value={item.title}>
                            <AccordionTrigger className="w-full text-left p-2 font-medium">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="pl-4  py-2">
                              {item.items.map((subItem) => (
                                <a
                                  key={subItem.title}
                                  href={subItem.url}
                                  className="block p-2 hover:bg-gray-100 rounded transition-colors"
                                >
                                  {subItem.title}
                                </a>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        );
                      }

                      return (
                        <a
                          key={item.title}
                          href={item.url}
                          className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "text-white border bg-[#424242]"
                              : "text-[#424242]"
                          }`}
                        >
                          {item.title}
                        </a>
                      );
                    })}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {!user ? (
                      <Link href={auth.login.url} passHref>
                        <Button className="w-full">{auth.login.title}</Button>
                      </Link>
                    ) : (
                      <Button
                        onClick={handleLogout}
                        className="bg-red-600 text-white w-full"
                      >
                        <span className="flex gap-1.5 items-center">
                          Log out <LogIn className="text-white" />
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };
