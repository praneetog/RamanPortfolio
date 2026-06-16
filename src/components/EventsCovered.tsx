import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const events = [
  {
    name: "Tata Mumbai Marathon",
    image: "/Tata.jpeg",
  },
  {
    name: "PKL",
    image: "/Pkl.jpeg",
  },
  {
    name: "BCCI, Col. CK Nayudu Trophy",
    image: "/Bcci.jpeg",
  },
  {
    name: "The Sunday League",
    image: "/SundayLeague.jpeg",
  },
  {
    name: "Junoon sports fest",
    image: "/Junoon.jpeg",
  },
];

export function EventsCovered() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="events" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden" ref={ref}>
      {/* Background Image with Black Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?auto=format&fit=crop&q=80&w=2000')" }}
      />
      <div className="absolute inset-0 z-0 bg-slate-950/90 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">Events Covered</h2>
          <p className="text-xl text-brand-orange max-w-2xl mx-auto font-bold tracking-widest">(Operations & Hospitality)</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-[2rem] overflow-hidden group cursor-pointer ${idx === 4 || idx === 0 ? "lg:col-span-2" : ""}`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${event.image}')` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 flex flex-col justify-end p-8 transition-opacity duration-500 group-hover:from-slate-950/80">
                <span className="text-brand-cyan font-bold tracking-widest uppercase text-xs mb-2 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Event
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                  {event.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
