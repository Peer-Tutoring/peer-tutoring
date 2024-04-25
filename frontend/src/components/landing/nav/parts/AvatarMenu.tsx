import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AvatarMenu = () => {
  const initials = `${localStorage.getItem("firstName")?.charAt(0).toUpperCase()}${localStorage.getItem("lastName")?.charAt(0).toUpperCase()}`;

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  const [isLarge, setIsLarge] = useState(window.innerWidth >= 640);

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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="bg-white text-black">
            {initials && initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        {!isLarge && (
          <DropdownMenuItem>
            <Link to="/booking">Booking</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
