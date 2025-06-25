"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    // Set a timeout to show the modal after 20 seconds
    const timeoutId = setTimeout(() => {
      if (!hasTriggered) {
        setIsVisible(true)
        setHasTriggered(true)
      }
    }, 20000)

    // Track mouse movement for exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if the mouse is leaving from the top of the page
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true)
        setHasTriggered(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hasTriggered])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-2xl font-bold mb-4 font-['Oswald']">💡 Before You Go...</h3>

        <p className="text-[#4F4F4F] mb-6">Want a free audit of your lead flow before this window closes?</p>

        <a
          href="/book"
          className="block w-full py-3 px-4 bg-[#B02020] hover:bg-[#8C1A1A] text-white text-center font-bold rounded-md transition-colors duration-300 font-['Oswald'] uppercase"
        >
          Yes – Show Me What I'm Missing
        </a>
      </div>
    </div>
  )
}
