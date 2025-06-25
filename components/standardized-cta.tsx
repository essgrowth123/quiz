"use client"

import { Button } from "@/components/ui/button"

interface StandardizedCTAProps {
  variant: "header" | "primary" | "form"
  onClick: () => void
  className?: string
  disabled?: boolean
}

export function StandardizedCTA({ variant, onClick, className = "", disabled = false }: StandardizedCTAProps) {
  const getButtonText = () => {
    switch (variant) {
      case "header":
        return "📞 BOOK MY FREE AUDIT – ($297 VALUE)"
      case "primary":
        return "📞 GET YOUR FREE SALES LEAK AUDIT"
      case "form":
        return "📩 GET MY FREE SALES BLUEPRINT"
      default:
        return "📞 GET YOUR FREE SALES LEAK AUDIT"
    }
  }

  const getButtonStyles = () => {
    const baseStyles = `
      bg-[#B02020] hover:bg-[#8B1818] active:bg-[#6B1212]
      text-white font-bold uppercase tracking-wide
      transition-all duration-200 ease-in-out
      hover:shadow-lg active:scale-[0.98]
      border-0 rounded-lg
      w-full sm:w-auto
    `

    switch (variant) {
      case "header":
        return `${baseStyles} px-4 py-2 text-sm`
      case "primary":
        return `${baseStyles} px-6 py-4 text-base sm:text-lg`
      case "form":
        return `${baseStyles} px-6 py-4 text-base w-full`
      default:
        return `${baseStyles} px-6 py-4 text-base`
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonStyles()} ${className}`}
      style={{
        fontFamily: "Oswald, sans-serif",
        fontWeight: "700",
      }}
    >
      {getButtonText()}
    </Button>
  )
}

// Specific CTA components for different positions
export function HeaderCTA({ onClick }: { onClick: () => void }) {
  return <StandardizedCTA variant="header" onClick={onClick} />
}

export function PrimaryCTA({ onClick, className }: { onClick: () => void; className?: string }) {
  return <StandardizedCTA variant="primary" onClick={onClick} className={className} />
}

export function FormCTA({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return <StandardizedCTA variant="form" onClick={onClick} disabled={disabled} />
}
