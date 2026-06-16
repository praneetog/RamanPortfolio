import { motion, AnimatePresence, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, X, TrendingUp } from "lucide-react";
import { brands, growthStats } from "../data";
import { useState, useEffect, useRef } from "react";

// Native Framer Motion counter to replace the buggy react-countup package
function Counter({
  from,
  to,
  suffix,
  decimals,
  inView,
}: {
  from: number;
  to: number;
  suffix: string;
  decimals: number;
  inView: boolean;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 3,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = value.toFixed(decimals) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, suffix, decimals, inView]);

  return (
    <span ref={nodeRef}>
      {from.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function MarqueeStats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      className={`py-24 bg-slate-950 text-white relative overflow-hidden ${selectedId ? "z-[100]" : "z-10"}`}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-brand-cyan) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-[20vw] font-black italic tracking-tighter text-brand-orange whitespace-nowrap overflow-hidden rotate-[-5deg]">
          STONKS
        </div>
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <p className="text-center text-slate-400 font-bold tracking-widest uppercase mb-10 text-sm">
            Brands I've Elevated
          </p>
          <div className="flex overflow-hidden group">
            <motion.div
              className="flex space-x-12 min-w-max px-6 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...brands, ...brands].map((brand, i) => (
                <a
                  key={i}
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 hover:from-brand-cyan hover:to-brand-orange hover:scale-105 transition-all cursor-pointer uppercase block"
                >
                  {brand.name}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white inline-block">
              Crazy Growth, Only{" "}
              <span className="text-brand-orange">Stonks.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {growthStats.map((stat, idx) => (
              <motion.div
                key={stat.company}
                layoutId={`card-${stat.company}`}
                onClick={() => setSelectedId(stat.company)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center hover:border-brand-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all group overflow-hidden cursor-pointer flex flex-col items-center justify-center h-full min-h-[300px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-cyan/0 group-hover:from-brand-cyan/5 group-hover:to-brand-orange/5 transition-all duration-500 rounded-3xl pointer-events-none" />

                <motion.h3
                  layoutId={`title-${stat.company}`}
                  className="text-slate-400 font-bold mb-6 uppercase tracking-wider relative z-10"
                >
                  {stat.company}
                </motion.h3>

                <div className="flex flex-col items-center justify-center gap-2 mb-6 relative z-10 w-full">
                  <motion.div
                    layoutId={`start-${stat.company}`}
                    className="text-2xl font-bold text-slate-300"
                  >
                    From {stat.startStr}
                  </motion.div>

                  <motion.div
                    layoutId={`arrow-${stat.company}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                    className="flex flex-col items-center py-2"
                  >
                    <ArrowRight className="w-8 h-8 text-brand-orange rotate-90" />
                  </motion.div>

                  <motion.div
                    layoutId={`end-${stat.company}`}
                    className="text-5xl md:text-6xl font-black text-brand-cyan whitespace-nowrap drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                  >
                    {/* CRASH FIX: Using our native Framer Motion counter */}
                    <Counter
                      from={Number(stat.start)}
                      to={Number(stat.end)}
                      suffix={stat.suffix}
                      decimals={stat.end % 1 !== 0 ? 1 : 0}
                      inView={inView}
                    />
                  </motion.div>
                </div>

                <motion.div
                  layoutId={`time-${stat.company}`}
                  className="inline-block mt-auto bg-slate-950 border border-brand-orange/30 text-brand-orange font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest relative z-10"
                >
                  {stat.time}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />

              {growthStats
                .filter((s) => s.company === selectedId)
                .map((stat) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    key={stat.company}
                    layoutId={`card-${stat.company}`}
                    className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[2rem] relative shadow-2xl flex flex-col max-h-[90vh] z-10 overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                      <button
                        onClick={() => setSelectedId(null)}
                        className="p-2 sm:p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors group"
                      >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-white" />
                      </button>
                    </div>

                    <div
                      className="p-6 pt-16 sm:p-10 overflow-y-auto"
                      data-lenis-prevent="true"
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                    >
                      <motion.h3
                        layoutId={`title-${stat.company}`}
                        className="text-brand-orange font-bold mb-4 sm:mb-2 uppercase tracking-widest text-sm"
                      >
                        {stat.company}
                      </motion.h3>

                      <div className="flex flex-wrap items-center sm:items-baseline gap-3 sm:gap-4 mb-8 sm:mb-10">
                        <motion.div
                          layoutId={`start-${stat.company}`}
                          className="text-2xl sm:text-3xl font-bold text-slate-400"
                        >
                          {stat.startStr}
                        </motion.div>
                        <motion.div layoutId={`arrow-${stat.company}`}>
                          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" />
                        </motion.div>
                        <motion.div
                          layoutId={`end-${stat.company}`}
                          className="text-4xl sm:text-7xl font-black text-brand-cyan drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                        >
                          {stat.end}
                          {stat.suffix}
                        </motion.div>
                        <motion.div
                          layoutId={`time-${stat.company}`}
                          className="bg-slate-800 text-slate-300 font-bold px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-widest sm:ml-auto w-fit"
                        >
                          {stat.time}
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="space-y-6 sm:space-y-8"
                      >
                        <div className="h-32 sm:h-48 w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-end relative overflow-hidden shrink-0">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-cyan/10 via-transparent to-transparent" />
                          <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="w-full h-full text-brand-cyan opacity-80 overflow-visible"
                          >
                            <polyline
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points="0,90 20,75 40,80 60,40 80,45 100,10"
                            />
                            <polygon
                              fill="url(#chartGradient)"
                              opacity="0.2"
                              points="0,100 0,90 20,75 40,80 60,40 80,45 100,10 100,100"
                            />
                            <defs>
                              <linearGradient
                                id="chartGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="var(--color-brand-cyan)"
                                />
                                <stop offset="100%" stopColor="transparent" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-x-0 bottom-2 sm:bottom-4 flex justify-between px-3 sm:px-4 text-[10px] sm:text-xs font-bold text-slate-600 uppercase">
                            <span>Start</span>
                            <span>End</span>
                          </div>
                        </div>

                        <div className="bg-slate-800/50 p-5 sm:p-6 rounded-2xl border border-slate-700/50">
                          <h4 className="flex items-center gap-2 text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />{" "}
                            Strategy Breakdown
                          </h4>
                          <p className="text-slate-400 leading-relaxed text-sm">
                            {stat.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
