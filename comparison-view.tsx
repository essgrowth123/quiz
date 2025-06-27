"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { OriginalPage } from "./original-page"
import { EnhancedPage } from "./enhanced-page"

export default function ComparisonView() {
  const [activeView, setActiveView] = useState<"original" | "enhanced">("original")

  return (
    <div className="min-h-screen">
      {/* Toggle Controls */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="flex justify-center items-center gap-4 py-4 px-6">
          <h2 className="text-lg font-semibold">Landing Page Comparison</h2>
          <div className="flex gap-2">
            <Button
              variant={activeView === "original" ? "default" : "outline"}
              onClick={() => setActiveView("original")}
              className="text-sm"
            >
              Before (Original)
            </Button>
            <Button
              variant={activeView === "enhanced" ? "default" : "outline"}
              onClick={() => setActiveView("enhanced")}
              className="text-sm"
            >
              After (Enhanced)
            </Button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="transition-all duration-300">
        {activeView === "original" ? <OriginalPage /> : <EnhancedPage />}
      </div>

      {/* Improvement Summary */}
      {activeView === "enhanced" && (
        <div className="bg-blue-50 border-t border-blue-200 p-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">✨ Key Improvements Added:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Trust & Credibility:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Social proof statistics in hero</li>
                  <li>• Client company logos</li>
                  <li>• Professional certifications</li>
                  <li>• Customer reviews with ratings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Risk Reduction:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• 100% satisfaction guarantee</li>
                  <li>• Security & privacy badges</li>
                  <li>• Specific risk-free promise</li>
                  <li>• Money-back guarantee details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
