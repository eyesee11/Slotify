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

  return (
    <section className="bg-slate-900 py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-16 md:gap-20 items-center relative z-10">
        {/* Left: steps */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-10 leading-tight">
            Seamless scheduling in 4 simple steps
          </h2>
          <div className="space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="flex items-center gap-5 py-4 px-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${step.color}`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-lg text-slate-200 font-semibold">{step.label}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Right: Calendar integrations mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative pl-8 md:pl-20 mt-10 md:mt-0"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-full blur-[80px] -z-10" />

          <div className="relative z-10 w-full max-w-[380px] mx-auto space-y-6">
            {/* Calendar card */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  {/* Google Calendar fake logo */}
                  <div className="grid grid-cols-2 gap-1 w-6 h-6">
                    <div className="bg-blue-500 rounded-sm"></div>
                    <div className="bg-red-500 rounded-sm"></div>
                    <div className="bg-yellow-500 rounded-sm"></div>
                    <div className="bg-green-500 rounded-sm"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Google Calendar</h3>
                  <p className="text-slate-400 text-sm">Connected</p>
                </div>
                <div className="ml-auto w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
              </div>
              <div className="flex justify-between items-center px-4 py-3 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700 transition">
                <span className="text-sm font-medium text-slate-300">Check for conflicts</span>
                <CheckCircle size={16} className="text-blue-400" />
              </div>
            </motion.div>

            {/* Meet Card */}
            <motion.div 
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl relative left-6 md:left-12"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-[#0069FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
                  <Video size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Zoom Integration</h3>
                  <p className="text-slate-400 text-sm">Default Location</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-3/4 bg-slate-700 rounded-full"></div>
                <div className="h-2 w-1/2 bg-slate-700 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
