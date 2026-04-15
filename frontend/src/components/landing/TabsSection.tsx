"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Zap, ClipboardList, Users, Shield, 
  ArrowRight, Search, ExternalLink, CalendarHeart, CheckCircle 
} from "lucide-react";

export const TabsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: Globe,
      label: "Browser extensions",
      description: "Quickly find and share scheduling links from your inbox, LinkedIn, CRM, and more.",
      link: "Learn more",
    },
    {
      icon: Zap,
      label: "Automated workflows",
      description: "Send reminders, follow-ups, and other automated messages to reduce no-shows.",
      link: "Learn more",
    },
    {
      icon: ClipboardList,
      label: "Routing forms",
      description: "Ask scheduling questions to automatically match invitees with the right meeting.",
      link: "Learn more",
    },
    {
      icon: Users,
      label: "Round robin & collective",
      description: "Distribute meetings fairly across your team or host meetings with multiple hosts.",
      link: "Learn more",
    },
    {
      icon: Shield,
      label: "Admin management",
      description: "Gain visibility and control over your organization's scheduling activities.",
      link: "Learn more",
    },
  ];

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="text-center mb-16 px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-[60px] font-semibold text-slate-800 leading-[1.1] mb-6 tracking-tight"
        >
          More than a <span className="text-[#0069FF]">scheduling link</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 max-w-[650px] mx-auto mb-8 font-medium"
        >
          Slotify's functionality goes way beyond just finding a time to meet, with customizable automated features to help you achieve goals faster.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 max-w-[1200px] mx-auto px-6 lg:px-10 gap-16 lg:gap-10 items-center">
        {/* Left: App UI mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative flex items-center justify-center pt-10 lg:py-10"
        >
          {/* Decorative glowing backdrops */}
          <div className="absolute inset-x-10 inset-y-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-[80px] -z-10" />
          
          {/* App card mockup */}
          <div className="relative z-20 bg-white rounded-[24px] w-full max-w-[400px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-inner">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                </div>
              </div>
              <button className="bg-slate-800 text-white rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1 hover:bg-slate-700 transition">
                + Create
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-5">
                <span className="font-bold text-lg text-slate-800">Event types</span>
                <span className="text-[#0069FF] text-sm font-semibold cursor-pointer flex items-center gap-1 hover:underline">
                  New Event
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-center gap-3 mb-6 border border-gray-100 transition-colors hover:border-blue-200">
                <Search size={16} className="text-slate-400" />
                <span className="text-slate-400 text-sm font-medium">Search events...</span>
              </div>

              {/* Event Card */}
              <motion.div 
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", borderColor: "#0069FF" }}
                className="border border-gray-200 rounded-2xl p-5 mb-5 cursor-pointer transition-all bg-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-base text-slate-800">Discovery Call</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                  <CalendarHeart size={14} /> 30 min • One-on-one
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-2.5 text-sm font-semibold text-slate-700 transition">
                    Book
                  </button>
                  <button className="flex-[2] bg-white border border-slate-200 shadow-sm rounded-lg py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300 transition flex justify-center items-center gap-2">
                    <ExternalLink size={14} /> Share Link
                  </button>
                </div>
              </motion.div>
              
              {/* Skeleton item */}
              <div className="border border-gray-100 rounded-2xl p-5 mb-2 opacity-60">
                 <div className="h-4 w-1/2 bg-slate-100 rounded mb-3"></div>
                 <div className="h-3 w-1/3 bg-slate-100 rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 top-1/4 bg-white p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 z-30 hidden md:flex"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
               <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Booking confirmed</p>
              <p className="text-xs text-slate-500">Alex arranged a meeting</p>
            </div>
          </motion.div>

        </motion.div>

        {/* Right: Feature tabs */}
        <div className="lg:pl-10">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = i === activeTab;
            return (
              <motion.div 
                key={i} 
                className={`py-6 border-b border-gray-100 cursor-pointer group transition-colors ${isActive ? '' : 'hover:bg-slate-50/50'}`}
                onClick={() => setActiveTab(i)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-5 px-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'bg-[#0069FF] text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
                    <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                  </div>
                  <span className={`text-[19px] transition-all duration-300 ${isActive ? 'font-bold text-slate-800' : 'font-semibold text-slate-500'}`}>
                    {tab.label}
                  </span>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pl-[76px] pr-4">
                        <p className="text-base text-slate-500 mb-3 leading-relaxed">
                          {tab.description}
                        </p>
                        <span className="text-[#0069FF] text-[15px] font-bold flex items-center gap-1.5 hover:gap-2 transition-all cursor-pointer">
                          {tab.link} <ArrowRight size={16} />
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};
