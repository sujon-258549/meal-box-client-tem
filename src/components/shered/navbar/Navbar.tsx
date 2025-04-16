"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { useState } from "react";
import { GiMeal } from "react-icons/gi";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <header className="flex shadow-md py-2 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center max-w-5xl mx-auto justify-between gap-5 w-full">
        {/* Logo */}
        <a href="#" className="max-sm:hidden">
          <img src="./logo.png" alt="logo" className="w-24" />
        </a>
        <a href="#" className="hidden max-sm:block">
          <img src="logo.png" alt="logo" className="w-24" />
        </a>

        {/* Nav Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto max-lg:z-50 lg:block`}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseMenu}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
          >
            {/* Close Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path d="M30.391 318.583..." />
              <path d="M287.9 318.583..." />
            </svg>
          </button>

          <ul className="lg:flex gap-x-5 max-lg:space-y-3">
            <li className="mb-6 hidden max-lg:block">
              <a href="#">
                <img src="./logo.png" alt="logo" className="w-28" />
              </a>
            </li>
            {["Home", "Team", "Feature", "Blog", "About", "Contact"].map(
              (item, index) => (
                <li
                  key={index}
                  className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3"
                >
                  <a
                    href="#"
                    className={`hover:text-blue-700 ${
                      item === "Home" ? "text-blue-700" : "text-slate-900"
                    } block font-medium text-[15px]`}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* meal provider */}

        {/* Login/Signup + Menu Toggle */}
        <div className="flex max-lg:ml-auto space-x-4">
          {/* <Link href={"/create-meal-provider"}> */}
          <div className="">
            <div className="flex flex-col items-center gap-2">
              <div className="group relative">
                <span>
                  {" "}
                  <Button
                    variant="outline"
                    className="rounded-full flex items-center gap-1"
                  >
                    C M Provider
                    <GiMeal className="text-2xl" />
                  </Button>
                </span>
                <div className="bg-zinc-800 p-2 rounded-md group-hover:flex hidden absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2">
                  <span className="text-white whitespace-nowrap">
                    Create meal Provider
                  </span>
                  <div className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </div>
          </div>
          {/* </Link> */}
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="border-none">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-3.5  text-black w-[200px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Link href={"user/dashboard"}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Shop</DropdownMenuItem>
              <DropdownMenuItem>My Order</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button className="bg-red-500 text-white">
                  {" "}
                  <span>Log out</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Menu Open Button */}
          <button onClick={handleToggleMenu} className="lg:hidden">
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
