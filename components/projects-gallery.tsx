"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const projects = [
  {
    title: "MEDGEM: AI Medical Data Analytics Assistant",
    description:
      "Medical research platform with React/Next.js frontend and Flask backend, supporting real-time AI-powered data analysis and hypothesis generation with automated Jupyter-based code execution",
    tags: ["React", "Next.js", "Flask", "Python", "Supabase", "Docker", "GCP"],
    color: "border-primary",
    rotation: "-rotate-1",
    github: "https://github.com/mireskandari/medgem",
    demo: null,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Medgem-NiG8jV73Zg4JUTfeZaAsBZEa3C6xVb.png",
  },
  {
    title: "AI Youtube Video Automation Agent",
    description:
      "Fully automated video production system using n8n (35+ nodes), orchestrating script generation, voice synthesis, image generation, video editing, and YouTube publishing with 100% hands-off execution",
    tags: ["n8n", "GCP", "JavaScript", "OAuth2", "AI Agents"],
    color: "border-accent",
    rotation: "rotate-1",
    github: null,
    demo: "https://www.youtube.com/shorts/1KGeB8K7JZ0",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/n8n%20Youtube%20Automation-aidB78S349J4IqAapchcWmrkGbhGof.png",
  },
  {
    title: "Hubspot Notifier Automation",
    description:
      "Deal notification system using n8n to intake deals from Hubspot's CRM, plot relevant information into Airtable, and use AI to create summaries. Final findings automatically sent to Slack channel",
    tags: ["n8n", "Hubspot", "Airtable", "Slack", "Webhooks"],
    color: "border-secondary",
    rotation: "-rotate-0.5",
    github: null,
    demo: null,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E7FMlVGwVQTUGmHVBUHjZrx52EZij0.png",
  },
  {
    title: "Wraps - Knot track finalist at HackMIT",
    description:
      "Personalized 'Spotify Wrapped'-style spending insights summary leveraging Knot's TransactionLink API with Anthropic's LLM for automated data categorization and context-aware financial summaries",
    tags: ["Next.js", "TypeScript", "Anthropic", "REST APIs", "Figma", "Vercel"],
    color: "border-primary",
    rotation: "rotate-0.5",
    github: "https://github.com/marcussleongg/wraps",
    demo: null,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wraps%20logo-zRQKhYWoBqwb70ByK0g6ClA59FvpKr.png",
  },
  {
    title: "Suzuki Motorcycle and Keyhole Tree Puzzle",
    description:
      "Created a 3D tree puzzle with an internal locking mechanism that falls apart when activated. Design was 3D printed using ZSuite, and an assembly manual was created using SolidWorks Composer. Also created a 3D motorcycle using SolidWorks assemblies",
    tags: ["SolidWorks", "SolidWorks Composer", "ZSuite", "3D Printing", "Engineering Drawings"],
    color: "border-accent",
    rotation: "-rotate-1",
    github: null,
    demo: "https://henriyanportfolio.vercel.app/",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Suzuki%20Motorcycle%20Project-k9jEIwiS8Oa37zoJ0tio1lFyWnyHRJ.png",
  },
]

export function ProjectsGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="min-h-screen py-20 px-4 container mx-auto">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section header with doodles */}
        <div className="text-center space-y-4">
          <div className="inline-block relative">
            <h2 className="text-5xl md:text-6xl font-bold">Projects</h2>
            <svg className="absolute -top-8 -right-12 w-20 h-20 text-accent" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
          <p className="text-xl text-muted-foreground font-mono">A collection of my favorite work</p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`p-6 border-2 ${project.color} ${project.rotation} hover:rotate-0 hover:scale-105 transition-all cursor-pointer group relative overflow-hidden`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Sketch overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <path
                    d="M10,10 L190,10 L190,190 L10,190 Z"
                    fill="none"
                    stroke="oklch(0.45 0.15 250 / 0.1)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>

              <div className="relative z-10 space-y-4">
                {/* Project thumbnail placeholder */}
                <div className="aspect-video bg-muted rounded-sm border-2 border-border flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                  <div className="relative z-10 w-full h-full p-4 flex items-center justify-center">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={225}
                      className={`object-contain w-full h-full transition-all duration-300 ${
                        hoveredIndex === index ? "scale-110" : "scale-100"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-balance">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-balance">{project.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono border border-border rounded-sm bg-background"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border-2 border-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-mono"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border-2 border-border rounded-sm hover:bg-accent transition-colors text-sm font-mono"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>

              {/* Corner fold effect */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-background border-l-2 border-b-2 border-border transform rotate-45 translate-x-4 -translate-y-4" />
            </Card>
          ))}
        </div>

        {/* Decorative tape */}
        <div className="flex justify-center gap-8 flex-wrap">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-24 h-8 bg-accent/30 border border-accent rotate-[-5deg] opacity-50"
              style={{ transform: `rotate(${i * 3 - 6}deg)` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
