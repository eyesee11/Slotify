"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Zap, ClipboardList, Users, Shield, 
  ArrowRight, Search, ExternalLink, CalendarHeart, CheckCircle,
  Mail, Bell, Filter, LayoutDashboard, Settings
} from "lucide-react";

export const TabsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_PLAY_DURATION = 6000; // 6 seconds

  const tabs = [
    {
      icon: Globe,
      label: "Browser extensions",
      description: "Quickly find and share scheduling links from your inbox, LinkedIn, CRM, and more.",
      link: "Explore extensions",
      color: "blue"
    },
    {
      icon: Zap,
      label: "Automated workflows",
      description: "Send reminders, follow-ups, and other automated messages to reduce no-shows.",
      link: "See workflows",
      color: "indigo"
    },
    {
      icon: ClipboardList,
      label: "Routing forms",
      description: "Ask scheduling questions to automatically match invitees with the right meeting.",
      link: "Learn about routing",
      color: "purple"
    },
    {
      icon: Users,
      label: "Round robin & collective",
      description: "Distribute meetings fairly across your team or host meetings with multiple hosts.",
      link: "Team scheduling",
      color: "teal"
    },
    {
      icon: Shield,
      label: "Admin management",
      description: "Gain visibility and control over your organization's scheduling activities.",
      link: "Admin features",
      color: "slate"
    },
  ];

  // Auto-play logic
  useEffect(() => {
    const startTimer = () => {
      autoPlayRef.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }, AUTO_PLAY_DURATION);
    };

    startTimer();
    
    // Progress bar logic
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / (AUTO_PLAY_DURATION / 100)); // Update every 100ms
      });
    }, 100);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      clearInterval(progressInterval);
    };
  }, [tabs.length]);

  // Reset progress when tab changes
  useEffect(() => {
    setProgress(0);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }, AUTO_PLAY_DURATION);
    }
  }, [activeTab, tabs.length]);

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="text-center mb-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-6"
        >
          Powerful Features
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-[64px]  text-slate-900 leading-[1.05] mb-8 tracking-tight"
        >
          More than a <span className="text-[#0069FF]">scheduling link</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-slate-500 max-w-[750px] mx-auto font-medium"
        >
          Slotify's functionality goes way beyond just finding a time to meet. We automate your entire meeting lifecycle.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 max-w-[1300px] mx-auto px-6 lg:px-10 gap-16 lg:gap-24 items-center">
        {/* Left: Dynamic App UI mockup */}
        <div className="relative h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              className="relative z-20 w-full max-w-[450px]"
            >
              <div className="bg-white rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden h-[480px]">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">S</div>
                    <div className="font-bold text-slate-800">Slotify</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Settings size={14}/></div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Bell size={14}/></div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Tab Specific Content */}
                  {activeTab === 0 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Globe className="text-blue-500" size={20}/>
                        <h4 className="font-bold text-lg">Chrome Extension</h4>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-sm text-blue-700 font-medium mb-3">Add to Gmail</p>
                        <div className="h-2 w-full bg-blue-200 rounded-full mb-2"></div>
                        <div className="h-2 w-2/3 bg-blue-100 rounded-full"></div>
                      </div>
                      <div className="space-y-4">
                        {[1, 2].map(i => (
                          <div key={i} className="flex items-center gap-4 p-3 border border-gray-50 rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-slate-100"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-2 w-24 bg-slate-100 rounded-full"></div>
                              <div className="h-2 w-16 bg-slate-50 rounded-full"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 1 && (
                    <div className="space-y-6 text-indigo-600">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap size={20}/>
                        <h4 className="font-bold text-lg text-slate-800">Workflow: Reminder</h4>
                      </div>
                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Mail size={18} />
                          <p className="text-sm font-bold">Auto-Email Sent</p>
                        </div>
                        <p className="text-[13px] text-indigo-700 leading-relaxed">"Hi there! Just a heads up about our meeting in 1 hour. Looking forward to it!"</p>
                      </motion.div>
                      <div className="flex flex-col gap-3">
                        <div className="h-12 border-l-2 border-indigo-100 ml-4"></div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white"><CheckCircle size={16}/></div>
                          <p className="text-sm font-bold text-slate-800">Trigger: Follow-up</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <ClipboardList className="text-purple-500" size={20}/>
                        <h4 className="font-bold text-lg text-slate-800">Routing Form</h4>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase mb-2">What is your goal?</p>
                          <div className="p-3 border border-purple-200 bg-purple-50 rounded-xl text-sm font-medium text-purple-700">Sales Consultation</div>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-xl text-sm text-slate-400">Select company size...</div>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold text-sm"
                        >
                          Route Meeting
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {activeTab === 3 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Users className="text-teal-500" size={20}/>
                        <h4 className="font-bold text-lg text-slate-800">Team Round Robin</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="p-4 border border-teal-100 bg-teal-50/50 rounded-2xl text-center">
                            <div className="w-10 h-10 rounded-full bg-teal-100 mx-auto mb-2 flex items-center justify-center text-teal-600 ring-2 ring-white">
                              {String.fromCharCode(64 + i)}
                            </div>
                            <p className="text-xs font-bold text-slate-800">Expert {i}</p>
                            <p className="text-[10px] text-teal-600">Available</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 4 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="text-slate-600" size={20}/>
                        <h4 className="font-bold text-lg text-slate-800">Admin Controls</h4>
                      </div>
                      <div className="p-5 border border-slate-200 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-bold text-slate-500">USER PERMISSION</p>
                          <div className="w-8 h-4 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="h-px bg-slate-100"></div>
                        <div className="space-y-3">
                           <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                           <div className="h-2 w-3/4 bg-slate-100 rounded-full"></div>
                           <div className="h-2 w-1/2 bg-slate-50 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Decorative glows that change color */}
          <motion.div 
            animate={{ 
              backgroundColor: activeTab === 0 ? "#dbeafe" : activeTab === 1 ? "#e0e7ff" : activeTab === 2 ? "#f3e8ff" : activeTab === 3 ? "#ccfbf1" : "#f1f5f9",
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-x-0 inset-y-10 rounded-full blur-[100px] -z-10" 
          />
        </div>

        {/* Right: Interactive Feature items */}
        <div className="flex flex-col">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = i === activeTab;
            return (
              <div 
                key={i} 
                className={`relative px-6 py-6 border-l-4 transition-all duration-300 cursor-pointer ${isActive ? 'bg-slate-50 border-[#0069FF]' : 'border-transparent hover:bg-slate-50/50'}`}
                onClick={() => setActiveTab(i)}
              >
                {/* Progress bar background */}
                {isActive && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 origin-left z-10"
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                )}
                
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'bg-[#0069FF] text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className={`text-xl transition-all duration-300 ${isActive ? 'font-bold text-slate-900' : 'font-semibold text-slate-600'}`}>
                      {tab.label}
                    </h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-2 text-sm text-slate-500 leading-relaxed font-medium">
                            {tab.description}
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-[#0069FF] font-bold text-sm">
                            {tab.link} <ArrowRight size={16} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

