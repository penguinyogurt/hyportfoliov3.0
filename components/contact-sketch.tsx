"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Github, Linkedin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSketch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-4 container mx-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header with doodles */}
        <div className="text-center space-y-4 relative">
          <svg
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 text-accent opacity-30"
            viewBox="0 0 100 100"
          >
            <path
              d="M50,20 L80,50 L50,80 L20,50 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
          <h2 className="text-5xl md:text-6xl font-bold relative z-10">Let's Connect</h2>
          <p className="text-xl text-muted-foreground font-mono">Drop me a message or find me online</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="space-y-6">
            <div className="p-8 border-2 border-border rounded-sm bg-card rotate-[-0.5deg] hover:rotate-0 transition-transform">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-mono flex items-center gap-2">
                    <span className="text-primary">→</span> Your Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="border-2 border-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-mono flex items-center gap-2">
                    <span className="text-primary">→</span> Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="border-2 border-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-mono flex items-center gap-2">
                    <span className="text-primary">→</span> Your Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="border-2 border-border focus:border-primary transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 font-mono group"
                >
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Decorative sticky note */}
            <div className="p-4 bg-accent border-2 border-border rounded-sm rotate-[1deg] text-center">
              <p className="font-mono text-sm">💡 Usually reply within 24 hours!</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Email card */}
            <a
              href="mailto:hlyan@uwaterloo.ca"
              className="block p-6 border-2 border-primary rounded-sm bg-card rotate-[0.5deg] hover:rotate-0 hover:scale-105 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-mono text-muted-foreground">Email</p>
                  <p className="font-bold">hlyan@uwaterloo.ca</p>
                </div>
              </div>
            </a>

            {/* Social links */}
            <div className="space-y-4">
              <h3 className="font-mono text-sm text-muted-foreground">Find me on here</h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://github.com/penguinyogurt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-primary rounded-sm hover:bg-accent transition-all group flex flex-col items-center gap-2 rotate-[0.5deg]"
                >
                  <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/henri-yan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-accent rounded-sm hover:bg-accent transition-all group flex flex-col items-center gap-2 rotate-[-0.5deg]"
                >
                  <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Availability card */}
            <div className="p-6 border-2 border-border rounded-sm bg-card rotate-[-0.5deg]">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-mono text-sm">Available for work</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed text-balance">
                   Let's create something amazing together!
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="flex gap-4 justify-center">
              {["⭐", "✨", "🎨", "🚀"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-12 h-12 border-2 border-border rounded-sm flex items-center justify-center hover:rotate-12 transition-transform cursor-pointer"
                  style={{ transform: `rotate(${i * 5 - 10}deg)` }}
                >
                  <span className="text-xl">{emoji}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-12 border-t-2 border-border">
          <p className="font-mono text-sm text-muted-foreground">Designed & Built with ❤️ • 2025</p>
          <div className="mt-4 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-2 h-2 bg-primary rounded-full" style={{ opacity: 0.2 * i }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
