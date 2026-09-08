import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Reveal } from "./ui";

const SHOTS = [
  {
    src: "https://images.pexels.com/photos/5355590/pexels-photo-5355590.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Workers sorting plastic bottles at a recycling facility",
    tag: "Field reality 01",
    caption: "Material recovery — where clean streams become value",
  },
  {
    src: "https://images.pexels.com/photos/7512889/pexels-photo-7512889.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Person sorting household waste with a smartphone",
    tag: "Field reality 02",
    caption: "The 5-second decision SwachhAI is built for",
  },
  {
    src: "https://images.pexels.com/photos/8018592/pexels-photo-8018592.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Volunteers collecting trash on a beach shoreline",
    tag: "Field reality 03",
    caption: "Community clean-ups treat symptoms; sorting prevents them",
  },
];

export default function PhotoBand() {
  return (
    <section className="relative pb-4 md:pb-10 -mt-6">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid md:grid-cols-3 gap-4">
          {SHOTS.map((s, i) => (
            <Reveal key={s.tag} delay={i * 0.09}>
              <motion.figure
                whileHover="hover"
                className="group relative overflow-hidden rounded-2xl border border-line aspect-[4/3] bg-moss"
              >
                <motion.img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[0.65] group-hover:grayscale-0 transition-all duration-700"
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ink/75 backdrop-blur border border-line px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] uppercase text-lime">
                  <MapPin size={10} />
                  {s.tag}
                </span>
                <figcaption className="absolute inset-x-4 bottom-4 text-[13.5px] leading-snug text-mist/90">
                  {s.caption}
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
