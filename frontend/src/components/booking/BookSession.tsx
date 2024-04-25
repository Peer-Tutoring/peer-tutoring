import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMediaQuery } from "@custom-react-hooks/all";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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

interface BookingSessionProps {
  tutor_id: number;
  hourlyRate: number;
}

function BookSession({ tutor_id, hourlyRate }: BookingSessionProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Book</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Session</DialogTitle>
            <DialogDescription>
              Enter the starting time of your session and how long it will last.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm tutor_id={tutor_id} hourlyRate={hourlyRate} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Book</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Book Session</DrawerTitle>
          <DrawerDescription>
            Enter the starting time of your session and how long it will last.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          className="px-4"
          tutor_id={tutor_id}
          hourlyRate={hourlyRate}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface ProfileFormProps extends React.ComponentProps<"form"> {
  tutor_id: number;
  hourlyRate: number;
}

function ProfileForm({ tutor_id, hourlyRate }: ProfileFormProps) {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();

    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);

    const currentDateString = currentDate.toISOString().slice(0, 16);
    const weekFromNowDateString = weekFromNow.toISOString().slice(0, 16);

    setMinDate(currentDateString);
    setMaxDate(weekFromNowDateString);
  }, []);

  const formSchema = z.object({
    starting_time: z.string().min(1, { message: "Please select a subject." }),
    duration: z.coerce
      .number()
      .min(1, { message: "Number of Hours must be a positive number." })
      .max(4, { message: "Session should be less than 4 hours" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      starting_time: "",
      duration: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = {
      ...data,
      student_id: localStorage.getItem("userId"),
      tutor_id: tutor_id,
      rate: hourlyRate,
    };
    try {
      const response = await fetch(API_ENDPOINTS.BOOK_SESSION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        window.location.href = "/booking";
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid items-start gap-4"
      >
        <FormField
          control={form.control}
          name="starting_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>StartingTime</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="datetime-local"
                  id="starting_time"
                  min={minDate}
                  max={maxDate}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration in hours</FormLabel>
              <FormControl>
                <Input {...field} id="duration" type="number" min="1" max="4" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Book Session</Button>
      </form>
    </Form>
  );
}

export default BookSession;
