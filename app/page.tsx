import { SketchbookCover } from "@/components/sketchbook-cover"
import { SketchbookNav } from "@/components/sketchbook-nav"
import { AboutPage } from "@/components/about-page"
import { ProjectsGallery } from "@/components/projects-gallery"
import { SkillsCanvas } from "@/components/skills-canvas"
import { ContactSketch } from "@/components/contact-sketch"
import { GlobalDrawingOverlay } from "@/components/global-drawing-overlay"

export default function Home() {
  return (
    <>
      <GlobalDrawingOverlay />
      <main className="relative z-10 min-h-screen">
        <SketchbookNav />
        <SketchbookCover />
        <AboutPage />
        <ProjectsGallery />
        <SkillsCanvas />
        <ContactSketch />
      </main>
    </>
  )
}
