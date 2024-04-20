import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

function RootPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        <Button>
          <Link to="/auth/login">Login</Link>
        </Button>
        <Button>
          <Link to="/auth/register">Register</Link>
        </Button>
      </div>
    </main>
  );
}

export default RootPage;
