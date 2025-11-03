"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

export function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-[sketch-in_0.8s_ease-out]", "[animation-fill-mode:forwards]")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".observe-me")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" ref={sectionRef} className="relative z-10 min-h-screen py-20 px-4 container mx-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Sketchy header */}
        <div className="relative observe-me opacity-0">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Hello, I'm
            <br />
            <span className="relative inline-block">
              Henri Yan
              <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 400 20" preserveAspectRatio="none">
                <path d="M0,10 Q100,5 200,10 T400,10" fill="none" stroke="oklch(0.45 0.15 250)" strokeWidth="3" />
              </svg>
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground font-mono mt-4">Biomedical Engineering @ UWaterloo</p>
        </div>

        {/* Bio with doodles */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 observe-me opacity-0">
            <div className="relative p-6 border-2 border-border rounded-sm rotate-[-0.5deg] bg-card">
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-accent rounded-full border-2 border-border flex items-center justify-center rotate-12">
                <span className="text-2xl">🩺</span>
              </div>
              <p className="text-lg leading-relaxed text-balance">
                I'm a Biomedical Engineering student passionate about building innovative solutions! From AI automations to full-stack web applications, I love bringing ideas
                to life.
              </p>
            </div>

            <div className="relative p-6 border-2 border-border rounded-sm rotate-[0.5deg] bg-card">
              <p className="text-lg leading-relaxed text-balance">Currently searching for Winter 2026 opportunities!</p>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-primary rounded-sm rotate-45" />
            </div>
          </div>

          {/* This is the Skills summary*/}
          
          <div className="space-y-4 observe-me opacity-0">
            {[
              { emoji: "💻", text: "Full-stack development", color: "bg-accent" },
              { emoji: "🤖", text: "AI & Automation", color: "bg-primary/10" },
              { emoji: "🔬", text: "Research & Innovation", color: "bg-secondary/30" },
              { emoji: "🏆", text: "Hackathons!", color: "bg-accent" },
            ].map((note, i) => (
              <div
                key={i}
                className={`p-6 border-2 border-border rounded-sm ${note.color} rotate-[${i % 2 === 0 ? "1" : "-1"}deg] hover:rotate-0 hover:scale-105 transition-all cursor-pointer shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{note.emoji}</span>
                  <span className="font-mono text-lg">{note.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact buttons */}
        <div className="flex flex-wrap gap-4 justify-center observe-me opacity-0">
          <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
            <a href="mailto:hlyan@uwaterloo.ca">
              <Mail className="w-4 h-4" />
              Email Me
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
            <a href="https://github.com/penguinyogurt" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
            <a href="https://www.linkedin.com/in/henri-yan/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </Button>
        </div>

        {/* Hand-drawn arrow */}
        <div className="flex justify-center observe-me opacity-0">
          <svg className="w-32 h-32 text-muted-foreground" viewBox="0 0 100 100">
            <path
              d="M20,20 Q50,40 50,70 M50,70 L40,60 M50,70 L60,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
