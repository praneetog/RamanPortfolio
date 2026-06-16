import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { InstagramEmbed } from "react-social-media-embed";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const directionReels = [
  "https://www.instagram.com/reels/CpR1ANapseS/",
  "https://www.instagram.com/reels/DNNWNDCslsi/",
  "https://www.instagram.com/reels/CrfrRE0uDYi/",
  "https://www.instagram.com/reels/CqQTUG6j97N/",
  "https://www.instagram.com/reels/CpxaBQ4jYTo/",
];

function ReelEmbed({ url }: { url: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px 0px",
  });

  return (
    <div ref={ref} className="flex flex-col gap-4 h-full">
      <div className="w-full bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 flex-grow min-h-[400px]">
        {inView ? (
          <InstagramEmbed url={url} width="100%" />
        ) : (
          <div className="w-full h-full flex items-center justify-center animate-pulse bg-slate-900/50 min-h-[400px]">
            <span className="text-slate-600 font-bold uppercase tracking-widest text-xs">
              Loading Reel...
            </span>
          </div>
        )}
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-brand-cyan rounded-xl transition-all font-bold text-sm text-slate-300 hover:text-white shrink-0 mt-auto"
      >
        <span>Watch on Instagram</span>
        <ExternalLink className="w-4 h-4 text-brand-orange" />
      </a>
    </div>
  );
}

export function ContentDirection() {
  const [ref] = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

      const scrollPercentage =
        scrollWidth > clientWidth
          ? scrollLeft / (scrollWidth - clientWidth)
          : 0;
      const newIndex = Math.round(
        scrollPercentage * (directionReels.length - 1),
      );
      setActiveIndex(newIndex || 0);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section id="content-direction"
      className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden"
      ref={ref}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-brand-cyan) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.03,
        }}
      />

      <div className="max-w-[100vw] sm:max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header Section */}
        <div className="text-center mb-16 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase text-white">
              Content <span className="text-brand-orange">Direction</span>
            </h2>
          </motion.div>
        </div>

        {/* Horizontal Slider Section */}
        <div className="relative group w-full mt-8">
          {canScrollLeft && (
            <div
              className="hidden md:flex absolute left-0 top-0 bottom-8 w-16 sm:w-24 md:w-32 z-20 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent items-center justify-start px-1 sm:px-2 md:px-4 cursor-pointer opacity-0 md:group-hover:opacity-100 transition-opacity"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-brand-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
            </div>
          )}

          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 snap-x snap-mandatory overflow-x-auto overflow-y-hidden hide-scrollbar pb-4 md:pb-8 px-4 sm:px-0"
            onScroll={checkScroll}
          >
            {directionReels.map((url, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-none w-[85vw] sm:w-[320px] snap-center shrink-0 h-full"
              >
                <ReelEmbed url={url} />
              </motion.div>
            ))}
          </div>

          {canScrollRight && (
            <div
              className="hidden md:flex absolute right-0 top-0 bottom-8 w-16 sm:w-24 md:w-32 z-20 bg-gradient-to-l from-slate-950/80 via-slate-950/40 to-transparent items-center justify-end px-1 sm:px-2 md:px-4 cursor-pointer opacity-0 md:group-hover:opacity-100 transition-opacity"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-brand-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
            </div>
          )}

          {/* Mobile Pagination Dots */}
          {directionReels.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4 md:hidden">
              {directionReels.map((_, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-300 rounded-full ${
                    activeIndex === idx
                      ? "w-3 h-3 bg-brand-orange shadow-[0_0_8px_var(--color-brand-orange)]"
                      : "w-2 h-2 bg-slate-700"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
