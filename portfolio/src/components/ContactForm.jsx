import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Send, Mail, Phone, MapPin, Github } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [stars, setStars] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/repos/Deadcoder001/React-Personal-Portfolio')
      .then(res => res.json())
      .then(data => setStars(data.stargazers_count))
      .catch(() => setStars(null));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xrbwdkqb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _replyto: form.email,
          _subject: `Portfolio Contact: ${form.name}`,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      // Fallback to regular form submission
      e.target.closest('form')?.submit();
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden min-h-screen"
      style={{ background: 'radial-gradient(circle at 50% 30%, #0f172a 0%, #050811 100%)' }}
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 section-wrap py-20 md:py-32">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Work <span className="gradient-text" style={{WebkitTextFillColor: 'transparent'}}>Together</span>
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Have a project in mind? Let's build something amazing.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 max-w-4xl mx-auto">
          {/* Left - Contact Info (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="glass-card p-10 md:p-12">
              <h3 className="text-white text-lg font-bold mb-6">Contact Info</h3>
              <div className="space-y-5">
                <a href="mailto:kapil16072004@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">Email</p>
                    <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">kapil16072004@gmail.com</p>
                  </div>
                </a>
                <a href="tel:+917650965133" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">Phone</p>
                    <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">+91-7650965133</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">Location</p>
                    <p className="text-white/80 text-sm font-medium">Himachal Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Star Button */}
            <a
              href="https://github.com/Deadcoder001/React-Personal-Portfolio.git"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-8 flex items-center gap-3 hover:border-yellow-500/30 transition-all group"
            >
              <Github className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Star on GitHub</p>
                <p className="text-white/40 text-xs">If you like this portfolio!</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 rounded-full">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <span className="text-yellow-400 text-sm font-bold">{stars !== null ? stars : "--"}</span>
              </div>
            </a>
          </div>

          {/* Right - Contact Form (3 cols) */}
          <div className="md:col-span-3">
            <div className="glass-card p-12 md:p-16">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-white/50">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <label className="block text-white/60 text-sm font-medium mb-2" htmlFor="name">Your Name</label>
                    <input
                      className="input-glow"
                      placeholder="John Doe"
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-white/60 text-sm font-medium mb-2" htmlFor="email">Your Email</label>
                    <input
                      className="input-glow"
                      placeholder="john@example.com"
                      name="email"
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-white/60 text-sm font-medium mb-2" htmlFor="message">Your Message</label>
                    <textarea
                      className="input-glow min-h-[140px] resize-y"
                      placeholder="Tell me about your project..."
                      name="message"
                      id="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    className="w-full btn-premium btn-primary justify-center text-base"
                    type="submit"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}