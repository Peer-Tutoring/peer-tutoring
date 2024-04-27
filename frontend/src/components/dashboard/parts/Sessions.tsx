import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

import { Calendar, FileEdit, Plus, Trash } from "lucide-react";
import { API_ENDPOINTS } from "@/lib/apiConfig";

const session = () => {
  const [session, setSession] = useState([
    {
      tutor_name: "",
      student_name: "",
      tutor_initials: "",
      student_initials: "",
      subject: "",
      session_date: "",
      session_time: "",
    },
  ]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetch(API_ENDPOINTS.SESSIONS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSession(data);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
        });
    } else {
      console.error("Student ID is not available in local storage.");
    }
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Booked sessions</h1>
        <Link to="/booking" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule New Session
        </Link>
      </div>
      <Card>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">
                {localStorage.getItem("rate") ? "Student" : "Tutor"}
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Session Date
              </TableHead>
              <TableHead className="hidden md:table-cell">Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {session.map(
              (
                {
                  tutor_name,
                  tutor_initials,
                  subject,
                  session_date,
                  session_time,
                  student_initials,
                  student_name,
                },
                idx,
              ) => (
                <TableRow key={idx}>
                  <TableCell className="block sm:table-cell">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage />
                        <AvatarFallback>
                          {localStorage.getItem("rate")
                            ? student_initials
                            : tutor_initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {localStorage.getItem("rate")
                            ? student_name
                            : tutor_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {subject}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {session_date}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {session_time}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="icon" variant="outline">
                        <FileEdit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button size="icon" variant="outline">
                        <Calendar className="h-4 w-4" />
                        <span className="sr-only">Reschedule</span>
                      </Button>
                      <Button
                        className="text-destructive"
                        size="icon"
                        variant="outline"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Cancel</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default session;
