import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import AvatarMenu from "./parts/AvatarMenu";

import { School } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-primary px-2 py-5 sm:px-7">
      <h1 className="flex items-center text-2xl font-bold text-primary-foreground transition-transform hover:scale-105">
        <School className="mr-2 h-7 w-7" />
        <Link to="/">Peer Tutoring</Link>
      </h1>

      <div>
        {localStorage.getItem("isAuthenticated") ? (
          <AvatarMenu />
        ) : (
          <div className="flex gap-x-2 sm:gap-x-4">
            <Button
              variant={"secondary"}
              className="h-9 rounded-md px-3 sm:h-11 sm:px-8 sm:text-base"
              asChild
            >
              <Link to="/auth/register">Register</Link>
            </Button>

            <Button
              variant={"secondary"}
              className="h-9 rounded-md px-3 sm:h-11 sm:px-8 sm:text-base"
              asChild
            >
              <Link to="/auth/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
