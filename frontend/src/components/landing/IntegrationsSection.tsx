"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Video, MessageSquare, Calendar as CalendarIcon, Users, Briefcase, Zap, ArrowRight, Globe 
} from "lucide-react";

export const IntegrationsSection = () => {
  const integrations = [
    { icon: Video, label: "Zoom", color: "text-blue-500" },
    { icon: MessageSquare, label: "Slack", color: "text-purple-600" },
    { icon: CalendarIcon, label: "Google", color: "text-red-500" },
    { icon: Users, label: "Teams", color: "text-indigo-600" },
    { icon: Briefcase, label: "Salesforce", color: "text-sky-500" },
  ];

  return (
    <section className="bg-white py-24 px-6 relative">
      {/* Decorative dots background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=')] opacity-50 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6 text-blue-600 font-bold text-sm">
            <Zap size={14} /> Integrations Ecosystem
          </div>
          <h2 className="text-4xl lg:text-[50px] font-semibold text-slate-800 leading-[1.1] mb-6">
            Connect Slotify to the tools you already use
          </h2>
          <p className="text-lg text-slate-500 mb-8 font-medium">
             Boost productivity with over 100+ native integrations. Synchronize your CRM, video conferencing, and analytics seamlessly.
          </p>
          <a href="#" className="inline-flex items-center gap-2 font-bold text-[#0069FF] hover:gap-3 transition-all">
            Browse directory <ArrowRight size={18} />
          </a>

          <div className="flex flex-wrap gap-4 mt-12">
            {integrations.map((Item, i) => (
              <motion.div 
                key={Item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white border border-slate-100 rounded-2xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <Item.icon size={28} className={Item.color} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -10 }}
              className="border border-slate-100 rounded-[24px] p-8 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] cursor-pointer transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600">
                <Globe size={28} />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-3">Google Workspace</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Connect Calendar, Meet, and Analytics to centralize your workflow.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="border border-slate-100 rounded-[24px] p-8 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] cursor-pointer transition-all mt-0 sm:mt-12"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 text-indigo-600">
                <Briefcase size={28} />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-3">Microsoft Suite</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Seamless integration with Teams, Outlook, and Azure SSO.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
