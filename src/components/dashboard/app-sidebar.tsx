/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useEffect, useState } from "react";
import { getMe } from "@/services/Auth/authServices";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    // Simulated async function (replace with real getCurrentUser logic)
    const getUser = async () => {
      const { data } = await getMe();
      setUser(data);
    };

    getUser();
  }, []);
  const data = {
    user: {
      name: user?.data?.fullName || "",
      email: user?.data?.email || "",
      avatar: "/logo.png",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Menu",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Create Menu",
            url: "/dashboard/menu/create-menu",
          },
          {
            title: "My menu",
            url: "/dashboard/menu/my-menu",
          },
          {
            title: "Update my menu",
            url: "/dashboard/menu/update-menu",
          },
        ],
      },
      {
        title: "Order",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "My Orders",
            url: "/dashboard/order/my-order",
          },
          {
            title: "Received Meal Provider Orders",
            url: "/dashboard/order/meal-provider-order",
          },
        ],
      },
      {
        title: "Meal Provider",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "My Meal Provider",
            url: "/dashboard/meal-provider/my-meal-provider",
          },
          {
            title: "Update Meal Provider",
            url: "/dashboard/meal-provider/update-meal-provider",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
