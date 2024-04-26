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

const Sessions = () => {
  const sessions = [
    {
      tutorName: "John Doe",
      tutorInitials: "JD",
      tutorSpecialty: "Math Tutor",
      date: "April 26, 2024",
      time: "4:00 PM - 5:00 PM",
      avatarSrc: "/placeholder.jpg",
    },
    {
      tutorName: "Jane Smith",
      tutorInitials: "JS",
      tutorSpecialty: "Physics Tutor",
      date: "April 27, 2024",
      time: "2:00 PM - 3:00 PM",
      avatarSrc: "/placeholder.jpg",
    },
    {
      tutorName: "John Doe",
      tutorInitials: "JD",
      tutorSpecialty: "Programing Tutor",
      date: "April 26, 2024",
      time: "4:00 PM - 5:00 PM",
      avatarSrc: "/placeholder.jpg",
    },
    {
      tutorName: "Jane Smith",
      tutorInitials: "JS",
      tutorSpecialty: "English Tutor",
      date: "April 27, 2024",
      time: "2:00 PM - 3:00 PM",
      avatarSrc: "/placeholder.jpg",
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Booked Sessions</h1>
        <Link to="/booking" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule New Session
        </Link>
      </div>
      <Card>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Tutor</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map(
              (
                {
                  tutorName,
                  tutorInitials,
                  tutorSpecialty,
                  date,
                  time,
                  avatarSrc,
                },
                idx,
              ) => (
                <TableRow key={idx}>
                  <TableCell className="block sm:table-cell">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={avatarSrc}
                          alt={`Avatar of ${tutorName}`}
                        />
                        <AvatarFallback>{tutorInitials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{tutorName}</div>
                        <div className="text-sm text-muted-foreground">
                          {tutorSpecialty}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{date}</TableCell>
                  <TableCell className="hidden md:table-cell">{time}</TableCell>
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

export default Sessions;
