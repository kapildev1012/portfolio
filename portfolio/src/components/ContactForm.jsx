"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, ArrowUpRight, Activity, Cpu, Sparkles, Terminal, MessageSquare } from 'lucide-react';

const WHATSAPP_NUMBER = '917650965133';
const GITHUB_USERNAME = 'kapildev1012';

const TableRow = ({ label, index, id, type = "text", value, onChange, placeholder, isTextArea = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 border-t border-black/5 py-12 md:py-16 transition-all duration-700 items-start group">
      {/* Label Column */}
      <div className="md:col-span-3 flex flex-col gap-2 mb-6 md:mb-0">
        <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.4em]">Index_0{index}</span>
        <label 
          htmlFor={id}
          className="text-sm font-black uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors duration-500"
        >
          {label}
        </label>
      </div>

      {/* Input Column */}
      <div className="md:col-span-8 relative">
        {isTextArea ? (
          <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required
            className="w-full bg-transparent border-none outline-none text-black font-black text-2xl md:text-5xl placeholder:text-black/5 min-h-[160px] resize-none leading-tight tracking-tighter"
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required
            className="w-full bg-transparent border-none outline-none text-black font-black text-2xl md:text-5xl placeholder:text-black/5 leading-tight tracking-tighter"
          />
        )}
        
        {/* Dynamic Underline */}
        <div className={`absolute -bottom-4 left-0 h-[2px] bg-black transition-all duration-700 ease-out ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
      </div>

      {/* Action Hint */}
      <div className="md:col-span-1 flex justify-end opacity-0 group-hover:opacity-20 transition-opacity duration-500 pt-2">
        <ArrowUpRight size={32} strokeWidth={3} />
      </div>
    </div>
  );
};

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [stars, setStars] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/React-Personal-Portfolio-main`)
      .then(res => res.json())
      .then(data => setStars(data.stargazers_count))
      .catch(() => setStars(null));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp URL
    const text = `*SIGNAL_TRANSMISSION_RECEIVED*%0A%0A*Name:* ${form.name}%0A*Email:* ${form.email}%0A*Message:* ${form.message}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    // Confirmation UI
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative w-full py-48 md:py-80 bg-white text-black overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:60px_60px]" />

      <div className="relative z-10 section-wrap px-8 md:px-24 max-w-[100rem] mx-auto">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 md:mb-48">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 text-black/20 mb-8 font-black uppercase tracking-[0.8em] text-[10px]">
                <Terminal size={14} />
                04 — CONTACT_HUB
              </div>
              <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-[0.8] uppercase">
                Let's<br />Talk<span className="text-black/5 font-serif italic lowercase">.</span>
              </h2>
            </motion.div>

            <div className="flex flex-col items-start md:items-end gap-2 pr-4">
                <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.4em]">Direct_Channel</span>
                <span className="text-xl font-black group flex items-center gap-3 hover:translate-x-2 transition-transform cursor-pointer">
                    WhatsApp Signal
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </span>
            </div>
        </div>

        {/* Table Manifest */}
        <div className="border-b border-black/5">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-48 text-center"
                >
                  <Sparkles size={64} className="text-black mb-12" />
                  <h3 className="text-6xl font-black uppercase tracking-tighter mb-4">Done.</h3>
                  <p className="text-black/30 text-xl font-medium">Opening WhatsApp transmission...</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col"
                >
                  <TableRow 
                    index="1"
                    label="Identity" 
                    id="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Enter identifier..." 
                  />
                  <TableRow 
                    index="2"
                    label="Return_Channel" 
                    id="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="Enter communication node..." 
                  />
                  <TableRow 
                    index="3"
                    label="Signal_Details" 
                    id="message" 
                    value={form.message} 
                    onChange={handleChange} 
                    isTextArea
                    placeholder="Describe requirements..." 
                  />

                  {/* Manifest Footer: Action Row */}
                  <div 
                    className="grid grid-cols-1 md:grid-cols-12 items-center py-16 md:py-24 group border-t border-black/5 transition-all hover:bg-black/[0.01] cursor-pointer"
                    onClick={(e) => {
                      if (e.target.tagName !== 'BUTTON') {
                        const btn = e.currentTarget.querySelector('button');
                        if (btn) btn.click();
                      }
                    }}
                  >
                    <div className="md:col-span-3 mb-8 md:mb-0">
                        <span className="text-[10px] font-black text-black/10 uppercase tracking-[0.4em]">INITIATE // SIGNAL</span>
                    </div>
                    <div className="md:col-span-9 flex items-center justify-between">
                        <button
                          type="submit"
                          className="text-4xl md:text-7xl font-black uppercase tracking-tighter hover:translate-x-4 transition-transform text-left"
                        >
                          Send Signal
                        </button>
                        
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-black text-white flex items-center justify-center transition-all duration-700 group-hover:scale-110 shadow-2xl relative overflow-hidden">
                            <Send size={48} />
                        </div>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
        </div>

        {/* Technical Baseline */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-16 md:py-24">
            <div className="flex items-center gap-16">
                <div className="flex items-center gap-4">
                    <Activity size={16} className="text-black/40 animate-pulse" />
                    <span className="text-[10px] font-black text-black/30 tracking-[0.4em] uppercase">STATUS: ACTIVE</span>
                </div>
                <div className="flex items-center gap-4">
                    <Cpu size={16} className="text-black/20" />
                    <span className="text-[10px] font-black text-black/30 tracking-[0.4em] uppercase">UPTIME: 99.99%</span>
                </div>
            </div>

            <motion.a
                whileHover={{ y: -5 }}
                href={`https://github.com/${GITHUB_USERNAME}/React-Personal-Portfolio-main`}
                target="_blank"
                className="flex items-center gap-8 text-black/20 hover:text-black transition-all duration-700 group"
            >
                <div className="flex items-center gap-3">
                    <span className="text-sm font-black tracking-tight">{stars || '00'} REPO_NODES</span>
                </div>
                <div className="h-4 w-px bg-black/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">KAPIL DEV © 2026 // SIGNAL 2.2</span>
                <Github size={20} className="group-hover:rotate-[360deg] transition-transform duration-1000" />
            </motion.a>
        </div>

      </div>
    </section>
  );
}