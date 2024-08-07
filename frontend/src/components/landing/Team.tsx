import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const teamList = [
  {
    name: "Adnan Chaar",
    position: "Software Engineeer",
  },
  {
    name: "Khalil Melhem",
    position: "Software Engineer",
  },
];

const Team = () => {
  return (
    <section id="team" className="container pb-24 text-center sm:pb-32">
      <h2 className="text-3xl font-bold md:text-4xl">
        Our{" "}
        <span className="bg-gradient-to-r from-primary/85 to-primary bg-clip-text text-transparent">
          Dedicated{" "}
        </span>
        Crew
      </h2>

      <p className="mb-10 mt-4 text-xl text-muted-foreground">
        With a passion for innovation and attention to detail, we crafted a
        seamless academic experiences tailored to your needs.
      </p>

      <div className="grid gap-8 gap-y-10 md:grid-cols-2">
        {teamList.map(({ name, position }) => (
          <Card
            key={name}
            className="relative mt-8 flex flex-col items-center justify-center bg-muted/50"
          >
            <CardHeader className="mt-8 flex items-center justify-center pb-2">
              <img
                src="/pfp.jpeg"
                alt={`${name} ${position}`}
                className="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover"
              />
              <CardTitle className="text-center">{name}</CardTitle>
              <CardDescription className="text-primary">
                {position}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-2 text-center">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </CardContent>

            <CardFooter />
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Team;
