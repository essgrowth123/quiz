"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

interface BookingButtonProps {
  children: React.ReactNode
  className?: string
}

export function BookingButton({ children, className }: BookingButtonProps) {
  const scrollToCalendly = () => {
    const calendlySection = document.getElementById("calendly-embed")
    if (calendlySection) {
      calendlySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Button
      size="xl"
      className={`bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ${className || ""}`}
      onClick={scrollToCalendly}
    >
      {children}
    </Button>
  )
}
