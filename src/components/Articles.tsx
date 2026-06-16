import { useRef, useState, useEffect } from "react";
import { blogs } from "../data";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function Articles() {
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
      const newIndex = Math.round(scrollPercentage * (blogs.length - 1));
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
      const scrollAmount = window.innerWidth > 768 ? 400 : 350;
      scrollContainerRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section id="articles" className="py-24 bg-slate-950 border-t border-slate-900 overflow-hidden relative">
      <div className="max-w-[100vw] sm:max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 px-4 sm:px-0"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">Words & Wisdom</h2>
          <p className="text-xl text-slate-400">Yes, I can write more than just 280 characters.</p>
        </motion.div>

        {/* CSS Scroll Snap Carousel */}
        <div className="w-full relative group">
          {canScrollLeft && (
            <div 
              className="hidden md:flex absolute left-0 top-0 bottom-8 w-16 sm:w-24 md:w-32 z-20 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent items-center justify-start px-1 sm:px-2 md:px-4 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
            </div>
          )}

          <div 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto overflow-y-hidden gap-6 pb-4 md:pb-8 snap-x snap-mandatory hide-scrollbar px-4 sm:px-0"
          >
            {blogs.map((blog, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx} 
                className="flex-none w-[85vw] sm:w-[400px] shrink-0 snap-center bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-brand-orange transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-xs font-bold tracking-widest text-brand-cyan mb-4 uppercase">{blog.domain}</div>
                  <h3 className="text-2xl font-bold text-white mb-6 line-clamp-3 leading-snug group-hover:text-brand-orange transition-colors">{blog.title}</h3>
                </div>
                <a 
                  href={blog.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-bold text-white border-b border-white pb-1 self-start group-hover:text-brand-orange group-hover:border-brand-orange transition-colors"
                >
                  Read Article <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>

          {canScrollRight && (
            <div 
              className="hidden md:flex absolute right-0 top-0 bottom-8 w-16 sm:w-24 md:w-32 z-20 bg-gradient-to-l from-slate-950/60 via-slate-950/20 to-transparent items-center justify-end px-1 sm:px-2 md:px-4 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
            </div>
          )}
        </div>

        {/* Mobile Pagination Dots */}
        {blogs.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-2 md:hidden">
            {blogs.map((_, idx) => (
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
      
      {/* Hide Scrollbar CSS purely for this component */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
