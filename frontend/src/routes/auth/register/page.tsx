import { useNavigate } from "react-router-dom";

import Header from "@/components/shared/header/Header";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import StudentRegister from "@/components/auth/register/StudentRegister";
import TutorRegister from "@/components/auth/register/TutorRegister";

const RegisterPage = () => {
  const navigate = useNavigate();

  if (localStorage.getItem("isAuthenticated")) {
    navigate("/");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="fixed left-0 right-0 top-0">
        <Header />
      </div>

      <div className="h-24 sm:h-28" />

      <Tabs defaultValue="student">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="tutor">Tutor</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <StudentRegister />
        </TabsContent>
        <TabsContent value="tutor">
          <TutorRegister />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegisterPage;
