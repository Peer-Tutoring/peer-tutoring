import { useEffect, useState } from "react";
import BookingCard from "@/components/booking/BookingCard";

const BookingPage = () => {
  const [tutors, setTutors] = useState([
    { tutor_id: 0, name: "", role: "", hourlyRate: 0 },
  ]);

  useEffect(() => {
    fetch("http://localhost/peer-tutoring/backend/tutors.php")
      .then((response) => response.json())
      .then((data) => {
        setTutors(data);
      })
      .catch((error) => {
        console.error("Error fetching tutor data:", error);
      });
  }, []);

  return (
    <section className="min-h-screen bg-primary">
      <div className="mx-auto grid w-[95vw] grid-cols-1 gap-7 py-24 lg:grid-cols-2 xl:grid-cols-3">
        {tutors.map((tutor, index) => (
          <BookingCard key={index} {...tutor} />
        ))}
      </div>
    </section>
  );
};

export default BookingPage;
