import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full
        bg-white/90 backdrop-blur-sm border border-border/60
        shadow-[0_2px_12px_-2px_rgba(0,0,0,0.12)]
        flex items-center justify-center
        text-muted-foreground hover:text-primary hover:border-primary/30
        hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.18)]
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <ChevronUp className="w-5 h-5" strokeWidth={2.2} />
    </button>
  );
};

export default BackToTop;
