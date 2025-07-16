"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sideBarComponent";
import {
  CircleUser,
  LogOut,
  UploadCloud,
  Calculator,
  ClipboardMinus,
  Info,
  Home,
  PiggyBank,
  LayoutDashboard,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useSidebar } from "../../hooks/useSidebar";

const SidebarComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/auth/getUser")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        router.push("/authentication");
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/authentication");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const Logo = () => {
    const { open } = useSidebar();

    return (
      <div className="text-blue-500 font-extrabold text-2xl px-1 mt-6 mb-4 transition-all duration-300">
        {open ? "EZ-Tax" : "EZ"}
      </div>
    );
  };

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-6 w-6 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "AI Tax-Calculator",
      href: "/taxCalculator",
      icon: <Calculator className="h-6 w-6 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Upload",
      href: "/upload",
      icon: <UploadCloud className="h-6 w-6 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "Reports",
      href: "/generateReport",
      icon: <ClipboardMinus className="h-6 w-6 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "AI Insurance",
      href: "localhost:8000",
      icon: <PiggyBank className="h-6 w-6 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: "FAQs",
      href: "/faqs",
      icon: <Info className="h-6 w-6 flex-shrink-0" />,
      isBottom: false,
    },
    {
      label: user?.firstName || "Profile",
      href: "/profile",
      icon: <CircleUser className="h-6 w-6 flex-shrink-0" />,
      isBottom: true,
    },
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-6 w-6 flex-shrink-0" />,
      isBottom: true,
    },
    {
      label: "Logout",
      href: "",
      icon: <LogOut className="h-6 w-6 flex-shrink-0" />,
      isBottom: true,
      onClick: handleLogout,
    },
  ];

  const isLinkActive = (href) => pathname === href;

  return (
    <Sidebar>
      <SidebarBody className="justify-between">
        <div className="flex h-full flex-col flex-1 overflow-y-auto overflow-x-hidden font-montserrat font-medium">
          <Logo />
          <div className="flex h-full flex-col">
            {/* Top Links */}
            <div className="flex flex-col gap-4">
              {links
                .filter((link) => !link.isBottom)
                .map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    className={`rounded-lg p-1.75 transition-colors duration-150 ${
                      isLinkActive(link.href)
                        ? "bg-blue-500 text-[#FFFFFF]"
                        : "text-[#0A153A] hover:bg-blue-500 hover:text-[#FFFFFF]"
                    }`}
                  />
                ))}
            </div>

            {/* Bottom Links */}
            <div className="mt-auto flex flex-col gap-4 mb-2">
              {links
                .filter((link) => link.isBottom)
                .map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    className={`rounded-lg p-1.75 transition-colors duration-150 ${
                      isLinkActive(link.href)
                        ? "bg-blue-500 text-[#FFFFFF]"
                        : "text-[#0A153A] hover:bg-blue-500 hover:text-[#FFFFFF]"
                    }`}
                    onClick={link.onClick}
                  />
                ))}
            </div>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default SidebarComponent;
