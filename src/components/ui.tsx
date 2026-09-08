import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/* ---------------- reveal-on-scroll wrapper ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- animated number ---------------- */

export function CountUp({
  to,
  format,
  duration = 1500,
  className = "",
}: {
  to: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {format ? format(val) : Math.round(val).toLocaleString("en-IN")}
    </span>
  );
}

/* ---------------- section header ---------------- */

export function SectionHead({
  index,
  kicker,
  title,
  sub,
  align = "left",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}
    >
      <div
        className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase text-lime/80 mb-5 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="text-dim">{index}</span>
        <span className="h-px w-10 bg-lime/40" />
        <span>{kicker}</span>
      </div>
      <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] font-medium tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-5 text-fog text-base md:text-lg leading-relaxed">{sub}</p>}
    </Reveal>
  );
}

/* ---------------- pills ---------------- */

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "lime" | "outline";
}) {
  const cls =
    tone === "lime"
      ? "bg-lime text-ink border-lime"
      : tone === "outline"
        ? "border-line text-fog"
        : "bg-fern text-mist border-line";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10.5px] tracking-[0.14em] uppercase ${cls}`}
    >
      {children}
    </span>
  );
}

/* ---------------- marquee ---------------- */

export function Marquee({
  children,
  reverse = false,
  fast = false,
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  fast?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex w-max items-center ${fast ? "animate-marquee-fast" : "animate-marquee"} ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------------- serif italic accent ---------------- */

export function Serif({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-serif italic font-normal ${className}`}>{children}</span>;
}
