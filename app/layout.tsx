import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "E.S.S.",
  description: "Elite Sales Solutions - Professional Landing Pages",
  generator: "v0.dev",
  icons: {
    icon: "/ess-logo-dark.png",
    shortcut: "/ess-logo-dark.png",
    apple: "/ess-logo-dark.png",
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
