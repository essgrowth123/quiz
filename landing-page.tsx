"use client"

import type React from "react"
import { LeadCapturePopup } from "./components/lead-capture-popup"
import { usePopupTrigger } from "./hooks/use-popup-trigger"
import { Header } from "@/components/header"

const LandingPage: React.FC = () => {
  const { shouldShow, closePopup } = usePopupTrigger({
    delay: 20000, // Show after 20 seconds
    scrollPercentage: 60, // Or when user scrolls 60%
    exitIntent: true, // Or on exit intent
  })

  return (
    <div>
      <Header />
      <h1>Welcome to our Landing Page!</h1>
      <p>This is a sample landing page.</p>

      <LeadCapturePopup industry="blue-collar" isOpen={shouldShow} onClose={closePopup} />
    </div>
  )
}

export default LandingPage
