import React from "react";
import {
    LoginLink,
    LogoutLink,
    RegisterLink,
  } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

const Navbar = ({isLoggedIn}: {isLoggedIn: boolean}) => {
  return (
    <nav className="flex justify-around mb-10 border-b border-yellow-500 p-2 items-center">
      <Link href="/">
        <img src="./logo.png" alt="logo" width={50} height={50}/>
      </Link>
      <div>
        {isLoggedIn ? (
          <LogoutLink className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg text-slate-100 font-semibold">
            Logout
          </LogoutLink>
        ) : (
          <div className="flex items-center gap-x-5">
            <LoginLink className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-sm text-slate-100 font-semibold ">
              Login
            </LoginLink>
            <span>|</span>
            <RegisterLink className="bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded-sm text-slate-100 font-semibold ">
              sign In
            </RegisterLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
