import { Link } from "react-router-dom";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import AvatarMenu from "./parts/AvatarMenu";
import ThemeToggle from "./parts/ThemeToggle";

import { Menu, School } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-2 py-5 sm:px-4">
      <h1 className="flex items-center text-2xl font-bold transition-transform hover:scale-105">
        <School className="mr-2 h-7 w-7" />
        <Link to="/">Peer Tutoring</Link>
      </h1>

      <div className="flex flex-row-reverse gap-x-2">
        {localStorage.getItem("isAuthenticated") ? (
          <AvatarMenu />
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              className="bg-background p-6 pt-20 text-foreground"
              side="right"
            >
              <nav className="grid gap-4">
                <Button variant={"secondary"} asChild>
                  <Link to="/">Home</Link>
                </Button>
                <Button variant={"secondary"} asChild>
                  <Link to="/booking">Booking</Link>
                </Button>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline" asChild>
                    <Link to="/auth/login">Login</Link>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link to="/auth/register">Register</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
