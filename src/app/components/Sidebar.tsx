"use client";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const routes = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      requiredAuth: ["ask:question"],
    },
    {
      label: "Admin-area",
      path: "/dashboard/admin",
      requiredAuth: ["delete:question"],
    },
  ];
  const path = usePathname();
  const { user, isLoading, isAuthenticated, getPermissions } =
    useKindeBrowserClient();
  const { permissions } = getPermissions();

  return (
    <div className="w-[350px] h-full relative">
      <aside className="bg-gray-900 text-white fixed w-[275px] left-0 h-full flex flex-col justify-between p-4">
        <nav className="w-full">
          <ul className="flex flex-col gap-2">
            {routes.map((link, i) => {
              if (
                !link.requiredAuth ||
                link.requiredAuth.every((p) => permissions?.includes(p))
              ) {
                return (
                  <Link
                    className={`text-center py-2 rounded-md ${
                      path == link.path ? "bg-gray-700" : ""
                    } hover:bg-gray-600`}
                    key={i}
                    href={link.path}
                  >
                    {link.label}
                  </Link>
                );
              }
            })}
          </ul>
        </nav>
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-5 items-center">
            {user?.picture && (
              <Image
                src={user.picture}
                alt="User profile picture"
                className="rounded-full"
                width={70}
                height={70}
              />
            )}

            {user?.email && (
              <p className="text-sm text-center">Logged in as {user?.email}</p>
            )}
          </div>
          {isAuthenticated && (
            <LogoutLink className="py-3 rounded-lg bg-gray-700 hover:bg-gray-600 w-full text-center mt-4">
              Log out
            </LogoutLink>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
