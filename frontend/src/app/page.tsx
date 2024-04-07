import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Title from "@components/Title";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-400">
      {/* <Title /> */}
      <Signup />
      <Login />
    </main>
  );
}
