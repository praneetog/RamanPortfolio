import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  PenTool,
  Video,
  Camera,
  MonitorPlay,
  Settings,
  Instagram,
  TrendingUp,
} from "lucide-react";

export function Hero() {
  const [showIntro, setShowIntro] = useState(true);

  // Ref to track the SRK layer for the dynamic border-radius
  const slidingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show the intro text for 2.5 seconds before revealing the main hero
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Track the scroll progress of the sliding layer.
  const { scrollYProgress } = useScroll({
    target: slidingRef,
    offset: ["start 15%", "start 0%"],
  });

  // Map the scroll progress to the border radius. 48px to 0px.
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["48px", "0px"]);

  return (
    <div className="relative bg-black">
      {/* 1. INITIAL INTRO OVERLAY */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100vh" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed z-[100] flex items-center justify-center inset-0 px-4 bg-slate-950 w-screen h-screen"
          >
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[20%] left-[15%] text-slate-700"
              >
                <Video size={48} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-[60%] left-[25%] text-slate-700"
              >
                <PenTool size={64} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -25, 0], rotate: [0, 20, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-[30%] right-[20%] text-slate-700"
              >
                <Camera size={56} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-[70%] right-[15%] text-slate-700"
              >
                <Settings size={40} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -35, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[10%] right-[40%] text-slate-700"
              >
                <MonitorPlay size={48} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[20%] left-[40%] text-slate-700"
              >
                <Instagram size={40} />
              </motion.div>
            </div>

            <h1 className="relative z-10 text-[6vw] md:text-[4vw] font-black leading-tight tracking-tighter text-white text-center max-w-4xl flex flex-wrap justify-center items-center gap-x-2 md:gap-x-3">
              <span>Want to</span>
              <motion.span
                initial={{ scale: 1, rotate: 0 }}
                animate={{ scale: 1.25, rotate: 2 }}
                transition={{
                  delay: 0.6,
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
                className="text-cyan-400 inline-flex items-center gap-2 mx-1 md:mx-2"
              >
                upscale{" "}
                <TrendingUp className="w-[8vw] h-[8vw] md:w-[4vw] md:h-[4vw] text-cyan-400" />
              </motion.span>
              <span>your content game?</span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BASE STICKY LAYER ("Hi, I'm Raman") */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white">
        <h1 className="text-[14vw] md:text-[12vw] font-black leading-none tracking-tighter text-black whitespace-nowrap uppercase">
          Hi, I'm Raman
        </h1>
      </div>

      {/* 3. FOREGROUND SLIDING LAYER ("Itni shiddat...") */}
      <motion.div
        ref={slidingRef}
        style={{
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        }}
        // Kept flex-col, removed justify-end, adjusted padding
        className="relative z-10 min-h-screen w-full flex flex-col items-center p-4 pt-20 pb-16 md:pb-18 shadow-[0_-15px_50px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/Raman.jpeg')" }}
        />
        {/* Dark gradient at the bottom so the text pops */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/10 via-black/40 to-black/90" />

        {/* --- THE FIX IS HERE: Added mt-auto --- */}
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center text-center mt-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl px-4 text-white mb-10 md:pb-0 leading-none md:leading-normal font-bold drop-shadow-md">
            "Itni shiddat se maine tumhe paane ki koshish ki hai, ki har zarre
            ne mujhe tumse milane ki saazish ki hai."
          </h2>

          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg md:text-xl transition-colors shadow-lg cursor-pointer bg-orange-500 hover:bg-orange-400 text-white"
          >
            Hire Me
          </button>
        </div>
      </motion.div>
    </div>
  );
}
