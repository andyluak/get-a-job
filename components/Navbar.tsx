import Link from "next/link";
import React from "react";

import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="max-desktop flex justify-between border-b-2 px-8 py-8 md:px-16">
      <Link href="/" className="sm:m-auto">
        <Logo className="w-48" />
        <span className="sr-only">Home</span>
      </Link>
      <nav className="block sm:hidden">
        <ul className="flex gap-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
