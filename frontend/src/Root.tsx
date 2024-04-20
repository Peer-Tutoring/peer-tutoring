import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function RootPage() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        {!isAuthenticated ? (
          <>
            <Button>
              <Link to="/auth/login">Login</Link>
            </Button>
            <Button>
              <Link to="/auth/register">Register</Link>
            </Button>
          </>
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </div>
    </main>
  );
}

export default RootPage;
