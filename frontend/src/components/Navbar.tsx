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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initials = `${localStorage.getItem("firstName")?.charAt(0).toUpperCase()}${localStorage.getItem("lastName")?.charAt(0).toUpperCase()}`;

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
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={toggleMenu}
            className="border-none bg-gray-700"
          >
            {!isOpen ? <Menu /> : <X />}
          </Button>
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
                <AvatarFallback className=" bg-white text-black">
                  {initials ? initials : ""}
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
