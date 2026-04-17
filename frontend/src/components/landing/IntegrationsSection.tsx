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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section className="bg-white py-24 md:py-40 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-50/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-indigo-50/50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 lg:gap-32 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-8 text-blue-600 font-bold text-sm">
            <Zap size={16} /> Ecosystem
          </div>
          <h2 className="text-4xl lg:text-[64px] text-slate-900 leading-[1.05] mb-8 tracking-tight">
            Connect Slotify to the <span className="text-blue-600">tools you love</span>
          </h2>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
             Boost productivity with over 100+ native integrations. Synchronize your CRM, video conferencing, and analytics in seconds.
          </p>
          <motion.a 
            href="#" 
            whileHover={{ x: 10 }}
            className="inline-flex items-center gap-3 font-bold text-lg text-[#0069FF] group transition-all"
          >
            Browse integrations directory <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-5 mt-16"
          >
            {integrations.map((Item, i) => (
              <motion.div 
                key={Item.label}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.1, rotate: 5 }}
                className="bg-white border border-slate-100 rounded-[24px] w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-blue-500/10"
              >
                <Item.icon size={32} className={Item.color} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative">
          <div className="grid sm:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="border border-slate-100 rounded-[32px] p-10 bg-white shadow-[0_32px_64px_-20px_rgba(0,0,0,0.1)] cursor-pointer transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 text-blue-600">
                <Globe size={32} />
              </div>
              <h3 className="font-bold text-2xl text-slate-900 mb-4">Google Workspace</h3>
              <p className="text-base text-slate-500 leading-relaxed font-medium">Connect Calendar, Meet, and Analytics to centralize your entire workflow.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -15 }}
              className="border border-slate-100 rounded-[32px] p-10 bg-white shadow-[0_32px_64px_-20px_rgba(0,0,0,0.1)] cursor-pointer transition-all mt-0 sm:mt-16"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 text-indigo-600">
                <Briefcase size={32} />
              </div>
              <h3 className="font-bold text-2xl text-slate-900 mb-4">Microsoft Suite</h3>
              <p className="text-base text-slate-500 leading-relaxed font-medium">Seamless integration with Teams, Outlook, and Azure Active Directory.</p>
            </motion.div>
          </div>
          
          {/* Floating badge */}
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-4 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm z-20"
          >
            100+ Apps Included
          </motion.div>
        </div>
      </div>
    </section>
  );
};

