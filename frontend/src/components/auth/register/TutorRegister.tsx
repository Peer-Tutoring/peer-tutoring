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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const TutorRegister = () => {
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [toggle, setToggle] = useState(false);

  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
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
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    subject: z.string().min(1, { message: "Please select a subject." }),
    rate: z.coerce
      .number()
      .min(0, { message: "Rate must be a positive number." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      subject: "",
      rate: 0,
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
        "http://localhost/peer-tutoring/backend/tutor-register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );
      const data = await response.json();
      console.log(`Success: ${data.success} Message: ${data.message}`);
      if (data.success) {
        setError("");
        setShowAlert(false);
        window.location.href = "/auth/login";
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
        <div className="flex w-full justify-center">
          <div className="fixed top-3 flex justify-center backdrop-blur-sm backdrop-filter">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        </div>
      )}
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xxl text-center">
            Register as a Tutor!
          </CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          id="signup-fname"
                          required
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          id="signup-lname"
                          required
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        id="signup-email"
                        placeholder="peer@example.com"
                        required
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        id="signup-password"
                        required
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjects</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject you're good at" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Programming">Programming</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SAR per hour</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" id="rate" required />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
        <CardFooter />
      </Card>
    </>
  );
};

export default TutorRegister;
