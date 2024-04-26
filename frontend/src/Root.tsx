import Header from "@/components/shared/header/Header";
import Footer from "./components/shared/footer/Footer";

import { Hero, Team } from "@/components/landing/index";

function RootPage() {
  return (
    <>
      <Header />
      <Hero />
      <Team />
      <Footer />
    </>
  );
}

export default RootPage;
