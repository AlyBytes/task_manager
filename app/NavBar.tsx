"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaListCheck } from "react-icons/fa6";

const NavBar = () => {
  //we call this hook to get the current path:this hook is dependent on browser API - we need to convert it into client componenet with 'use client' directive
  const currentPath = usePathname();
  // console.log(currentPath)

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tasks", href: "/tasks/list" },
  ];

  return (
    <nav className="flex space-x-5 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        {" "}
        <FaListCheck />
      </Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames({
              //this allows the current location font bold so we see which page we're on / active page
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition colors": true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
