import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Activity,
  Briefcase,
  Coffee,
  HeartPulse,
  Home,
  MonitorPlay,
  Zap,
  Car,
} from "lucide-react";

const sectors = [
  { name: "Sports & Entertainment", icon: MonitorPlay },
  { name: "Personal Branding & Professional Service", icon: Briefcase },
  { name: "Real Estate", icon: Home },
  { name: "F&B", icon: Coffee },
  { name: "Healthcare", icon: HeartPulse },
  { name: "FMCG", icon: Zap },
  { name: "Automobile", icon: Car }, // Added Automobile sector here
];

export function SectorsServed() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-slate-950/90" />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-brand-orange) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.05,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
            Sectors Served
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {sectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-4 md:px-8 md:py-6 rounded-full bg-slate-950 border border-slate-800 shadow-xl hover:border-brand-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all cursor-default"
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-brand-orange" />
                <span className="text-sm md:text-base font-bold text-slate-300 text-center">
                  {sector.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
