import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <main className="relative">
      <Navbar />
      <PageHero kicker={t("contact.kicker")} title={t("nav.contact")} subtitle={t("contact.body")} />
      <Contact />
      <Footer />
    </main>
  );
}
