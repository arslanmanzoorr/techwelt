import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";

export default async function FaqsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <main className="relative">
      <Navbar />
      <PageHero kicker={t("faq.kicker")} title={t("nav.faqs")} subtitle={t("faq.body")} />
      <Faq />
      <Footer />
    </main>
  );
}
