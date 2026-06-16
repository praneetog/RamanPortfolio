import { useState, useRef, useEffect } from "react";
import { XEmbed, InstagramEmbed } from "react-social-media-embed";
import { contentArsenal } from "../data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useInView } from "react-intersection-observer";

const categories = ["All", "Content Game", "Campaigns"];

// Lazy load actual embeds to ensure the site remains fast and responsive
function LazyEmbed({ item }: { item: any }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '300px 0px' });
  const isX = item.url.includes("x.com") || item.url.includes("twitter.com");
  const platformName = isX ? "X" : "Instagram";

  return (
    <div ref={ref} className="flex flex-col gap-4 h-full">
      <div className="w-full bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 flex-grow min-h-[400px]">
        {inView ? (
          isX ? <XEmbed url={item.url} width="100%" /> : <InstagramEmbed url={item.url} width="100%" />
        ) : (
          <div className="w-full h-full flex items-center justify-center animate-pulse bg-slate-900/50 min-h-[400px]">
            <span className="text-slate-600 font-bold uppercase tracking-widest text-xs">Loading embed...</span>
          </div>
        )}
      </div>

      {/* External Link always visible below embed */}
      <a 
        href={item.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-brand-cyan rounded-xl transition-all font-bold text-sm text-slate-300 hover:text-white shrink-0 mt-auto"
      >
        <span>Watch on {platformName}</span>
        <ExternalLink className="w-4 h-4 text-brand-orange" />
      </a>
    </div>
  );
}

export function Arsenal() {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredItems = activeCategory === "All" 
    ? contentArsenal 
    : contentArsenal.filter(item => item.category === activeCategory);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      
      const scrollPercentage = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
      const newIndex = Math.round(scrollPercentage * (filteredItems.length - 1));
      setActiveIndex(newIndex || 0);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [filteredItems]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 800 : 350;
      scrollContainerRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background Image with Black Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/80 backdrop-blur-sm" />
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="max-w-[100vw] sm:max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase">The Content Arsenal</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-brand-cyan text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-brand-orange hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative group max-w-7xl mx-auto">
          {canScrollLeft && (
            <div 
              className="hidden md:flex absolute left-0 top-0 bottom-12 w-16 sm:w-24 md:w-32 z-20 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent items-center justify-start px-1 sm:px-2 md:px-4 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
            </div>
          )}
          
          <div 
            ref={scrollContainerRef} 
            className="flex overflow-x-auto overflow-y-hidden gap-4 sm:gap-6 snap-x snap-mandatory hide-scrollbar px-4 sm:px-6 lg:px-8 pb-4 md:pb-12"
            onScroll={checkScroll}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex-none w-[85vw] sm:w-[328px] snap-center shrink-0"
                >
                  <LazyEmbed item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {canScrollRight && (
            <div 
              className="hidden md:flex absolute right-0 top-0 bottom-12 w-16 sm:w-24 md:w-32 z-20 bg-gradient-to-l from-slate-950/60 via-slate-950/20 to-transparent items-center justify-end px-1 sm:px-2 md:px-4 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              onClick={() => scroll("right")}
            >
               <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
            </div>
          )}
        </div>

        {/* Mobile Pagination Dots */}
        {filteredItems.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-2 md:hidden">
            {filteredItems.map((_, idx) => (
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
    </section>
  );
}
