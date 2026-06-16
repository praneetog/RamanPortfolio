import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { competencies } from "../data";

export function Competencies() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden" ref={ref}>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=2000')" }}
      />
      <div className="absolute inset-0 z-0 bg-slate-950/90" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">The Arsenal</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Everything from random shower thoughts to executing million-view campaigns.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {competencies.map((comp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`p-8 rounded-3xl flex items-center justify-center text-center font-bold text-lg border transition-colors
                ${idx % 3 === 0 
                  ? "bg-brand-cyan text-slate-950 border-brand-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)]" 
                  : idx % 3 === 1 
                    ? "bg-slate-900 text-white border-slate-800 hover:border-brand-orange" 
                    : "bg-slate-950 text-slate-300 border-slate-800 hover:border-brand-cyan shadow-inner"}
              `}
            >
              {comp}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
