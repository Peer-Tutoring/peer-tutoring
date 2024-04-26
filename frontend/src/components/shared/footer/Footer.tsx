import { Link } from "react-router-dom";

import { School } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary px-4 py-8 text-primary-foreground md:px-6">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <Link
          className="flex items-center transition-transform hover:scale-105"
          to="/"
        >
          <School className="mr-2 h-6 w-6" />
          <span className="text-lg font-bold">Peer Tutoring</span>
        </Link>

        <div className="mt-4 text-sm md:mt-0">© 2024 All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
