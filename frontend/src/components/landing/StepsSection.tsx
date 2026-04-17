"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, Video, ClipboardList, Globe, CheckCircle 
} from "lucide-react";

export const StepsSection = () => {
  const steps = [
    { icon: CalendarIcon, label: "Connect your calendars", color: "text-sky-600 bg-sky-100 border-sky-200" },
    { icon: Video, label: "Connect conferencing tools", color: "text-purple-600 bg-purple-100 border-purple-200" },
    { icon: ClipboardList, label: "Customize your event types", color: "text-orange-600 bg-orange-100 border-orange-200" },
    { icon: Globe, label: "Share your scheduling link", color: "text-emerald-600 bg-emerald-100 border-emerald-200" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };

  return (
    <section className="bg-slate-900 py-24 md:py-40 relative overflow-hidden">
      {/* Enhanced Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[100%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900 to-slate-900 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-20 md:gap-32 items-center relative z-10">
        {/* Left: steps */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl  text-white mb-12 leading-[1.1] tracking-tight"
          >
            Seamless scheduling in <span className="text-blue-400">4 simple steps</span>
          </motion.h2>
          <div className="space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="flex items-center gap-6 py-5 px-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all cursor-pointer group"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 ${step.color}`}>
                    <Icon size={26} />
                  </div>
                  <span className="text-xl text-slate-200 font-bold tracking-tight">{step.label}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Right: Calendar integrations mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative mt-10 md:mt-0"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-[100px] -z-10" />

          <div className="relative z-10 w-full max-w-[450px] mx-auto space-y-8">
            {/* Calendar card */}
            <motion.div 
              animate={{ 
                y: [-8, 8, -8],
                rotate: [-1, 1, -1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="bg-slate-800/90 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="grid grid-cols-2 gap-1.5 w-7 h-7">
                    <div className="bg-blue-500 rounded-sm"></div>
                    <div className="bg-red-500 rounded-sm"></div>
                    <div className="bg-yellow-500 rounded-sm"></div>
                    <div className="bg-green-500 rounded-sm"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Outlook Calendar</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <p className="text-slate-400 text-sm font-medium">Sync Active</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center px-4 py-3 bg-slate-700/50 rounded-xl border border-white/5">
                  <span className="text-sm font-bold text-slate-300">Check for conflicts</span>
                  <CheckCircle size={18} className="text-blue-400" />
                </div>
                <div className="h-12 w-full bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                  Update Availability
                </div>
              </div>
            </motion.div>

            {/* Meet Card */}
            <motion.div 
              animate={{ 
                y: [8, -8, 8],
                rotate: [1, -1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-slate-800/90 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative left-12 md:left-24 bottom-12"
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 bg-[#0069FF] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 text-white">
                  <Video size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Zoom Video</h3>
                  <p className="text-slate-400 text-sm font-medium">Integration Enabled</p>
                </div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 space-y-3">
                 <div className="h-2 w-full bg-slate-700 rounded-full"></div>
                 <div className="h-2 w-3/4 bg-slate-700 rounded-full opacity-50"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

