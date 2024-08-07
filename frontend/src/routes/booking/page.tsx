import { useEffect, useState } from "react";

import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";

import BookingCard from "@/components/booking/BookingCard";

import { API_ENDPOINTS } from "@/lib/apiConfig";

const BookingPage = () => {
  const [tutors, setTutors] = useState([
    { tutor_id: 0, name: "", role: "", hourlyRate: 0 },
  ]);

  useEffect(() => {
    fetch(API_ENDPOINTS.TUTORS)
      .then((response) => response.json())
      .then((data) => {
        setTutors(data);
      })
      .catch((error) => {
        console.error("Error fetching tutor data:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <section className="min-h-screen">
        <div className="mx-auto grid w-[95vw] grid-cols-1 gap-7 py-24 lg:grid-cols-2 xl:grid-cols-3">
          {tutors.map((tutor, index) => (
            <BookingCard key={index} {...tutor} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BookingPage;
