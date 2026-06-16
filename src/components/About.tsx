import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FileText, ArrowRight } from "lucide-react";

export function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-slate-950"
      ref={ref}
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/AboutMe.jpeg')" }}
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 z-0 bg-slate-900/70" />

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 uppercase tracking-wide">
            About <span className="text-brand-orange">Me</span>
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
            <p>
              Content strategist with 5+ years of experience turning ideas into
              brand-building content across channels and industries. I combine
              creative instinct with commercial thinking; translating business
              goals into content that truly connects.
            </p>
            <p>
              My expertise lies in creating UGC & owning the full content
              lifecycle, I'm now channelling this into brand and marketing
              management, where strategy meets real business impact.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="https://drive.google.com/file/d/1v1rNbJTiduSX_UuZCqty4lYwbBLfVOIP/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-brand-orange hover:bg-[#ff7b00] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] hover:-translate-y-1 w-full sm:w-auto"
            >
              <FileText size={20} />
              Grab My CV
            </a>
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 text-brand-cyan font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              Let's Connect{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
