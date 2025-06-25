"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface CTAVariantProps {
  variant?: "control" | "emotional" | "urgency"
  size?: "default" | "lg" | "sm"
  className?: string
  onClick: () => void
  industry?: string
  position?: "hero" | "below-fold" | "popup" | "header"
}

export function CTAVariant({
  variant = "control",
  size = "default",
  className = "",
  onClick,
  industry = "business",
  position = "hero",
}: CTAVariantProps) {
  const [selectedVariant, setSelectedVariant] = useState<"control" | "emotional" | "urgency">("control")

  const determineVariant = () => {
    // A/B test distribution: 70% control, 15% emotional, 15% urgency
    const random = Math.random()
    let testVariant: "control" | "emotional" | "urgency"

    if (position === "header") {
      // Headers always use control variant
      testVariant = "control"
    } else if (position === "popup") {
      // Popups use urgency variant
      testVariant = "urgency"
    } else if (position === "below-fold") {
      // Below fold uses emotional variant
      testVariant = "emotional"
    } else {
      // Hero sections use A/B distribution
      if (random < 0.7) {
        testVariant = "control"
      } else if (random < 0.85) {
        testVariant = "emotional"
      } else {
        testVariant = "urgency"
      }
    }

    return variant || testVariant
  }

  const trackVariantShown = (testVariant: "control" | "emotional" | "urgency") => {
    if (typeof window !== "undefined") {
      // Google Analytics event
      if ((window as any).gtag) {
        ;(window as any).gtag("event", "cta_variant_shown", {
          event_category: "ab_test",
          event_label: `${testVariant}_${position}_${industry}`,
          custom_parameter_1: testVariant,
          custom_parameter_2: position,
          custom_parameter_3: industry,
        })
      }

      // Facebook Pixel
      if ((window as any).fbq) {
        ;(window as any).fbq("trackCustom", "CTAVariantShown", {
          variant: testVariant,
          position: position,
          industry: industry,
        })
      }
    }
  }

  const handleClick = () => {
    // Track CTA click with variant info
    if (typeof window !== "undefined") {
      // Google Analytics
      if ((window as any).gtag) {
        ;(window as any).gtag("event", "cta_click", {
          event_category: "ab_test",
          event_label: `${selectedVariant}_${position}_${industry}`,
          custom_parameter_1: selectedVariant,
          custom_parameter_2: position,
          custom_parameter_3: industry,
          value: 297, // Track the audit value
        })
      }

      // Facebook Pixel
      if ((window as any).fbq) {
        ;(window as any).fbq("track", "Lead", {
          content_name: "Sales Audit CTA",
          content_category: selectedVariant,
          value: 297,
          currency: "USD",
          custom_data: {
            variant: selectedVariant,
            position: position,
            industry: industry,
          },
        })
      }
    }

    onClick()
  }

  const getButtonText = () => {
    switch (selectedVariant) {
      case "control":
        return "Book My Free Audit – ($297 Value)"

      case "emotional":
        // Vary by industry for better targeting
        switch (industry) {
          case "blue-collar":
          case "hvac":
          case "automotive":
            return "Fix My Sales Flow – Book the Audit"
          case "real-estate":
            return "Stop Losing Listings – Book My Audit"
          case "dentist":
          case "medical":
            return "Fill My Schedule – Book the Audit"
          case "home-cleaning":
          case "car-detailing":
            return "Get Recurring Clients – Book My Audit"
          default:
            return "Let's Find the Leak – Book My Audit"
        }

      case "urgency":
        return "Unlock My $297 Sales Leak Audit – Free Today"

      default:
        return "Book My Free Audit – ($297 Value)"
    }
  }

  const getButtonIcon = () => {
    switch (selectedVariant) {
      case "control":
        return "📞"
      case "emotional":
        return "🔧"
      case "urgency":
        return "⚡"
      default:
        return "📞"
    }
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-4 text-base sm:text-lg",
    lg: "px-8 py-4 text-lg",
  }

  const selectedVariantValue = determineVariant()

  useState(() => {
    setSelectedVariant(selectedVariantValue)
    trackVariantShown(selectedVariantValue)
  }, [variant, position, industry])

  return (
    <Button
      onClick={handleClick}
      className={`bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold shadow-lg transition-transform active:scale-[0.97] w-full sm:w-auto ${sizeClasses[size]} ${className}`}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {getButtonIcon()} {getButtonText()}
    </Button>
  )
}

// Specific CTA components for different positions
export function HeroCTA({ onClick, industry }: { onClick: () => void; industry?: string }) {
  return <CTAVariant onClick={onClick} industry={industry} position="hero" size="lg" />
}

export function BelowFoldCTA({ onClick, industry }: { onClick: () => void; industry?: string }) {
  return <CTAVariant onClick={onClick} industry={industry} position="below-fold" size="lg" />
}

export function HeaderCTA({ onClick }: { onClick: () => void }) {
  return <CTAVariant onClick={onClick} position="header" size="sm" variant="control" />
}

export function PopupCTA({ onClick, industry }: { onClick: () => void; industry?: string }) {
  return <CTAVariant onClick={onClick} industry={industry} position="popup" size="default" variant="urgency" />
}

/* ---------- A/B-testing helpers ---------- */

import { useEffect } from "react"

/**
 * Tracks that a visitor has been bucketed into a specific test/variant.
 */
export function ABTestTracker({
  testName,
  variant,
  industry,
  position,
}: {
  testName: string
  variant: string
  industry: string
  position: string
}) {
  useEffect(() => {
    const key = `ab_test_${testName}_${position}`
    sessionStorage.setItem(key, variant)

    if (typeof window !== "undefined") {
      if ((window as any).gtag) {
        ;(window as any).gtag("event", "ab_test_participate", {
          event_category: "experimentation",
          event_label: `${testName}_${variant}`,
          test_name: testName,
          variant,
          industry,
          position,
        })
      }
      if ((window as any).fbq) {
        ;(window as any).fbq("trackCustom", "ABTestParticipate", {
          test_name: testName,
          variant,
          industry,
          position,
        })
      }
    }
  }, [testName, variant, industry, position])

  return null
}

/**
 * Hook to log conversions (clicks, bookings, form submits) with variant context.
 */
export function useABTestConversion() {
  const trackConversion = (testName: string, conversionType: "click" | "booking" | "form_submit") => {
    const keyPrefix = `ab_test_${testName}`
    // Try hero first, fallback to any stored key
    const variant =
      sessionStorage.getItem(`${keyPrefix}_hero`) ||
      [...sessionStorage.keys()]
        .find((k) => k.startsWith(keyPrefix))
        ?.split("_")
        .pop() ||
      "unknown"

    if (typeof window !== "undefined") {
      if ((window as any).gtag) {
        ;(window as any).gtag("event", "ab_test_conversion", {
          event_category: "experimentation",
          event_label: `${testName}_${variant}_${conversionType}`,
          test_name: testName,
          variant,
          conversion_type: conversionType,
          value: conversionType === "booking" ? 297 : 1,
        })
      }
      if ((window as any).fbq) {
        ;(window as any).fbq("trackCustom", "ABTestConversion", {
          test_name: testName,
          variant,
          conversion_type: conversionType,
          value: conversionType === "booking" ? 297 : 1,
          currency: "USD",
        })
      }
    }
  }

  return { trackConversion }
}
