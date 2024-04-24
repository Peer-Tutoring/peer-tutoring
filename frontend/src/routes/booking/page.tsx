import BookingCard from "@/components/booking/BookingCard";

const BookingPage = () => {
  const randomTutors = [
    {
      name: "Khalil Melhem",
      role: "Software Tutor?",
      hourlyRate: 777,
    },
    {
      name: "Adnan Sharr",
      role: "Software Tutor?",
      hourlyRate: 777,
    },
    {
      name: "John Doe",
      role: "Math Tutor",
      hourlyRate: 888,
    },
  ];

  return (
    <section className="min-h-screen bg-primary">
      <div className="mx-auto grid w-[95vw] grid-cols-1 gap-7 py-24 lg:grid-cols-2 xl:grid-cols-3">
        {randomTutors.map((tutor) => (
          <BookingCard {...tutor} />
        ))}
      </div>
    </section>
  );
};

export default BookingPage;
