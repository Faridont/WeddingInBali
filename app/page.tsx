import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { LocationMap } from "@/components/LocationMap";
import { FaqSection } from "@/components/FaqSection";
import { VisaInfo } from "@/components/VisaInfo";
import { Accommodation } from "@/components/Accommodation";
import { RSVPForm } from "@/components/RSVPForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="pb-[max(4.5rem,17svh)] xl:pb-0">
      <Hero />
      <About />
      <LocationMap />
      <FaqSection />
      <VisaInfo />
      <Accommodation />
      <RSVPForm />
      <Footer />
    </main>
  );
}
