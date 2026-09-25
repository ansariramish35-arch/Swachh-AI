import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#classifier", label: "Classifier" },
  { href: "#assistant", label: "Assistant" },
  { href: "#impact", label: "Impact Model" },
  { href: "#system", label: "System" },
  { href: "#responsible", label: "Responsible AI" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-ink/75 border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-lime text-ink shadow-[0_0_24px_rgba(184,243,77,0.35)] group-hover:rotate-12 transition-transform duration-300">
            <Leaf size={18} strokeWidth={2.4} />
          </span>
          <span className="font-semibold tracking-tight text-lg">
            Swachh<span className="text-lime">AI</span>
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-dim tracking-[0.2em] mt-1">
            / PROTOTYPE v0.3
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-fog hover:text-lime transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#facts"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-lime/40 bg-lime/10 px-4 py-2 font-mono text-[10.5px] tracking-[0.14em] uppercase text-lime hover:bg-lime hover:text-ink transition-colors"
          >
            1M1B × IBM
            <ArrowUpRight size={13} />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-xl border border-line text-mist"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-lime via-leaf to-lime"
        style={{ scaleX: progress }}
      />

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden backdrop-blur-xl bg-ink/95 border-b border-line"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-serif italic text-2xl text-mist hover:text-lime transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
