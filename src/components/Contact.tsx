import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User, Phone, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "Hire Me",
    body: "",
  });

  const handleSend = () => {
    const { name, phone, subject, body } = formData;
    const emailBody = `Name: ${name}%0D%0APhone: ${phone}%0D%0A%0D%0A${body}`;
    window.location.href = `mailto:ramankosta@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
  };

  return (
    <section
      className="py-24 bg-[#0a0a0a] border-t border-slate-900 relative overflow-hidden"
      ref={ref}
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/3 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
                Let's Connect
              </h2>
              <div className="space-y-4 text-slate-300 text-lg">
                <p className="font-bold text-white text-2xl">Raman Kosta</p>
                <p>
                  <a
                    href="mailto:ramankosta@gmail.com"
                    className="hover:text-brand-cyan transition-colors"
                  >
                    ramankosta@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+919974553570"
                    className="hover:text-brand-cyan transition-colors"
                  >
                    +91 9974553570
                  </a>
                </p>

                {/* Updated with the official solid LinkedIn SVG */}
                <p className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-brand-cyan shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <a
                    href="https://www.linkedin.com/in/raman-kosta-83161916b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-cyan transition-colors"
                  >
                    Raman Kosta
                  </a>
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#111] p-6 sm:p-8 rounded-[2rem] border border-slate-800/50"
            >
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    <User size={14} /> Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-[#1e1e1e] text-white p-4 rounded-xl border border-slate-800 focus:border-brand-cyan focus:outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    <Phone size={14} /> Contact
                  </label>
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    className="w-full bg-[#1e1e1e] text-white p-4 rounded-xl border border-slate-800 focus:border-brand-cyan focus:outline-none transition-colors"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-6 relative">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Objective
                </label>
                <select
                  className="w-full bg-[#1e1e1e] text-white p-4 rounded-xl border border-slate-800 focus:border-brand-cyan focus:outline-none transition-colors appearance-none cursor-pointer"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                >
                  <option value="Hire Me">Hire Me</option>
                  <option value="Strategic Collaboration">
                    Strategic Collaboration
                  </option>
                </select>
                <div className="absolute right-4 top-[2.4rem] pointer-events-none text-slate-400">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Message Brief
                </label>
                <textarea
                  placeholder="Tell me about your project mission..."
                  rows={4}
                  className="w-full bg-[#1e1e1e] text-white p-4 rounded-xl border border-slate-800 focus:border-brand-cyan focus:outline-none transition-colors resize-none"
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                onClick={handleSend}
                className="w-full bg-[#0b5c92] hover:bg-[#084269] text-white font-black tracking-[0.2em] uppercase py-5 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg"
              >
                SEND <Send size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
