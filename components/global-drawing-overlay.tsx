"use client"

import { useEffect, useState } from "react"

interface Splatter {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  imageIndex: number
}

export function GlobalDrawingOverlay() {
  const [splatters, setSplatters] = useState<Splatter[]>([])
  const [nextId, setNextId] = useState(0)

  const splatterImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-removebg-preview-0w4CTuKxkoudForxYwhmKlc8aAmVzB.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-removebg-preview-XW12d5huU3OUoKooX0BUbr9yRKrFSF.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-removebg-preview-7jI11Hd1XPIO6OvR5KqPXvhzwMNCFO.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-removebg-preview-9Ww17TFToRVoibqxKEhXKBlKFNwZGN.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled_design__1_-removebg-preview-er7QdJgMGz4nebMaqD4iTmy9XtraVV.png",
  ]

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if clicking on interactive elements
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input")
      ) {
        return
      }

      const newSplatter: Splatter = {
        id: nextId,
        x: e.pageX,
        y: e.pageY,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.7,
        imageIndex: Math.floor(Math.random() * splatterImages.length),
      }

      setSplatters((prev) => [...prev, newSplatter])
      setNextId((prev) => prev + 1)
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [nextId, splatterImages.length])

  return (
    <>
      {splatters.map((splatter) => (
        <div
          key={splatter.id}
          className="absolute pointer-events-none z-0"
          style={{
            left: splatter.x,
            top: splatter.y,
            transform: `translate(-50%, -50%) rotate(${splatter.rotation}deg) scale(${splatter.scale})`,
          }}
        >
          <img
            src={splatterImages[splatter.imageIndex] || "/placeholder.svg"}
            alt=""
            className="w-32 h-32 object-contain opacity-70 drop-shadow-sm"
          />
        </div>
      ))}
    </>
  )
}
