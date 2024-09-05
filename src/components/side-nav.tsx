"use client";

import { Fragment, useEffect, useState } from "react";
import React from "react";

import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NavItems } from "@/utils/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { signOut, useSession } from "next-auth/react";

export default function SideNav() {
  const navItems = NavItems();

  const session = useSession();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("sidebarExpanded");
      if (saved === null) {
        return true;
      }
      return JSON.parse(saved);
    }
    return true; // default state if window is not defined
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "sidebarExpanded",
        JSON.stringify(isSidebarExpanded)
      );
    }
  }, [isSidebarExpanded]);

  // useEffect(() => {
  //   console.log("session : ", session);
  // }, [session]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handeLogOut = async () => {
    await signOut();
  };

  return (
    <Fragment>
      {isClient ? (
        <div className="pr-4">
          <div
            className={cn(
              isSidebarExpanded ? "w-[200px]" : "w-[68px]",
              "border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-full bg-accent"
            )}
          >
            <aside className="flex h-full flex-col w-full break-words px-4 overflow-x-hidden columns-1">
              {/* Top */}
              <div className="mt-4 relative pb-2">
                <div className="flex flex-col space-y-1">
                  {navItems?.map((item, idx) => {
                    if (item.position === "top") {
                      return (
                        <React.Fragment key={idx}>
                          <SideNavItem
                            label={item.name}
                            icon={item.icon}
                            path={item.href}
                            active={item.active}
                            isSidebarExpanded={isSidebarExpanded}
                          />
                        </React.Fragment>
                      );
                    }
                  })}
                </div>
              </div>
              {/* Bottom */}
              <div className="sticky bottom-0 mt-auto whitespace-nowrap mb-4 transition duration-200 block">
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full my-2">
                      <div className="h-full w-full relative flex items-center whitespace-nowrap rounded-md  dark:hover:bg-neutral-700 dark:hover:text-red-500 hover:bg-neutral-200 hover:text-red-500 ">
                        {isSidebarExpanded ? (
                          <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                            <User size={20} />
                            <span>{session?.data?.user?.name || "User"}</span>
                          </div>
                        ) : (
                          <div className="relative w-full font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                            <User size={20} />
                          </div>
                        )}
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                      <DropdownMenuItem className="w-full">
                        {session.status === "authenticated" ? (
                          <button
                            className="w-full text-start"
                            onClick={handeLogOut}
                          >
                            Logout
                          </button>
                        ) : (
                          <Link className="w-full text-start" href="/login">
                            Login
                          </Link>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {isSidebarExpanded ? (
                  <ModeToggle isDropDown={false} />
                ) : (
                  <ModeToggle isDropDown={true} />
                )}
              </div>
            </aside>
            <div className="mt-[calc(calc(90vh)-40px)] relative">
              <button
                type="button"
                className="absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center border border-muted-foreground/20 rounded-full bg-accent shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                onClick={toggleSidebar}
              >
                {isSidebarExpanded ? (
                  <ChevronLeft size={16} className="stroke-foreground" />
                ) : (
                  <ChevronRight size={16} className="stroke-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </Fragment>
  );
}

export const SideNavItem: React.FC<{
  label: string;
  icon: any;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
}> = ({ label, icon, path, active, isSidebarExpanded }) => {
  return (
    <>
      {isSidebarExpanded ? (
        <Link
          href={path}
          className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
            active
              ? "font-base text-sm bg-neutral-200 shadow-sm text-red-500 dark:bg-neutral-800 dark:text-red-500 font-bold"
              : "hover:bg-neutral-200 hover:text-red-500 text-neutral-500 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-red-500"
          }`}
        >
          <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
            {icon}
            <span>{label}</span>
          </div>
        </Link>
      ) : (
        <TooltipProvider delayDuration={70}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={path}
                className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                  active
                    ? "font-base text-sm bg-neutral-200 shadow-sm text-red-500 dark:bg-neutral-800 dark:text-red-500 font-bold"
                    : "hover:bg-neutral-200 hover:text-red-500 text-neutral-500 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-red-500"
                }`}
              >
                <div className="relative font-base text-sm p-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                  {icon}
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="px-3 py-1.5 text-xs"
              sideOffset={10}
            >
              <span>{label}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};
