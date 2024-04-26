import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { HeroCards } from "./parts/HeroCards";

const Hero = () => {
  return (
    <section className="container grid place-items-center gap-4 py-16 md:py-24 lg:grid-cols-2">
      <div className="space-y-6 text-center lg:text-start">
        <main className="text-5xl font-bold capitalize md:text-6xl">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent">
              Unlock
            </span>{" "}
            your academic
          </h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-destructive/60 to-destructive bg-clip-text text-transparent">
              Potential
            </span>{" "}
            with tutoring
          </h2>
        </main>

        <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
          Say goodbye to academic challenges and hello to success!
        </p>

        {!localStorage.getItem("isAuthenticated") ? (
          <Button
            size={"lg"}
            className="w-full text-lg font-semibold md:w-1/3"
            asChild
          >
            <Link to="auth/register">Get Started</Link>
          </Button>
        ) : (
          <Button
            size={"lg"}
            className="w-full text-lg font-semibold md:w-1/3"
            asChild
          >
            <Link to="booking">Book Now</Link>
          </Button>
        )}
      </div>

      <HeroCards />
    </section>
  );
};

export default Hero;
