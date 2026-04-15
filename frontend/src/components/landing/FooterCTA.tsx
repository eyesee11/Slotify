"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SlotifyLogo } from "./Logo";

export const FooterCTA = () => (
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
