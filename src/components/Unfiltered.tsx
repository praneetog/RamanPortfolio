import { useRef, useState, useEffect } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { unfilteredData } from "../data";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useInView } from "react-intersection-observer";

function LazyInstagramEmbed({ url }: { url: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '300px 0px' });

  return (
    <div ref={ref} className="flex flex-col gap-4 h-full">
      <div className="w-full bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 flex-grow min-h-[400px]">
        {inView ? (
          <InstagramEmbed url={url} width="100%" />
        ) : (
           <div className="w-full h-full flex items-center justify-center animate-pulse bg-slate-900/50 min-h-[400px]">
             <span className="text-slate-600 font-bold uppercase tracking-widest text-xs">Loading embed...</span>
           </div>
        )}
      </div>

      {/* External Link always visible below embed */}
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

export function Unfiltered() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      
      const scrollPercentage = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
      const newIndex = Math.round(scrollPercentage * (unfilteredData.reels.length - 1));
      setActiveIndex(newIndex || 0);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      scrollContainerRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section className="py-24 bg-black text-white relative border-t border-slate-900 overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-30" />
      
      <div className="max-w-[100vw] sm:max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start px-4 sm:px-0">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 text-center lg:text-left space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase text-white">Unfiltered <span className="text-slate-700">Cricket</span></h2>
            <p className="text-xl text-slate-400">
              My personal playground. This is where I talk pure cricket. 
              The raw passion, the wild theories, the true fan experience.
            </p>
            <div>
              <a 
                href={unfilteredData.profileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full font-bold text-lg text-slate-950 bg-white hover:bg-brand-orange hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_var(--color-brand-orange)]"
              >
                Stalk My Page
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </motion.div>

          <div className="lg:w-2/3 w-full relative group mt-8 lg:mt-0">
            {canScrollLeft && (
              <div 
                className="hidden md:flex absolute left-0 top-0 bottom-8 w-16 sm:w-24 md:w-32 z-20 bg-gradient-to-r from-black/60 via-black/20 to-transparent items-center justify-start px-1 sm:px-2 md:px-4 cursor-pointer opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
              </div>
            )}

            <div 
              ref={scrollContainerRef} 
              className="flex gap-4 sm:gap-6 snap-x snap-mandatory overflow-x-auto overflow-y-hidden hide-scrollbar pb-4 md:pb-8 px-4 sm:px-0"
              onScroll={checkScroll}
            >
              {unfilteredData.reels.map((url, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="flex-none w-[85vw] sm:w-[320px] snap-center shrink-0 h-full"
                >
                  <LazyInstagramEmbed url={url} />
                </motion.div>
              ))}
            </div>

            {canScrollRight && (
              <div 
                className="hidden md:flex absolute right-0 top-0 bottom-8 w-16 sm:w-24 md:w-32 z-20 bg-gradient-to-l from-black/60 via-black/20 to-transparent items-center justify-end px-1 sm:px-2 md:px-4 cursor-pointer opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
              </div>
            )}

            {/* Mobile Pagination Dots */}
            {unfilteredData.reels.length > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4 md:hidden">
                {unfilteredData.reels.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`transition-all duration-300 rounded-full ${
                      activeIndex === idx ? 'w-3 h-3 bg-brand-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]' : 'w-2 h-2 bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}
