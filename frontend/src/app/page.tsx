"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CALENDLY_BLUE = "#0069FF";

// SVG Calendly Logo mark
const CalendlyLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill={CALENDLY_BLUE} />
      <path
        d="M20.5 10.5C18.8 9.5 16.8 9 14.8 9.3C11.3 9.8 8.5 12.8 8.5 16.5C8.5 20.5 11.8 23.5 16 23.5C17.5 23.5 18.9 23 20 22.2"
        stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none"
      />
      <path d="M20 14L23.5 16.5L20 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="font-bold text-[22px] tracking-tight" style={{ color: CALENDLY_BLUE }}>
      Calendly
    </span>
  </div>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ExternalArrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M5 13L13 5M13 5H7M13 5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── NAVBAR ────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ["Product", "Solutions", "Resources", "Pricing"];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 lg:px-10 h-16 max-w-[1400px] mx-auto">
        <CalendlyLogo />
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          {navItems.map(item => (
            <button key={item} className="flex items-center text-[15px] font-medium text-slate-800 hover:text-blue-600 px-3 py-2 rounded-md transition-colors">
              {item} {item !== "Pricing" && <ChevronDown />}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login" className="text-[15px] font-medium text-slate-800 hover:text-blue-600 px-4 py-2 transition-colors">Log In</Link>
          <Link href="/register" className="bg-[#0069FF] hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-[15px] font-semibold transition-colors">
            Get started
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navItems.map(item => (
                <button key={item} className="flex justify-between items-center text-left text-lg font-medium text-slate-800 w-full pb-2 border-b border-gray-50">
                  {item} {item !== "Pricing" && <ChevronDown />}
                </button>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Link href="/login" className="text-lg font-medium text-slate-800 w-full text-center py-3 border border-gray-200 rounded-lg block">Log In</Link>
                <Link href="/register" className="bg-[#0069FF] text-white rounded-lg py-3 text-lg font-semibold w-full text-center block">
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ─── HERO SECTION ──────────────────────────────────────────────────────────
const HeroSection = () => (
  <section className="bg-white pb-16 relative overflow-hidden">
    {/* Purple-pink gradient banner top right */}
    <div className="absolute -top-6 -right-16 md:-top-10 md:-right-20 w-[300px] h-[120px] md:w-[520px] md:h-[180px] bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 rounded-bl-full z-0 opacity-80" />
    
    <div className="relative z-10 text-center pt-8 md:pt-12 px-6">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[14px] md:text-[15px] text-gray-600 mb-10 md:mb-16"
      >
        Trusted by more than <strong className="text-slate-900">100,000</strong> of the world's leading organizations
      </motion.p>

      {/* Logo marquee */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-8 md:gap-14 px-4 md:px-16 pb-12 md:pb-16"
      >
        {[
          { name: "Carnival", color: "#003087", cls: "font-bold text-base md:text-lg" },
          { name: "INDIANA UNIVERSITY", color: "#990000", cls: "font-bold text-sm tracking-wide md:text-base uppercase" },
          { name: "DoorDash", color: "#FF3008", cls: "font-bold text-base md:text-lg" },
          { name: "lyft", color: "#FF00BF", cls: "font-black text-xl md:text-2xl" },
          { name: "COMPASS", color: "#1a1a2e", cls: "font-bold tracking-wide text-sm md:text-base uppercase" },
          { name: "L'ORÉAL", color: "#1a1a2e", cls: "font-bold italic text-base md:text-[17px]" },
          { name: "zendesk", color: "#03363d", cls: "font-bold text-base md:text-lg" },
        ].map(logo => (
          <span key={logo.name} className={`${logo.cls} opacity-85`} style={{ color: logo.color }}>
            {logo.name}
          </span>
        ))}
      </motion.div>

      {/* Main headline */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-[76px] font-bold text-slate-700 leading-[1.1] md:leading-[1.1] mb-6"
        >
          Calendly makes<br className="hidden md:block"/> scheduling simple
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base md:text-[17px] text-gray-500 max-w-[660px] mx-auto mb-8 leading-relaxed px-4 md:px-0"
        >
          Calendly's easy enough for individual users, and powerful enough to meet the needs of enterprise organizations — including 86% of the Fortune 500 companies.
        </motion.p>
        
        <Link href="/register">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0069FF] hover:bg-blue-700 text-white rounded-lg px-8 py-4 text-base font-semibold transition-all shadow-lg shadow-blue-500/30"
          >
            Sign up for free
          </motion.button>
        </Link>
      </div>
    </div>
  </section>
);

// ─── "MORE THAN A SCHEDULING LINK" SECTION ─────────────────────────────────
const MoreThanLink = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: "🌐",
      label: "Browser extensions",
      description: "Quickly find and share scheduling links from your inbox, LinkedIn, CRM, and more.",
      link: "Learn more",
    },
    {
      icon: "⚡",
      label: "Automated workflows",
      description: "Send reminders, follow-ups, and other automated messages to reduce no-shows.",
      link: "Learn more",
    },
    {
      icon: "📋",
      label: "Routing forms",
      description: "Ask scheduling questions to automatically match invitees with the right meeting.",
      link: "Learn more",
    },
    {
      icon: "🔄",
      label: "Round robin & collective events",
      description: "Distribute meetings fairly across your team or host meetings with multiple hosts.",
      link: "Learn more",
    },
    {
      icon: "👑",
      label: "Admin management",
      description: "Gain visibility and control over your organization's scheduling activities.",
      link: "Learn more",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="text-center mb-12 px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-[66px] font-bold text-[#0069FF] leading-[1.1] mb-5"
        >
          More than a<br className="hidden md:block"/>scheduling link
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-[17px] text-gray-500 max-w-[600px] mx-auto mb-8 leading-relaxed"
        >
          Calendly's functionality goes way beyond just a scheduling link, with customizable, automated features to help you and your team achieve goals faster.
        </motion.p>
        <Link href="/register">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#0069FF] hover:bg-blue-700 text-white rounded-lg px-8 py-3.5 text-base font-semibold shadow-lg shadow-blue-500/20"
          >
            Sign up for free
          </motion.button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 max-w-[1200px] mx-auto px-6 lg:px-10 gap-10 md:gap-0 items-start">
        {/* Left: App UI mockup */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex items-start justify-center pt-10 pb-0 md:py-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-blue-600 rounded-[20px] opacity-90 z-0 overflow-hidden hidden md:block" />
          <div className="absolute bottom-0 -right-2 w-[120px] h-[200px] bg-[#0069FF] rounded-tl-[20px] z-10 hidden md:block" />

          {/* App card mockup */}
          <div className="relative z-20 bg-white rounded-2xl w-full max-w-[360px] shadow-2xl overflow-hidden border border-gray-100 md:border-none">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0069FF] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <span className="text-sm text-gray-500">⋮</span>
              </div>
              <button className="bg-[#0069FF] text-white rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1">+ Create</button>
              <span className="text-gray-400">✕</span>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-base text-slate-900">Event types</span>
                <span className="text-[#0069FF] text-xs font-semibold cursor-pointer">+ New event type</span>
              </div>

              <div className="bg-gray-50 rounded-lg px-3 py-2 flex items-center gap-2 mb-4">
                <span className="text-gray-400 text-sm">🔍</span>
                <span className="text-gray-400 text-sm">Search event types...</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center">
                    <span className="text-xs text-white">FS</span>
                  </div>
                  <span className="font-semibold text-sm text-slate-900">Fatima Sy (you)</span>
                </div>
              </div>

              <div className="border-2 border-[#0069FF] rounded-xl p-3.5 mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-[15px] text-slate-900">Follow-up Call</span>
                  <span className="text-gray-400 text-sm">⋮</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">30 min • One on one</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-transparent border border-gray-200 rounded-full py-1.5 text-xs font-medium text-slate-700">
                    Book
                  </button>
                  <button className="flex-[2] bg-transparent border border-gray-200 rounded-full py-1.5 text-xs font-medium text-slate-700">
                    ↗ Share
                  </button>
                </div>
              </div>
              <div className="font-semibold text-sm text-slate-900 mb-2">Shared</div>
              <div className="h-1.5 rounded-full bg-[#0069FF] w-1/5" />
            </div>
          </div>
        </motion.div>

        {/* Right: Feature tabs */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:pl-10"
        >
          {tabs.map((tab, i) => (
            <div key={i} onClick={() => setActiveTab(i)} className="py-5 border-b border-gray-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 transition-colors ${i === activeTab ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  {tab.icon}
                </div>
                <span className={`text-base font-semibold transition-colors ${i === activeTab ? 'text-slate-900' : 'text-gray-400'}`}>
                  {tab.label}
                </span>
              </div>
              <AnimatePresence>
                {i === activeTab && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pl-12 pr-4">
                      <p className="text-sm text-gray-500 mb-2 leading-relaxed">
                        {tab.description}
                      </p>
                      <span className="text-[#0069FF] text-sm font-semibold flex items-center gap-1 hover:underline">
                        {tab.link} <ArrowRight />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── "EASY AS 1-2-3" / HOW IT WORKS ────────────────────────────────────────
const HowItWorks = () => {
  const steps = [
    { icon: "🔗", label: "Connect your calendars", color: "bg-sky-100" },
    { icon: "🎉", label: "Connect conferencing tools", color: "bg-purple-100" },
    { icon: "🎨", label: "Customize your event types", color: "bg-orange-100" },
    { icon: "🌍", label: "Share your scheduling link", color: "bg-green-100" },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left: steps */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-4 py-5 ${i < steps.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${step.color}`}>
                {step.icon}
              </div>
              <span className="text-base md:text-lg text-gray-500 font-medium">{step.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Right: Calendar integrations mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative pl-8 md:pl-20 mt-10 md:mt-0"
        >
          <div className="absolute -top-4 left-10 md:left-24 w-10 h-[105%] bg-gradient-to-b from-purple-400 via-purple-500 to-blue-500 rounded-[20px] z-0" />
          <div className="absolute top-4 -right-2 md:-right-4 w-24 h-[80%] bg-[#0069FF] rounded-2xl z-0" />

          <div className="relative z-10 w-full max-w-[340px] mx-auto">
            {/* Google card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] mb-4 border border-gray-50"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[22px]">🌍</span>
                <span className="font-bold text-base text-slate-900">Google</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <span className="text-sm text-slate-700">Google calendars</span>
                <span className="text-gray-400">›</span>
              </div>
            </motion.div>

            {/* Microsoft card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="grid grid-cols-2 gap-0.5 w-[22px] h-[22px]">
                  {["#f25022", "#7fba00", "#00a4ef", "#ffb900"].map(c => (
                    <div key={c} className="rounded-sm" style={{ background: c }} />
                  ))}
                </div>
                <span className="font-bold text-base text-slate-900">Microsoft</span>
              </div>
              {["Outlook calendars", "Exchange calendars"].map(item => (
                <div key={item} className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg mb-2 cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-slate-700">{item}</span>
                  <span className="text-gray-400">›</span>
                </div>
              ))}
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
    { name: "Zoom", emoji: "📹" },
    { name: "Salesforce", emoji: "☁️" },
    { name: "Google\nCalendar", emoji: "📅" },
    { name: "Slack", emoji: "💬" },
    { name: "Teams", emoji: "🟦" },
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-extrabold text-[#1A3A5C] leading-[1.15] mb-6">
            Connect Calendly to the tools you already use
          </h2>
          <div className="flex flex-wrap gap-3 mt-8 max-w-[300px]">
            {integrations.map(({ name, emoji }, i) => (
              <motion.div 
                key={name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                className="bg-white border border-gray-200 rounded-xl w-[70px] h-[70px] md:w-20 md:h-20 flex flex-col items-center justify-center cursor-pointer shadow-sm transition-all"
              >
                <span className="text-2xl md:text-[28px]">{emoji}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-500 text-base md:text-[17px] mb-2 font-medium">
            Boost productivity with 100+ integrations
          </p>
          <a href="#" className="font-semibold text-[15px] text-[#1A3A5C] flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4">
            View all integrations <ArrowRight />
          </a>

          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {[
              {
                logo: "🌐", name: "Google suite",
                desc: "Get your job done faster by connecting Calendly to Google Calendar, Meet, Analytics, and more.",
              },
              {
                logo: "🟦", name: "Microsoft suite",
                desc: "Make your day easier with Calendly integrations for Microsoft Teams, Outlook, Azure SSO, and more.",
              },
            ].map((card, i) => (
              <motion.div 
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
                className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[28px]">{card.logo}</span>
                  <span className="text-gray-300"><ExternalArrow /></span>
                </div>
                <p className="font-bold text-base text-slate-900 mb-2">{card.name}</p>
                <p className="text-[13px] text-gray-500 leading-relaxed m-0">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── CUSTOMER STORIES SECTION ──────────────────────────────────────────────
const CustomerStories = () => {
  const stories = [
    { company: "hackerone", stat: "169%", desc: "return on investment", accent: "#1A3A5C", border: "border-gray-200", font: "font-mono tracking-tight" },
    { company: "VONAGE", stat: "160%", desc: "increase in customers reached", accent: "#0069FF", border: "border-[#0069FF]" },
    { company: "TEXAS", stat: "20%", desc: "decrease in scheduling errors", accent: "#F5A623", border: "border-[#F5A623]" },
    { company: "MUCK RACK", stat: "8x", desc: "reduction in time to book", accent: "#9B59B6", border: "border-[#9B59B6]" },
  ];

  return (
    <section className="bg-[#f8f9fb] py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-[42px] lg:text-[52px] font-extrabold text-[#1A3A5C] mb-4 leading-tight">
              Discover how businesses grow<br className="hidden md:block"/>with Calendly
            </h2>
            <a href="#" className="font-semibold text-[15px] text-[#1A3A5C] flex items-center gap-1.5 hover:underline decoration-2 underline-offset-4">
              View customer stories <ArrowRight />
            </a>
          </motion.div>
          <div className="flex gap-2 hidden md:flex">
            {["‹", "›"].map((arrow, i) => (
              <button key={i} className="w-10 h-10 rounded-full border border-gray-300 bg-white text-xl text-gray-500 flex items-center justify-center hover:bg-gray-50 transition-colors">
                {arrow}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stories.map((story, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`bg-white rounded-2xl border-2 ${story.border} overflow-hidden flex flex-col transition-transform`}
            >
              <div className="p-6 pb-2">
                <p className={`font-extrabold text-lg text-slate-900 mb-6 ${story.font || ''}`}>
                  {story.company}
                </p>
                <p className="text-[42px] leading-tight font-extrabold mb-2" style={{ color: story.accent }}>
                  {story.stat}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {story.desc}
                </p>
              </div>
              <div className="mt-auto" />
              {/* Bottom blob button */}
              <div 
                className="mt-2 pt-4 pb-5 px-6 flex items-center"
                style={{ 
                  backgroundColor: story.accent, 
                  clipPath: "ellipse(110% 100% at 50% 100%)",
                }}
              >
                <button className="bg-transparent border-none text-white font-bold text-[15px] flex items-center gap-2 hover:gap-3 transition-all">
                  Read now <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA + FOOTER ──────────────────────────────────────────────────────────
const FooterCTA = () => (
  <section className="bg-[#f8f9fb] pt-12 md:pt-16 px-6 relative overflow-hidden">
    <div className="max-w-[1200px] mx-auto">
      {/* CTA Bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#1A3A5C] rounded-3xl p-8 md:p-12 lg:px-16 lg:py-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-30 pointer-events-none" />
        
        <h2 className="text-3xl md:text-4xl lg:text-[46px] font-extrabold text-white text-center md:text-left leading-tight relative z-10">
          Ready to make<br className="hidden md:block"/>easy scheduling?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
          <Link href="/register" className="bg-[#0069FF] hover:bg-blue-600 text-white rounded-xl px-8 py-3.5 text-base font-bold transition-colors shadow-lg shadow-blue-500/20 whitespace-nowrap text-center inline-block">
            Start for free
          </Link>
          <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white/80 rounded-xl px-8 py-3.5 text-base font-bold transition-colors whitespace-nowrap text-center">
            Get a demo
          </button>
        </div>
      </motion.div>

      {/* Footer links */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-200">
        {[
          {
            title: "Product",
            links: ["Scheduling automation", "Meeting Notetaker", "Payments", "Customizable availability", "Mobile apps", "Browser extensions", "Meeting routing", "Event Types", "Admin management"],
          },
          {
            title: "Integrations",
            links: ["Google ecosystem", "Microsoft ecosystem", "Calendars", "Video conferencing", "Payment processors", "Sales & CRM", "API & connectors", "Security & compliance"],
          },
          {
            title: "Calendly",
            links: ["Pricing", "Product overview", "Solutions", "Compare", "Security", "Sign up for free", "Talk to sales", "Get a demo"],
          },
          {
            title: "Resources",
            links: ["Help center", "Resource center", "Blog", "Customer stories", "Learning hub", "Calendly community", "Developer tools"],
          },
          {
            title: "Company",
            links: ["About us", "Leadership", "Careers", "Newsroom", "Become a partner", "Contact us"],
          },
        ].map(col => (
          <div key={col.title}>
            <p className="font-bold text-[15px] text-slate-900 mb-4">{col.title}</p>
            <div className="flex flex-col gap-3">
              {col.links.map(link => (
                <a key={link} href="#" className="text-gray-500 text-sm hover:text-[#0069FF] transition-colors">{link}</a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Downloads & Socials */}
      <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1 w-full text-center md:text-left">
          <p className="font-bold text-[15px] text-slate-900 mb-3">Downloads</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {["🍎 App Store", "▶ Google Play", "🔵 Chrome extension", "🔵 Edge extension"].map(d => (
              <button key={d} className="bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm transition-colors">
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          {["𝕏", "f", "📸", "in", "▶"].map((icon, i) => (
            <button key={i} className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-[15px] flex items-center justify-center text-slate-700 shadow-sm transition-colors">
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── MAIN EXPORT ───────────────────────────────────────────────────────────
export default function CalendlyLanding() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <MoreThanLink />
        <HowItWorks />
        <IntegrationsSection />
        <CustomerStories />
      </main>
      <footer>
        <FooterCTA />
      </footer>
    </div>
  );
}
