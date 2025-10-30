"use client"

import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

export function SketchbookCover() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Draw hand-drawn circle animation
    let progress = 0
    const animate = () => {
      if (progress < 1) {
        progress += 0.01
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw sketchy circles
        ctx.strokeStyle = "oklch(0.45 0.15 250 / 0.3)"
        ctx.lineWidth = 2

        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          const radius = 150 + i * 20
          const segments = 50
          for (let j = 0; j <= segments * progress; j++) {
            const angle = (j / segments) * Math.PI * 2
            const x = canvas.width / 2 + Math.cos(angle) * radius + Math.random() * 4 - 2
            const y = canvas.height / 2 + Math.sin(angle) * radius + Math.random() * 4 - 2
            if (j === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.stroke()
        }

        requestAnimationFrame(animate)
      }
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-balance">
            <span className="inline-block animate-[sketch-in_0.8s_ease-out]">Henri</span>
            <br />
            <span className="inline-block animate-[sketch-in_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
              Yan
            </span>
          </h1>

          <div className="relative inline-block">
            <p className="text-xl md:text-2xl text-muted-foreground animate-[sketch-in_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
              Waterloo Biomedical Engineering
            </p>
            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 10" preserveAspectRatio="none">
              <path
                d="M0,5 Q75,8 150,5 T300,5"
                fill="none"
                stroke="oklch(0.82 0.08 15)"
                strokeWidth="2"
                strokeDasharray="300"
                strokeDashoffset="300"
                className="animate-[draw-line_1s_ease-out_0.8s_forwards]"
              />
            </svg>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap animate-[sketch-in_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div className="px-6 py-3 border-2 border-primary rounded-sm rotate-[-1deg] hover:rotate-0 transition-transform cursor-pointer bg-background">
            <span className="font-mono text-sm">Builder</span>
          </div>
          <div className="px-6 py-3 border-2 border-accent rounded-sm rotate-[1deg] hover:rotate-0 transition-transform cursor-pointer bg-background">
            <span className="font-mono text-sm">Developer</span>
          </div>
          <div className="px-6 py-3 border-2 border-secondary rounded-sm rotate-[-0.5deg] hover:rotate-0 transition-transform cursor-pointer bg-background">
            <span className="font-mono text-sm">Designer</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </div>

      {/* Decorative sketchy corner */}
      <svg className="absolute top-4 right-4 w-24 h-24 opacity-30" viewBox="0 0 100 100">
        <path d="M10,10 L90,10 L90,90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
      </svg>
    </section>
  )
}
