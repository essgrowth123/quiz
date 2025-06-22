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
