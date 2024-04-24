import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [toggle, setToggle] = useState(false);

  const formSchema = z.object({
    email: z.string().min(2, {
      message: "Username/Email must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error !== "") {
      setShowAlert(true); // Show the alert
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [toggle]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        "http://localhost/peer-tutoring/backend/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );
      const data = await response.json();
      if (data.success) {
        setError("");
        setShowAlert(false);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("firstName", data.user.first_name);
        localStorage.setItem("lastName", data.user.last_name);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("isAuthenticated", data.success);
        if (data.isTutor) {
          localStorage.setItem("subject", data.user.subject);
          localStorage.setItem("rate", data.user.rate);
        }
        window.location.href = "/";
      } else {
        setError(`${data.message}. Please try again.`);
        setToggle(!toggle);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
      setToggle(!toggle);
    }
  }

  return (
    <>
      {showAlert && (
        <div className="fixed top-0 flex justify-center backdrop-blur-sm backdrop-filter">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome Back!</CardTitle>
          <CardDescription>
            Enter your Email below to login back to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/auth/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="underline">
                Sign up
              </Link>
            </div>
          </Form>
        </CardContent>
        <CardFooter />
      </Card>
    </>
  );
};

export default LoginForm;
