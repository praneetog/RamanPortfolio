import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cvLink =
    "https://drive.google.com/file/d/1v1rNbJTiduSX_UuZCqty4lYwbBLfVOIP/view?usp=drivesdk";

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Stats", href: "#stats" },
    { name: "Events", href: "#events" },
    { name: "Sectors", href: "#sectors" },
    { name: "Arsenal", href: "#arsenal" },
    { name: "Content Direction", href: "#content-direction" },
    { name: "Blogs", href: "#articles" },
    { name: "Contact", href: "#contact" },
  ];

  // Detect scroll for dynamic styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom function to handle smooth scrolling and closing the menu
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    // Instantly close the mobile menu
    setIsOpen(false);

    // Smooth scroll to the target section
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* DESKTOP: Floating Top Bar */}
      <div className="hidden md:flex fixed top-6 inset-x-0 z-[100] justify-center pointer-events-none px-4">
        <nav
          className={`pointer-events-auto flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-slate-950/80 backdrop-blur-lg border border-slate-800 shadow-2xl"
              : "bg-transparent"
          }`}
        >
          <a
            href="#"
            className="text-2xl font-black text-slate-300 tracking-tighter"
          >
            R<span className="text-brand-orange">.</span>
          </a>

          <div className="flex items-center gap-6 border-l border-slate-700 pl-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-bold text-slate-300 hover:text-brand-cyan uppercase tracking-[0.2em] transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a
            href={cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-cyan hover:bg-[#00d5e6] text-slate-950 px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-colors ml-2"
          >
            <FileText size={16} /> Resume
          </a>
        </nav>
      </div>

      {/* MOBILE: Dark Backdrop Shield (Blocks iframe touches & allows click-to-close) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* MOBILE BUTTON */}
      <div className="md:hidden fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-orange text-white p-4 rounded-full shadow-[0_0_20px_rgba(255,107,0,0.4)]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed bottom-24 right-6 w-64 bg-slate-900 border border-slate-800 rounded-3xl p-6 z-[9999] shadow-2xl flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="h-px w-full bg-slate-800" />

            <a
              href={cvLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-brand-cyan text-slate-950 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest"
            >
              <FileText size={16} /> Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
