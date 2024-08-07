import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

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

import { API_ENDPOINTS } from "@/lib/apiConfig";

import { AlertCircle, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(new RegExp(".*[A-Z].*"), {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(new RegExp(".*[0-9].*"), {
        message: "Password must contain at least one number.",
      })
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
        message: "Password must contain at least one special character.",
      })
      .trim(),
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
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
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

        navigate("/dashboard");
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
        <div className="fixed bottom-4 right-4 flex justify-center rounded-lg backdrop-blur-lg">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      <div className="px-4">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>
              Enter your Email below to login back to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" required />
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
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            required
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
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
                <Link
                  to="/auth/register"
                  className="underline-offset-1 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </Form>
          </CardContent>
          <CardFooter />
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
