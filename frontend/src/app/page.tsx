import Link from "next/link";

import { Button } from "@components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-5">
      <Button asChild size={"lg"}>
        <Link href={"/auth/login"}>Login</Link>
      </Button>
      <Button asChild size={"lg"}>
        <Link href={"/auth/register"}>Register</Link>
      </Button>
    </main>
  );
}
