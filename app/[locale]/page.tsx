import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import LatestNews from "@/components/LatestNews";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Per-visitor content (country from cookie/IP) — render dynamically so
// detection works on first load and the static shell can't desync on hydrate.
export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <Industries />
      <Testimonials />
      <LatestNews />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
