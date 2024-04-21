import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import StudentRegister from "@/components/StudentRegister";
import TutorRegister from "@/components/TutorRegister";

const RegisterPage = () => {
  if (localStorage.getItem("isAuthenticated")) {
    window.location.href = "/";
  }

  return (
    <div className="mb-4 flex min-h-screen items-center justify-center">
      <Tabs defaultValue="student" className="m-4 w-[400px]">
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
