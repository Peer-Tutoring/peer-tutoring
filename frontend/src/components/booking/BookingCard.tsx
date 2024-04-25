import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BookSession from "@/components/BookSession";

interface BookingCardProps {
  tutor_id: number;
  name: string;
  role: string;
  hourlyRate: number;
}

const BookingCard = ({
  tutor_id,
  name,
  role,
  hourlyRate,
}: BookingCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{role}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium tracking-wider text-muted-foreground">
              Hourly Rate
            </h3>
            <p className="text-lg font-semibold">{hourlyRate} SR</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium tracking-wider text-muted-foreground">
              Availability
            </h3>
            <p className="text-sm">Sunday - Thursday (9am - 5pm)</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {localStorage.getItem("isAuthenticated") ? (
          localStorage.getItem("rate") ? (
            ""
          ) : (
            <BookSession tutor_id={tutor_id} hourlyRate={hourlyRate} />
          )
        ) : (
          <Button asChild>
            <Link to="/auth/login">Login to Book</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
