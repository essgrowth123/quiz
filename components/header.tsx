"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

/**
 * Main site header used across all pages.
 *
 * Features:
 * • Promo banner (can be hidden by removing the JSX).
 * • Responsive layout – logo left, CTA right on desktop, stacked on mobile.
 * • Re-usable <Header /> component – no props needed for now.
 */
export function Header() {
  return (
    <header className="w-full">
      {/* --- Promo banner -------------------------------------------------- */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center text-sm font-semibold py-2 px-4">
        🎆 JULY 4 SPECIAL – Save 10 % on All Services
        <span className="bg-white text-red-600 px-2 py-0.5 rounded font-black">JULY4</span>
      </div>

      {/* --- Main bar ------------------------------------------------------ */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <Image
              src="/ess-logo-light.png"
              alt="Engineered Success Sales logo"
              width={500}
              height={250}
              priority
              className="h-12 sm:h-16 w-auto"
            />
          </a>

          {/* CTA */}
          <Button
            onClick={() => window.open("https://calendly.com/essgrowth/30min", "_blank")}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-3 text-base sm:text-lg shadow-lg transition-transform active:scale-[0.97]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            📞 Talk With Us Now
          </Button>
        </div>
      </div>
    </header>
  )
}
