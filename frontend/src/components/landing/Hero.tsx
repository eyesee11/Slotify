"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const HeroSection = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <section className="bg-[#f8f9fb] pt-32 pb-24 relative overflow-hidden">
      {/* Abstract Background Blobs */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-teal-400/20 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-sky-400/20 via-indigo-400/20 to-fuchsia-400/20 rounded-full blur-[120px] pointer-events-none" 
      />
      
      <div className="relative z-10 text-center px-6 max-w-[1000px] mx-auto">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 border border-blue-100/50 backdrop-blur-md mb-8 text-blue-600 font-medium text-sm shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            Introducing Slotify 2.0
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-5xl md:text-7xl lg:text-[84px] font-semibold text-slate-800 leading-[1.05] tracking-tight mb-6">
            Scheduling <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">supercharged.</span>
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg md:text-xl text-slate-600 max-w-[660px] mx-auto mb-10 leading-relaxed px-4 md:px-0">
            Slotify is your scheduling automation platform for eliminating the back-and-forth emails for finding the perfect time — and so much more.
          </motion.p>
          
          <motion.div variants={itemVars} className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Link href="/register" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#0069FF] hover:bg-blue-700 text-white rounded-full px-8 py-4 text-base font-bold transition-all shadow-[0_8px_30px_rgb(0,105,255,0.3)] flex items-center justify-center gap-2"
              >
                Sign up for free <ArrowRight size={18} />
              </motion.button>
            </Link>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 rounded-full px-8 py-4 text-base font-bold transition-all shadow-sm"
            >
              How it works
            </motion.button>
          </motion.div>
          
          <motion.p variants={itemVars} className="text-sm text-slate-500 mt-6 flex items-center justify-center gap-2">
            <CheckCircle size={16} className="text-green-500" /> No credit card required
          </motion.p>
        </motion.div>
      </div>

      <div className="mt-20 md:mt-28">
        <p className="text-center text-[13px] md:text-sm font-semibold uppercase tracking-wider text-slate-400 mb-8">
          Trusted by leading organizations globally
        </p>
        {/* Logo marquee */}
        <div className="flex overflow-hidden relative w-full">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="flex items-center gap-16 md:gap-32 w-max px-8"
          >
            {/* Duplicated for seamless loop */}
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-16 md:gap-32">
                {[
                  { name: "Carnival", color: "#003087", cls: "font-bold text-lg md:text-xl" },
                  { name: "INDIANA UNIVERSITY", color: "#990000", cls: "font-bold text-sm tracking-wide md:text-base uppercase" },
                  { name: "DoorDash", color: "#FF3008", cls: "font-bold text-lg md:text-xl" },
                  { name: "lyft", color: "#FF00BF", cls: "font-black text-2xl md:text-3xl" },
                  { name: "COMPASS", color: "#1a1a2e", cls: "font-bold tracking-widest text-sm md:text-base uppercase" },
                  { name: "L'ORÈAL", color: "#1a1a2e", cls: "font-bold italic text-lg md:text-[20px]" },
                  { name: "zendesk", color: "#03363d", cls: "font-bold text-lg md:text-xl" },
                ].map(logo => (
                  <span key={`${logo.name}-${idx}`} className={`${logo.cls} opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300`} style={{ color: logo.color }}>
                    {logo.name}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
