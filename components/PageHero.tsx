export default function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-night pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 dotgrid opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5">
        {kicker && <span className="kicker text-brand-teal">{kicker}</span>}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-ink-2">{subtitle}</p>}
      </div>
    </section>
  );
}
