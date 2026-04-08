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
        bg-white border-2 border-[#5B6878]
        shadow-[0_2px_10px_-2px_rgba(0,0,0,0.15)]
        flex items-center justify-center
        text-[#5B6878] hover:bg-[#5B6878] hover:text-white
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <ChevronUp className="w-5 h-5" strokeWidth={2.2} />
    </button>
  );
};

export default BackToTop;
