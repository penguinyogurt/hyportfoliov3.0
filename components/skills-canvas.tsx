"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface StickyNote {
  id: number
  name: string
  level: number
  category: string
  x: number
  y: number
  color: string
  rotation: number
  zIndex: number
}

const initialSkills: Omit<StickyNote, "id" | "x" | "y" | "rotation" | "zIndex">[] = [
  { name: "React", level: 90, category: "Frontend", color: "oklch(0.45 0.15 250)" },
  { name: "TypeScript", level: 85, category: "Language", color: "oklch(0.65 0.12 160)" },
  { name: "Next.js", level: 88, category: "Framework", color: "oklch(0.82 0.08 15)" },
  { name: "Python", level: 92, category: "Language", color: "oklch(0.55 0.18 40)" },
  { name: "C++", level: 80, category: "Language", color: "oklch(0.45 0.15 250)" },
  { name: "Figma", level: 87, category: "Design", color: "oklch(0.82 0.08 15)" },
  { name: "Git", level: 85, category: "Tools", color: "oklch(0.65 0.12 160)" },
  { name: "GCP", level: 88, category: "Cloud", color: "oklch(0.55 0.18 40)" },
  { name: "FastAPI", level: 85, category: "Backend", color: "oklch(0.45 0.15 250)" },
  { name: "n8n", level: 90, category: "Automation", color: "oklch(0.82 0.08 15)" },
]

export function SkillsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [notes, setNotes] = useState<StickyNote[]>([])
  const [dragging, setDragging] = useState<number | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [maxZIndex, setMaxZIndex] = useState(9999)

  useEffect(() => {
    if (containerRef.current && sectionRef.current) {
      const container = containerRef.current
      const section = sectionRef.current
      const containerRect = container.getBoundingClientRect()
      const sectionRect = section.getBoundingClientRect()

      const containerOffsetX = containerRect.left - sectionRect.left
      const containerOffsetY = containerRect.top - sectionRect.top

      const width = container.offsetWidth
      const height = 600

      const initializedNotes = initialSkills.map((skill, index) => ({
        ...skill,
        id: index,
        x: containerOffsetX + 100 + ((index % 4) * (width - 300)) / 3,
        y: containerOffsetY + 100 + (Math.floor(index / 4) * (height - 300)) / 2,
        rotation: Math.random() * 6 - 3,
        zIndex: 9999 + index,
      }))

      setNotes(initializedNotes)
      setMaxZIndex(9999 + initialSkills.length)
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    const note = notes.find((n) => n.id === id)
    if (!note) return

    setDragging(id)

    const newMaxZIndex = maxZIndex + 1
    setMaxZIndex(newMaxZIndex)
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, zIndex: newMaxZIndex } : n)))

    if (sectionRef.current) {
      const sectionRect = sectionRef.current.getBoundingClientRect()
      const relativeX = e.clientX - sectionRect.left
      const relativeY = e.clientY - sectionRect.top

      setOffset({
        x: relativeX - note.x,
        y: relativeY - note.y,
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging === null || !sectionRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const relativeX = e.clientX - sectionRect.left
      const relativeY = e.clientY - sectionRect.top

      setNotes((prev) =>
        prev.map((note) =>
          note.id === dragging ? { ...note, x: relativeX - offset.x, y: relativeY - offset.y } : note,
        ),
      )
    }

    const handleMouseUp = () => {
      setDragging(null)
    }

    if (dragging !== null) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging, offset])

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen py-20 px-4 container mx-auto relative">
      <div className="max-w-6xl mx-auto space-y-12 relative">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold relative inline-block">
            Skills & Tools
            <svg className="absolute -bottom-4 left-0 w-full h-6" viewBox="0 0 400 20" preserveAspectRatio="none">
              <path d="M0,10 L100,12 L200,8 L300,11 L400,9" fill="none" stroke="oklch(0.82 0.08 15)" strokeWidth="3" />
            </svg>
          </h2>
          <p className="text-xl text-muted-foreground font-mono"></p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full min-h-[600px] border-2 border-dashed border-border rounded-lg bg-muted/20"
          style={{ cursor: dragging !== null ? "grabbing" : "default" }}
        ></div>
      </div>

      {notes.map((note) => (
        <div
          key={note.id}
          className="absolute w-[200px] h-[150px] p-4 shadow-lg cursor-grab active:cursor-grabbing transition-shadow hover:shadow-xl"
          style={{
            left: note.x,
            top: note.y,
            backgroundColor: note.color,
            transform: `rotate(${note.rotation}deg)`,
            zIndex: dragging === note.id ? note.zIndex + 1 : note.zIndex,
          }}
          onMouseDown={(e) => handleMouseDown(e, note.id)}
        >
          {/* Sticky note tape effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-background/40 border border-border" />

          <div className="relative h-full flex flex-col justify-between text-background">
            <div>
              <h3 className="text-lg font-bold mb-1">{note.name}</h3>
              <span className="text-xs font-mono opacity-80">{note.category}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
