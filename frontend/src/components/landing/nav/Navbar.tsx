import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import AvatarMenu from "./parts/AvatarMenu";

import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 640);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="bg-gray-800 sm:flex sm:items-center sm:justify-between sm:px-4 sm:py-3">
        <div className="flex items-center justify-between px-4 py-3 sm:p-0">
          <div>
            <h1 className="text-lg font-bold text-white">
              <Link to="/">Peer Tutoring</Link>
            </h1>
          </div>

          {localStorage.getItem("isAuthenticated") ? (
            !isLarge ? (
              <AvatarMenu />
            ) : (
              <></>
            )
          ) : (
            <div className="sm:hidden">
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={toggleMenu}
                className="border-none bg-gray-700"
              >
                {!isOpen ? <Menu /> : <X />}
              </Button>
            </div>
          )}
        </div>
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } px-2 pb-4 pt-2 sm:flex sm:p-0`}
        >
          <Link
            to="./booking"
            className="mt-1 block rounded px-2 py-1 font-semibold text-white  sm:ml-2 sm:mt-0"
          >
            <Button className="hover:bg-gray-700">Booking</Button>
          </Link>
          {localStorage.getItem("isAuthenticated") ? (
            <AvatarMenu />
          ) : (
            <>
              <Link
                to="./auth/register"
                className="mt-1 block rounded px-2 py-1 font-semibold text-white sm:ml-2 sm:mt-0"
              >
                <Button className="hover:bg-gray-700">Register</Button>
              </Link>
              <Link
                to="./auth/login"
                className="mt-1 block rounded px-2 py-1 font-semibold text-white  sm:ml-2 sm:mt-0"
              >
                <Button className="hover:bg-gray-700">Login</Button>
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
