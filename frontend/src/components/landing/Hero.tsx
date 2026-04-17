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
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 20,
        duration: 0.8
      } 
    }
  };

  const floatingCardVars = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: 1.2
      }
    },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <section className="bg-white pt-32 pb-24 relative overflow-hidden">
      {/* Background Blobs - more subtle and premium */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.05, 1],
          x: [0, 20, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -right-[5%] w-[50vw] h-[50vw] bg-blue-50 rounded-full blur-[100px] pointer-events-none opacity-60" 
      />
      <motion.div 
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.1, 1],
          x: [0, -20, 0]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-indigo-50 rounded-full blur-[120px] pointer-events-none opacity-60" 
      />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={containerVars} initial="hidden" animate="show" className="text-left">
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8 text-blue-600 font-bold text-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            Introducing Slotify 2.0
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-5xl md:text-7xl lg:text-[76px]  text-slate-900 leading-[1.05] tracking-tight mb-8">
            Scheduling <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">supercharged.</span>
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-xl md:text-2xl text-slate-600 max-w-[580px] mb-12 leading-relaxed">
            Slotify is your scheduling automation platform for eliminating the back-and-forth emails for finding the perfect time.
          </motion.p>
          
          <motion.div variants={itemVars} className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#0069FF] hover:bg-blue-700 text-white rounded-full px-10 py-5 text-lg font-bold transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                Sign up for free <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.p variants={itemVars} className="text-sm text-slate-500 mt-8 flex items-center gap-2 font-medium">
            <CheckCircle size={18} className="text-green-500" /> No credit card required
          </motion.p>
        </motion.div>

        {/* Hero Illustration / Graphic Section */}
        <div className="relative hidden lg:block">
          {/* Main Mockup Card */}
          <motion.div 
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="bg-white rounded-[32px] shadow-[0_32px_80px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-8 relative z-20"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800 uppercase tracking-widest text-[#0069FF]">April 2026</span>
                <span className="text-2xl font-bold text-slate-800">Select a Date</span>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 bg-white text-slate-400 cursor-not-allowed">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 bg-white text-[#0069FF] hover:bg-blue-50 cursor-pointer transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{day}</div>
              ))}
              {/* Empty cells for April 2026 offset (April 1st is Wednesday) */}
              <div className="w-10 h-10"></div>
              <div className="w-10 h-10"></div>
              <div className="w-10 h-10"></div>
              {/* Days */}
              {[...Array(30)].map((_, i) => {
                const day = i + 1;
                const isSelected = day === 17;
                const isAvailable = [1, 2, 7, 8, 9, 14, 15, 16, 17, 21, 22, 23, 28, 29, 30].includes(day);
                
                return (
                  <div key={day} className={`w-10 h-10 mx-auto flex flex-col items-center justify-center rounded-full text-sm font-bold ${
                    isSelected ? 'bg-[#0069FF] text-white shadow-md shadow-blue-500/30' : 
                    isAvailable ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors' : 
                    'text-slate-300'
                  }`}>
                    {day}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div 
            variants={floatingCardVars}
            initial="initial"
            animate={["animate", "float"]}
            className="absolute -top-12 -right-8 z-30 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Booking Confirmed</p>
              <p className="text-xs text-slate-500">Discovery Call • 30m</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.4, type: "spring" }}
            className="absolute -bottom-10 -left-12 z-30 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl space-y-4 w-64"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Next Meeting</p>
            </div>
            <p className="text-lg font-bold">Product Review</p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-medium">+4 others</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Proof Marquee */}
      <div className="mt-32 border-t border-gray-100 pt-16">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-12">
          Trusted by over 20 million users worldwide
        </p>
        <div className="flex overflow-hidden relative w-full">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex items-center gap-24 md:gap-40 w-max px-8"
          >
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-24 md:gap-40">
                {[
                  { name: "Carnival", color: "#003087", cls: "font-bold text-2xl" },
                  { name: "INDIANA UNIVERSITY", color: "#990000", cls: "font-bold text-lg tracking-wide uppercase" },
                  { name: "DoorDash", color: "#FF3008", cls: "font-bold text-2xl" },
                  { name: "lyft", color: "#FF00BF", cls: "font-black text-3xl" },
                  { name: "COMPASS", color: "#1a1a2e", cls: "font-bold tracking-widest text-lg uppercase" },
                  { name: "L'ORÈAL", color: "#1a1a2e", cls: "font-bold italic text-2xl" },
                  { name: "zendesk", color: "#03363d", cls: "font-bold text-2xl" },
                ].map(logo => (
                  <span key={`${logo.name}-${idx}`} className={`${logo.cls} opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-default`} style={{ color: logo.color }}>
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
