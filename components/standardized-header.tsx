"use client"

import Image from "next/image"
import { HeaderCTA } from "./standardized-cta"

export function StandardizedHeader() {
  const handleHeaderCTAClick = () => {
    window.open("https://calendly.com/essgrowth/30min", "_blank")
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - centered on mobile, left-aligned on desktop */}
          <div className="flex justify-center flex-1 sm:flex-initial sm:justify-start">
            <Image
              src="/ess-logo-light.png"
              alt="Engineered Success Sales"
              width={400}
              height={200}
              className="h-10 sm:h-12 md:h-14 w-auto max-w-full"
              priority
            />
          </div>

          {/* CTA Button - hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:block">
            <HeaderCTA onClick={handleHeaderCTAClick} />
          </div>
        </div>
      </div>
    </header>
  )
}
