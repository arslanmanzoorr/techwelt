import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Industries from "@/components/Industries";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <main className="relative">
      <Navbar />
      <PageHero kicker={t("industries.kicker")} title={t("nav.industries")} subtitle={t("industries.body")} />
      <Industries />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  );
}
