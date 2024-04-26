import Header from "@/components/shared/header/Header";

import LoginForm from "@/components/auth/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="fixed left-0 right-0 top-0">
        <Header />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
