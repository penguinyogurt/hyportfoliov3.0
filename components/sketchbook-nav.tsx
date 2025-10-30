"use client"

import { useState } from "react"
import { Menu, X, Home, Briefcase, Palette, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SketchbookNav() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[99999] bg-background/80 backdrop-blur-sm border-b-2 border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-primary rounded-sm rotate-[-3deg] flex items-center justify-center bg-accent">
              <span className="font-bold text-primary">HY</span>
            </div>
            <span className="font-mono text-sm hidden sm:inline">Henri Yan</span>
          </div>

          <div className="hidden md:flex gap-6">
            {[
              { icon: Home, label: "Home", id: "home" },
              { icon: Briefcase, label: "Projects", id: "projects" },
              { icon: Palette, label: "Skills", id: "skills" },
              { icon: Mail, label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-sm transition-colors group"
              >
                <item.icon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-mono">{item.label}</span>
              </button>
            ))}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[99998] bg-background/95 backdrop-blur-sm md:hidden pt-20">
          <div className="container mx-auto px-4 space-y-4">
            {[
              { icon: Home, label: "Home", id: "home" },
              { icon: Briefcase, label: "Projects", id: "projects" },
              { icon: Palette, label: "Skills", id: "skills" },
              { icon: Mail, label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-4 w-full px-6 py-4 border-2 border-border rounded-sm hover:bg-accent transition-colors"
              >
                <item.icon className="w-6 h-6" />
                <span className="text-lg font-mono">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
