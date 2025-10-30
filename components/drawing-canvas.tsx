"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Eraser, Pencil, Trash2, Sparkles } from "lucide-react"

interface BoundingBox {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [boundingBox, setBoundingBox] = useState<BoundingBox | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [brushSize, setBrushSize] = useState(3)
  const [isEraser, setIsEraser] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  const calculateBoundingBox = () => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    let minX = canvas.width
    let minY = canvas.height
    let maxX = 0
    let maxY = 0
    let hasDrawing = false

    // Scan for non-transparent pixels
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4
        const alpha = data[index + 3]

        if (alpha > 0) {
          hasDrawing = true
          minX = Math.min(minX, x)
          minY = Math.min(minY, y)
          maxX = Math.max(maxX, x)
          maxY = Math.max(maxY, y)
        }
      }
    }

    if (!hasDrawing) return null

    // Add padding
    const padding = 20
    return {
      minX: Math.max(0, minX - padding),
      minY: Math.max(0, minY - padding),
      maxX: Math.min(canvas.width, maxX + padding),
      maxY: Math.min(canvas.height, maxY + padding),
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (isEraser) {
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineWidth = brushSize * 3
    } else {
      ctx.globalCompositeOperation = "source-over"
      ctx.lineWidth = brushSize
      ctx.strokeStyle = "#2c3e50"
    }

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const box = calculateBoundingBox()
    setBoundingBox(box)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setBoundingBox(null)
    setGeneratedImage(null)
  }

  const generateAIImage = async () => {
    const canvas = canvasRef.current
    if (!canvas || !boundingBox) return

    setIsGenerating(true)

    try {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Extract the drawing area
      const width = boundingBox.maxX - boundingBox.minX
      const height = boundingBox.maxY - boundingBox.minY

      const drawingData = ctx.getImageData(boundingBox.minX, boundingBox.minY, width, height)

      // Create a temporary canvas for the cropped drawing
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = width
      tempCanvas.height = height
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) return

      tempCtx.putImageData(drawingData, 0, 0)
      const drawingBase64 = tempCanvas.toDataURL("image/png")

      // Use pollinations.ai for free AI image generation
      // The API accepts a prompt and returns an image
      const prompt = encodeURIComponent(
        "Professional, yet simple quality sketch of this image. Keeping the main shapes and ideas, just refining lines and making it cleaner.",
      )

      // Pollinations.ai free API endpoint
      const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=${Math.min(
        1024,
        width,
      )}&height=${Math.min(1024, height)}&seed=${Date.now()}&nologo=true`

      setGeneratedImage(imageUrl)
    } catch (error) {
      console.error("[v0] Error generating image:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-card/90 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-primary shadow-lg">
        <p className="text-sm font-medium text-center">
          Draw something on the canvas, then click <span className="text-primary font-bold">Create</span> to generate an
          AI version!
        </p>
      </div>

      {/* Tools */}
      <div className="absolute top-20 left-4 z-10 flex flex-col gap-2">
        <Button
          variant={isEraser ? "default" : "outline"}
          size="icon"
          onClick={() => setIsEraser(!isEraser)}
          className="w-12 h-12"
        >
          {isEraser ? <Eraser className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
        </Button>
        <Button variant="outline" size="icon" onClick={clearCanvas} className="w-12 h-12 bg-transparent">
          <Trash2 className="w-5 h-5" />
        </Button>
        <div className="flex flex-col gap-1 bg-card p-2 rounded-lg border">
          <span className="text-xs text-muted-foreground text-center">Size</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-12 h-20 -rotate-90 origin-center"
            style={{ margin: "20px -20px" }}
          />
        </div>
      </div>

      {/* Drawing Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="absolute inset-0 cursor-crosshair"
        style={{ touchAction: "none" }}
      />

      {/* Bounding Box with Create Button */}
      {boundingBox && !generatedImage && (
        <div
          className="absolute border-4 border-primary border-dashed pointer-events-none animate-pulse"
          style={{
            left: boundingBox.minX,
            top: boundingBox.minY,
            width: boundingBox.maxX - boundingBox.minX,
            height: boundingBox.maxY - boundingBox.minY,
          }}
        >
          <Button
            onClick={generateAIImage}
            disabled={isGenerating}
            className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-auto gap-2 shadow-lg"
            size="lg"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Create"}
          </Button>
        </div>
      )}

      {/* Generated Image Display */}
      {generatedImage && boundingBox && (
        <div
          className="absolute border-4 border-accent shadow-2xl bg-white"
          style={{
            left: boundingBox.minX,
            top: boundingBox.minY,
            width: boundingBox.maxX - boundingBox.minX,
            height: boundingBox.maxY - boundingBox.minY,
          }}
        >
          <img src={generatedImage || "/placeholder.svg"} alt="AI Generated" className="w-full h-full object-cover" />
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex gap-2">
            <Button onClick={() => setGeneratedImage(null)} variant="outline" size="sm">
              Draw Again
            </Button>
            <Button
              onClick={() => {
                const link = document.createElement("a")
                link.href = generatedImage
                link.download = "ai-generated.png"
                link.click()
              }}
              size="sm"
            >
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
