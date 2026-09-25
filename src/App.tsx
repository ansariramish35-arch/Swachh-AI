import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { FileDown } from "lucide-react";

const Problem = lazy(() => import("./components/Problem"));
const PhotoBand = lazy(() => import("./components/PhotoBand"));
const Classifier = lazy(() => import("./components/Classifier"));
const RagChat = lazy(() => import("./components/RagChat"));
const ImpactDash = lazy(() => import("./components/ImpactDash"));
const Architecture = lazy(() => import("./components/Architecture"));
const DesignThinking = lazy(() => import("./components/DesignThinking"));
const ResponsibleAI = lazy(() => import("./components/ResponsibleAI"));
const ImpactStatement = lazy(() => import("./components/ImpactStatement"));
const Footer = lazy(() => import("./components/Footer"));

function ReportFAB() {
  return (
    <button
      onClick={() => window.open(window.location.pathname + "#report", "_blank")}
      className="print-hidden group fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full border border-lime/40 bg-ink/85 backdrop-blur-xl pl-4 pr-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:bg-lime hover:text-ink text-lime transition-all duration-300"
      aria-label="Open the printable final project PDF report"
    >
      <FileDown size={16} className="group-hover:-translate-y-0.5 transition-transform" />
      <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase">
        Report PDF
      </span>
    </button>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink text-mist antialiased">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Problem />
          <PhotoBand />
          <Classifier />
          <RagChat />
          <ImpactDash />
          <Architecture />
          <DesignThinking />
          <ResponsibleAI />
          <ImpactStatement />
          <Footer />
        </Suspense>
      </main>
      <ReportFAB />
    </div>
  );
}
