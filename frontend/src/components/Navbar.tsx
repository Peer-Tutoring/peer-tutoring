import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const name = localStorage.getItem("username");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="bg-gray-800 sm:flex sm:items-center sm:justify-between sm:px-4 sm:py-3">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
          <h1 className="text-lg font-bold text-white">
            <Link to="/">Peer Tutoring</Link>
          </h1>
        </div>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-gray-400 hover:text-white focus:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.293 5.293a1 1 0 1 0-1.414-1.414L10 8.586 7.707 6.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } px-2 pb-4 pt-2 sm:flex sm:p-0`}
      >
        {localStorage.getItem("isAuthenticated") ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"
                  alt="profile image"
                />
                <AvatarFallback>
                  {name ? name.charAt(0).toUpperCase() : ""}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
  );
};

export default Navbar;
