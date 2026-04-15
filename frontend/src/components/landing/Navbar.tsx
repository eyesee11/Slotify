"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { SlotifyLogo } from "./Logo";

export const Navbar = () => {
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
