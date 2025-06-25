"use client"

import { useEffect } from "react"
import { analytics } from "../lib/analytics"

export function useConversionTracking(
  page:
    | "blue-collar"
    | "ford"
    | "limo"
    | "real-estate"
    | "hvac"
    | "medical"
    | "dentist"
    | "dog-walker"
    | "home-cleaning"
    | "dog-training"
    | "car-detailing"
    | "personal-trainer"
    | "barber",
) {
  useEffect(() => {
    // Track page view
    analytics.track({
      page,
      event: "page_view",
    })
  }, [page])

  const trackFormSubmit = (formData: { name: string; email: string; [key: string]: string }) => {
    analytics.track({
      page,
      event: "form_submit",
      formData,
    })
  }

  const trackCalendlyClick = () => {
    analytics.track({
      page,
      event: "calendly_click",
    })

    // Track the actual Calendly URL
    if (typeof window !== "undefined") {
      // Facebook Pixel
      if ((window as any).fbq) {
        ;(window as any).fbq("track", "Schedule", {
          content_name: "ESS 30-Minute Sales Leak Audit",
          value: 0,
          currency: "USD",
        })
      }

      // Google Analytics
      if ((window as any).gtag) {
        ;(window as any).gtag("event", "calendly_booking_click", {
          event_category: "engagement",
          event_label: page,
          value: 1,
        })
      }
    }
  }

  const trackFormError = (error: string) => {
    analytics.track({
      page,
      event: "form_error",
      formData: { error },
    })
  }

  return {
    trackFormSubmit,
    trackCalendlyClick,
    trackFormError,
  }
}
