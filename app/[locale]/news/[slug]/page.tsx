import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const post = await getBySlug(slug);
  if (!post || !post.published) notFound();

  return (
    <main className="relative">
      <Navbar />
      <article className="bg-night pt-36 pb-24 sm:pt-44">
        <div className="mx-auto max-w-3xl px-5">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {t("news.backToNews")}
          </Link>

          <time className="mt-8 block text-sm text-brand-teal">
            {new Date(post.created_at).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && <p className="mt-5 text-lg text-ink-2">{post.excerpt}</p>}

          {post.cover_image && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={post.cover_image} alt="" fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" unoptimized priority />
            </div>
          )}

          <div className="prose-news mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
