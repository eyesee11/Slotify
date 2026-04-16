"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronDown, Menu, X, Link as LinkIcon, Video, Tag, LayoutTemplate, 
  Plug, Smartphone, Globe, ShieldCheck, Lock,
  User, Users, Building, Target, Megaphone, CheckCircle2, UserPlus,
  GraduationCap, Monitor, CircleDollarSign, Briefcase
} from "lucide-react";
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
        <div className="hidden lg:flex items-center gap-2 bg-white/50 backdrop-blur-[2px] border border-gray-200/50 rounded-[2rem] px-2 py-1 shadow-sm relative">
          
          {/* PRODUCT DROPDOWN */}
          <div className="group relative">
            <button className="flex items-center text-[15px] font-medium text-slate-700 hover:text-[#0069FF] px-4 py-2 rounded-full transition-colors hover:bg-white">
              Product <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-10 -left-10 pt-6 hidden group-hover:block w-max z-50">
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 flex overflow-hidden w-[650px]">
                
                <div className="flex-1 p-8">
                  <p className="text-[15px] text-slate-500 mb-6">Product</p>
                  <div className="flex flex-col gap-6">
                    <Link href="#" className="flex gap-4 group/item items-start">
                      <div className="bg-blue-50 text-blue-600 rounded-lg p-2.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <LinkIcon size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Scheduling</div>
                        <div className="text-[13px] text-slate-500 mt-0.5">Simplified booking</div>
                      </div>
                    </Link>
                    <Link href="#" className="flex gap-4 group/item items-start">
                      <div className="bg-blue-50 text-blue-600 rounded-lg p-2.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <Video size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Notetaker</div>
                        <div className="text-[13px] text-slate-500 mt-0.5">Meeting recaps and action items</div>
                      </div>
                    </Link>
                    <Link href="#" className="flex gap-4 group/item items-start">
                      <div className="bg-blue-50 text-blue-600 rounded-lg p-2.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <Tag size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Payments</div>
                        <div className="text-[13px] text-slate-500 mt-0.5">Flexible ways to get paid</div>
                      </div>
                    </Link>
                    <Link href="#" className="flex gap-4 group/item items-start">
                      <div className="bg-blue-50 text-blue-600 rounded-lg p-2.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <LayoutTemplate size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Product overview</div>
                        <div className="text-[13px] text-slate-500 mt-0.5">Why choose Calendly</div>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="w-[280px] bg-slate-50 border-l border-slate-100 p-8">
                  <p className="text-[15px] text-slate-500 mb-6">Platform</p>
                  <div className="flex flex-col gap-5">
                    <Link href="#" className="flex items-center gap-3 text-slate-700 font-semibold hover:text-blue-600 text-[15px]">
                      <Plug size={20} className="text-slate-600" /> Integrations
                    </Link>
                    <Link href="#" className="flex items-center gap-3 text-slate-700 font-semibold hover:text-blue-600 text-[15px]">
                      <Smartphone size={20} className="text-slate-600" /> Mobile app
                    </Link>
                    <Link href="#" className="flex items-center gap-3 text-slate-700 font-semibold hover:text-blue-600 text-[15px]">
                      <Globe size={20} className="text-slate-600" /> Browser extension
                    </Link>
                    <Link href="#" className="flex items-center gap-3 text-slate-700 font-semibold hover:text-blue-600 text-[15px]">
                      <ShieldCheck size={20} className="text-slate-600" /> Admin controls
                    </Link>
                    <Link href="#" className="flex items-center gap-3 text-slate-700 font-semibold hover:text-blue-600 text-[15px]">
                      <Lock size={20} className="text-slate-600" /> Security
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SOLUTIONS DROPDOWN */}
          <div className="group relative">
            <button className="flex items-center text-[15px] font-medium text-slate-700 hover:text-[#0069FF] px-4 py-2 rounded-full transition-colors hover:bg-white">
              Solutions <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-10 -left-64 pt-6 hidden group-hover:block w-max z-50">
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 flex p-8 gap-12 w-[900px]">
                
                {/* Column 1 */}
                <div className="flex-1">
                  <p className="text-[15px] text-slate-500 mb-6">By business size</p>
                  <div className="flex flex-col gap-6">
                    <Link href="#" className="flex gap-4 group/item items-start">
                      <div className="bg-blue-50 text-blue-600 rounded-lg p-2.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Individuals</div>
                        <div className="text-[13px] text-slate-500 mt-0.5">For solopreneurs</div>
                      </div>
                    </Link>
                    <Link href="#" className="flex gap-4 group/item items-start">
                      <div className="bg-blue-50 text-blue-600 rounded-lg p-2.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Small business</div>
                        <div className="text-[13px] text-slate-500 mt-0.5">For growing businesses</div>
                      </div>
                    </Link>
                    <Link href="#" className="flex gap-4 group/item items-start">
                      <div className="bg-blue-50 text-blue-600 rounded-lg p-2.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <Building size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Large companies</div>
                        <div className="text-[13px] text-slate-500 mt-0.5">For enterprise</div>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="w-px bg-slate-100 my-4" />

                {/* Column 2 */}
                <div className="w-[220px]">
                  <p className="text-[15px] text-slate-500 mb-6">By team</p>
                  <div className="flex flex-col gap-6">
                    <Link href="#" className="flex gap-3 items-center text-slate-900 font-semibold hover:text-blue-600 text-[15px]">
                      <Target size={20} className="text-slate-600" /> Sales
                    </Link>
                    <Link href="#" className="flex gap-3 items-center text-slate-900 font-semibold hover:text-blue-600 text-[15px]">
                      <Megaphone size={20} className="text-slate-600" /> Marketing
                    </Link>
                    <Link href="#" className="flex gap-3 items-center text-slate-900 font-semibold hover:text-blue-600 text-[15px]">
                      <CheckCircle2 size={20} className="text-slate-600" /> Customer success
                    </Link>
                    <Link href="#" className="flex gap-3 items-center text-slate-900 font-semibold hover:text-blue-600 text-[15px]">
                      <UserPlus size={20} className="text-slate-600" /> Recruiting
                    </Link>
                  </div>
                </div>

                <div className="w-px bg-slate-100 my-4" />

                {/* Column 3 */}
                <div className="w-[240px]">
                  <p className="text-[15px] text-slate-500 mb-6">By industry</p>
                  <div className="flex flex-col gap-6">
                    <Link href="#" className="flex gap-3 items-center text-slate-900 font-semibold hover:text-blue-600 text-[15px]">
                      <GraduationCap size={20} className="text-slate-600" /> Education
                    </Link>
                    <Link href="#" className="flex gap-3 items-center text-slate-900 font-semibold hover:text-blue-600 text-[15px]">
                      <Monitor size={20} className="text-slate-600" /> Technology
                    </Link>
                    <Link href="#" className="flex gap-3 items-center text-slate-900 font-semibold hover:text-blue-600 text-[15px]">
                      <CircleDollarSign size={20} className="text-slate-600" /> Financial Services
                    </Link>
                    <Link href="#" className="flex gap-3 items-center text-slate-900 font-semibold hover:text-blue-600 text-[15px]">
                      <Briefcase size={20} className="text-slate-600" /> Professional Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RESOURCES DROPDOWN */}
          <div className="group relative">
            <button className="flex items-center text-[15px] font-medium text-slate-700 hover:text-[#0069FF] px-4 py-2 rounded-full transition-colors hover:bg-white">
              Resources <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-10 -left-[450px] pt-6 hidden group-hover:block w-max z-50">
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 p-8 flex gap-8 w-[1000px] justify-between">
                
                {/* Column 1 */}
                <div className="flex-1">
                  <p className="text-[15px] text-slate-500 mb-6">Get started</p>
                  <div className="flex flex-col gap-6">
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Learning hub</div>
                      <div className="text-[13px] text-slate-500 mt-1">Structured paths and guides</div>
                    </Link>
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Developer docs</div>
                      <div className="text-[13px] text-slate-500 mt-1">Build with Calendly API</div>
                    </Link>
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Product tour</div>
                      <div className="text-[13px] text-slate-500 mt-1">See Calendly in action</div>
                    </Link>
                  </div>
                </div>

                <div className="w-px bg-slate-100 my-4" />

                {/* Column 2 */}
                <div className="flex-1">
                  <p className="text-[15px] text-slate-500 mb-6">Discover</p>
                  <div className="flex flex-col gap-6">
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Blog</div>
                      <div className="text-[13px] text-slate-500 mt-1">Tips and best practices</div>
                    </Link>
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Ebooks & webinars</div>
                      <div className="text-[13px] text-slate-500 mt-1">Expert insights</div>
                    </Link>
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">About us</div>
                      <div className="text-[13px] text-slate-500 mt-1">Discover our mission</div>
                    </Link>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="flex-1 pt-[46px]">
                  <div className="flex flex-col gap-6">
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">What&apos;s new</div>
                      <div className="text-[13px] text-slate-500 mt-1">Product updates</div>
                    </Link>
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Customer stories</div>
                      <div className="text-[13px] text-slate-500 mt-1">Calendly success stories</div>
                    </Link>
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Newsroom</div>
                      <div className="text-[13px] text-slate-500 mt-1">Company news and press</div>
                    </Link>
                  </div>
                </div>

                <div className="w-px bg-slate-100 my-4" />

                {/* Column 4 */}
                <div className="flex-1">
                  <p className="text-[15px] text-slate-500 mb-6">Support</p>
                  <div className="flex flex-col gap-6">
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Help center</div>
                      <div className="text-[13px] text-slate-500 mt-1">Search articles and FAQs</div>
                    </Link>
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Community</div>
                      <div className="text-[13px] text-slate-500 mt-1">Connect with other users</div>
                    </Link>
                    <Link href="#" className="group/item">
                      <div className="font-semibold text-slate-900 text-[15px] group-hover/item:text-blue-600">Contact us</div>
                      <div className="text-[13px] text-slate-500 mt-1">Connect with support</div>
                    </Link>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Pricing */}
          <Link href="#" className="flex items-center text-[15px] font-medium text-slate-700 hover:text-[#0069FF] px-4 py-2 rounded-full transition-colors hover:bg-white">
            Pricing
          </Link>
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
              {["Product", "Solutions", "Resources", "Pricing"].map(item => (
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
