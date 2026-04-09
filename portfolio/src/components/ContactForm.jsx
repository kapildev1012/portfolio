"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowUpRight, Sparkles } from 'lucide-react';

const WHATSAPP_NUMBER = '917650965133';

const SimpleRow = ({ label, id, type = "text", value, onChange, placeholder, isTextArea = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center border-t border-black/5 py-10 md:py-16 transition-all duration-700 group">
      {/* Label */}
      <div className="w-full md:w-1/4 mb-4 md:mb-0">
        <label
          htmlFor={id}
          className="text-xs font-black uppercase tracking-[0.4em] text-black/20 group-hover:text-black transition-colors duration-500"
        >
          {label}
        </label>
      </div>

      {/* Input Field */}
      <div className="w-full md:w-3/4 relative">
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
            className="w-full bg-transparent border-none outline-none text-black font-black text-lg md:text-5xl placeholder:text-black/5 min-h-[120px] resize-none leading-tight tracking-tighter"
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
            className="w-full bg-transparent border-none outline-none text-black font-black text-lg md:text-5xl placeholder:text-black/5 leading-tight tracking-tighter"
          />
        )}

        {/* Dynamic Underline */}
        <div className={`absolute -bottom-2 left-0 h-[3px] bg-black transition-all duration-700 ease-out ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
      </div>
    </div>
  );
};

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*SIGNAL_TRANSMISSION*%0A%0A*Name:* ${form.name}%0A*Email:* ${form.email}%0A*Message:* ${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative w-full bg-white text-black overflow-hidden">
      <div className="relative z-10 section-wrap px-8 md:px-24 max-w-7xl mx-auto">

        {/* Aesthetic Header */}
        <div className="mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <h2 className="text-4xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase flex flex-col md:flex-row md:items-baseline gap-4">
              Let's Talk <span className="text-black/5 italic font-serif lowercase translate-y-[-0.1em]">.</span>
            </h2>
            <p className="mt-8 text-black/40 text-base md:text-lg font-medium tracking-tight">Available for definitive digital collaborations.</p>
          </motion.div>
        </div>

        {/* Minimalist Manifest */}
        <div className="border-b border-black/5">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <Sparkles size={48} className="text-black mb-8" />
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Signal Sent.</h3>
                <p className="text-black/30 mt-4 text-base font-medium uppercase tracking-[0.2em]">Opening direct channel...</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col"
              >
                <SimpleRow
                  label="Your Name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Kapil Dev"
                />
                <SimpleRow
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hello@world.com"
                />
                <SimpleRow
                  label="Message"
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  isTextArea
                  placeholder="Tell me about your project_..."
                />

                {/* Submission Node */}
                <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24 gap-12 border-t border-black/5">
                  <p className="text-black/20 text-[10px] font-black uppercase tracking-[0.5em] max-w-[200px] leading-relaxed">
                    By sending this signal, you initiate a direct communication protocol.
                  </p>

                  <button
                    type="submit"
                    className="group flex items-center gap-8 md:gap-12 transition-transform active:scale-95"
                  >
                    <span className="text-xl sm:text-2xl md:text-7xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-700 text-left">
                      Send Transmission
                    </span>
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-black text-white flex items-center justify-center transition-all duration-700 group-hover:scale-110 shadow-2xl overflow-hidden active:rotate-12">
                      <ArrowUpRight size={40} className="stroke-[3]" />
                    </div>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Minimal Baseline */}
        <div className="py-16 text-center">
          <span className="text-[10px] font-black text-black/10 uppercase tracking-[0.8em]">
            © {new Date().getFullYear()} Kapil Dev // Minimalist Manifest
          </span>
        </div>

      </div>
    </section>
  );
}