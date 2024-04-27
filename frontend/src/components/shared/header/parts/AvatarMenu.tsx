import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Calendar, LogOut, Monitor } from "lucide-react";

const AvatarMenu = () => {
  const navigate = useNavigate();

  const initials = `${localStorage.getItem("firstName")?.charAt(0).toUpperCase()}${localStorage.getItem("lastName")?.charAt(0).toUpperCase()}`;

  const name = `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`;
  const email = localStorage.getItem("email");

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            {initials && initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10}>
        <DropdownMenuLabel>
          <div className="flex flex-col gap-y-1">
            <span className="text-sm font-medium leading-none">{name}</span>
            <span className="text-xs leading-none text-muted-foreground">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/dashboard")}>
          <Monitor className="mr-2 h-4 w-4" /> Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/booking")}>
          <Calendar className="mr-2 h-4 w-4" /> Booking
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
