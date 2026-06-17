import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <main className="relative">
      <Navbar />
      <PageHero kicker={t("services.kicker")} title={t("nav.services")} subtitle={t("services.subtitle")} />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
