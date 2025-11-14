import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Henri Yan",
  description: "Henri Yan's Portfolio",
  generator: "Next.js",
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: "Henri Yan",
    description: "Henri Yan's Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Henri Yan",
    description: "Henri Yan's Portfolio",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
