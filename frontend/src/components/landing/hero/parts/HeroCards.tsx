import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export const HeroCards = () => {
  return (
    <div className="relative hidden h-[500px] w-[535px] flex-row flex-wrap gap-8 lg:flex">
      {/* Testimonial */}
      <Card className="absolute -top-[15px] w-[340px] shadow-primary/30 drop-shadow-xl">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <CardTitle className="text-lg">Expert Tutors</CardTitle>
        </CardHeader>
        <CardContent>
          Connect with knowledgeable tutors who excel in their subjects.
        </CardContent>
      </Card>
      {/* Team */}
      <Card className="absolute right-[20px] top-24 flex w-80 flex-col items-center justify-center shadow-primary/30 drop-shadow-xl">
        <CardHeader className="mt-8 flex items-center justify-center pb-2">
          <img
            src="/student.webp"
            alt="Student Image"
            className="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]"
          />
          <CardTitle className="text-center">Yahya Zarour</CardTitle>
          <CardDescription className="font-normal text-primary">
            Junior Student
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2 text-center">
          <p>I Aced all of my exams thanks to the help of the tutors here!</p>
        </CardContent>
        <CardFooter />
      </Card>
      {/* Service */}
      <Card className="absolute -left-[-60px] bottom-[65px] w-[350px] shadow-primary/30 drop-shadow-xl">
        <CardHeader className="flex items-start justify-start gap-4 space-y-1 text-pretty md:flex-row">
          <div>
            <CardTitle>Flexible Scheduling</CardTitle>
            <CardDescription className="text-md mt-2">
              Schedule tutoring sessions at your convenience, fitting them into
              your busy lifestyle.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
