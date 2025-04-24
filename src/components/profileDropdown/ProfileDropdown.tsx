import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getMe, logout } from "@/services/Auth/authServices";
import { TUser } from "@/types";

const ProfileDropdown: React.FC = () => {
  const { setIsLoading, user } = useUser();
  const [data, setData] = useState<TUser | null>(null);

  // Fetch profile when `user` becomes truthy
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await getMe();
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
    setIsLoading(true);
  };

  // Profile image or fallback
  const imgSrc = data?.profileImage || "https://github.com/shadcn.png";
  // Derive initials if you have a name field
  const initials = data?.name
    ? data.name
        .split(" ")
        .map((n: any[]) => n[0])
        .join("")
        .toUpperCase()
    : "SN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border-none cursor-pointer">
          <AvatarImage src={imgSrc} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-5 text-black w-[200px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/dashboard" passHref>
          <DropdownMenuItem asChild>Dashboard</DropdownMenuItem>
        </Link>

        <Link href="/dashboard/user/view-profile" passHref>
          <DropdownMenuItem asChild>Profile</DropdownMenuItem>
        </Link>

        {user?.role === "mealProvider" && (
          <Link href="/dashboard/meal-provider/my-meal-provider" passHref>
            <DropdownMenuItem asChild>My Shop</DropdownMenuItem>
          </Link>
        )}

        <Link href="/dashboard/order/my-order" passHref>
          <DropdownMenuItem asChild>My Order</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <Button className="bg-red-600 text-white w-full">
            <span className="flex items-center gap-1.5">
              Log out <LogIn className="text-white" />
            </span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
