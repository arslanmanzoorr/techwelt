import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <main className="relative">
      <Navbar />
      <PageHero kicker={t("about.kicker")} title={t("nav.about")} subtitle={t("about.body")} />
      <About />
      <WhyUs />
      <Process />
      <Footer />
    </main>
  );
}
