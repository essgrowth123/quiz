import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "E.S.S.",
  description: "Elite Sales Solutions - Professional Landing Pages",
  generator: "v0.dev",
  icons: {
    icon: "/ess-logo-light.png",
    shortcut: "/ess-logo-light.png",
    apple: "/ess-logo-light.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
