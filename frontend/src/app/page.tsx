"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Zap,
  ClipboardList,
  Users,
  Shield,
  CalendarHeart,
  Video,
  Calendar as CalendarIcon,
  MessageSquare,
  Briefcase,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Search,
  CheckCircle,
  Menu,
  X
} from "lucide-react";

const SLOTIFY_BLUE = "#0069FF";

// SVG Slotify Logo mark
const SlotifyLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill={SLOTIFY_BLUE} />
      <path
        d="M20.5 10.5C18.8 9.5 16.8 9 14.8 9.3C11.3 9.8 8.5 12.8 8.5 16.5C8.5 20.5 11.8 23.5 16 23.5C17.5 23.5 18.9 23 20 22.2"
        stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none"
      />
      <path d="M20 14L23.5 16.5L20 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="font-bold text-[22px] tracking-tight text-slate-800">
      Slotify
    </span>
  </div>
);

// ─── NAVBAR ────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = ["Product", "Solutions", "Resources", "Pricing"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-10 h-20 max-w-[1400px] mx-auto">
        <SlotifyLogo />
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-full px-4 py-1.5 shadow-sm">
          {navItems.map(item => (
            <button key={item} className="flex items-center text-[14px] font-medium text-slate-700 hover:text-[#0069FF] px-4 py-2 rounded-full transition-colors hover:bg-white">
              {item} {item !== "Pricing" && <ChevronDown size={14} className="ml-1 opacity-70" />}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login" className="text-[15px] font-semibold text-slate-700 hover:text-[#0069FF] transition-colors">Log In</Link>
          <Link href="/register">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0069FF] hover:bg-blue-700 text-white rounded-full px-6 py-2.5 text-[15px] font-semibold transition-colors shadow-[0_4px_14px_0_rgb(0,105,255,0.39)]"
            >
              Get started
            </motion.div>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="lg:hidden p-2 text-slate-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {navItems.map(item => (
                <button key={item} className="flex justify-between items-center text-left text-lg font-semibold text-slate-800 w-full pb-4 border-b border-gray-100">
                  {item} {item !== "Pricing" && <ChevronDown className="text-gray-400" />}
                </button>
              ))}
              <div className="flex flex-col gap-4 mt-2">
                <Link href="/login" className="text-lg font-semibold text-slate-700 w-full text-center py-3.5 border-2 border-gray-200 rounded-xl block hover:bg-gray-50 transition-colors">Log In</Link>
                <Link href="/register" className="bg-[#0069FF] text-white rounded-xl py-3.5 text-lg font-bold w-full text-center block shadow-[0_4px_14px_0_rgb(0,105,255,0.39)]">
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ─── HERO SECTION ──────────────────────────────────────────────────────────
const HeroSection = () => {
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
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
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
                  { name: "L'ORÉAL", color: "#1a1a2e", cls: "font-bold italic text-lg md:text-[20px]" },
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

// ─── "MORE THAN A SCHEDULING LINK" SECTION ─────────────────────────────────
const MoreThanLink = () => {
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

// ─── "EASY AS 1-2-3" / HOW IT WORKS ────────────────────────────────────────
const HowItWorks = () => {
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

// ─── INTEGRATIONS SECTION ──────────────────────────────────────────────────
const IntegrationsSection = () => {
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

// ─── CTA + FOOTER ──────────────────────────────────────────────────────────
const FooterCTA = () => (
  <section className="bg-slate-50 pt-20 px-6 relative overflow-hidden text-slate-800 border-t border-gray-200">
    <div className="max-w-[1200px] mx-auto">
      {/* Big Bold CTA Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900 rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 mb-20 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-40 pointer-events-none" />
        
        <div className="relative z-10 text-center md:text-left max-w-lg">
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
            Simplify scheduling today.
          </h2>
          <p className="text-blue-100/80 text-lg">
            Join over 100,000 teams building better relationships with Slotify.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
          <Link href="/register">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0069FF] text-white rounded-full px-8 py-4 text-base font-bold shadow-[0_8px_30px_rgb(0,105,255,0.4)] w-full sm:w-auto"
            >
              Start for free
            </motion.button>
          </Link>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent text-white border border-white/30 rounded-full px-8 py-4 text-base font-bold w-full sm:w-auto"
          >
            Talk to sales
          </motion.button>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-8 pb-16">
        <div className="col-span-2 lg:col-span-1">
          <div className="mb-6">
            <SlotifyLogo />
          </div>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
            We take the work out of connecting with others so you can accomplish more.
          </p>
          <div className="flex items-center gap-3">
             <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
               <span className="sr-only">Twitter</span>
               <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
             </button>
             <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
               <span className="sr-only">GitHub</span>
               <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
             </button>
          </div>
        </div>
        {[
          { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
          { title: "Solutions", links: ["Customer Success", "Sales", "Recruiting", "Education"] },
          { title: "Resources", links: ["Blog", "Help Center", "Community", "Developer API"] },
          { title: "Company", links: ["About Us", "Careers", "Security", "Contact"] },
        ].map(col => (
          <div key={col.title}>
            <p className="font-bold text-[16px] text-slate-800 mb-5">{col.title}</p>
            <ul className="flex flex-col gap-3.5">
              {col.links.map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-500 font-medium text-[15px] hover:text-[#0069FF] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="py-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400 font-medium">
        <p>© 2026 Slotify Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
           <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
           <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </section>
);

// ─── MAIN EXPORT ───────────────────────────────────────────────────────────
export default function SlotifyLanding() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-200">
      <Navbar />
      <main>
        <HeroSection />
        <MoreThanLink />
        <HowItWorks />
        <IntegrationsSection />
      </main>
      <FooterCTA />
    </div>
  );
}
