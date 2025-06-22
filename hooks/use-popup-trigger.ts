"use client"

import { useState, useEffect } from "react"

interface PopupTriggerOptions {
  delay?: number // milliseconds
  scrollPercentage?: number // 0-100
  exitIntent?: boolean
  timeOnPage?: number // seconds
}

export function usePopupTrigger(options: PopupTriggerOptions = {}) {
  const [shouldShow, setShouldShow] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  const {
    delay = 15000, // 15 seconds default
    scrollPercentage = 50, // 50% scroll default
    exitIntent = true,
    timeOnPage = 30, // 30 seconds default
  } = options

  useEffect(() => {
    if (hasShown) return

    let timeoutId: NodeJS.Timeout
    let scrollListener: () => void
    let mouseListener: (e: MouseEvent) => void

    // Time-based trigger
    if (delay > 0) {
      timeoutId = setTimeout(() => {
        if (!hasShown) {
          setShouldShow(true)
          setHasShown(true)
        }
      }, delay)
    }

    // Scroll-based trigger
    if (scrollPercentage > 0) {
      scrollListener = () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        if (scrolled >= scrollPercentage && !hasShown) {
          setShouldShow(true)
          setHasShown(true)
        }
      }
      window.addEventListener("scroll", scrollListener)
    }

    // Exit intent trigger
    if (exitIntent) {
      mouseListener = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasShown) {
          setShouldShow(true)
          setHasShown(true)
        }
      }
      document.addEventListener("mouseleave", mouseListener)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (scrollListener) window.removeEventListener("scroll", scrollListener)
      if (mouseListener) document.removeEventListener("mouseleave", mouseListener)
    }
  }, [delay, scrollPercentage, exitIntent, hasShown])

  const closePopup = () => {
    setShouldShow(false)
  }

  const resetPopup = () => {
    setHasShown(false)
    setShouldShow(false)
  }

  return {
    shouldShow,
    closePopup,
    resetPopup,
    hasShown,
  }
}
