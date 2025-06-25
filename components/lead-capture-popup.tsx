"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, TrendingUp, DollarSign, Target } from "lucide-react"
import { analytics } from "../lib/analytics"
import { PopupCTA, useABTestConversion } from "./cta-variants"

interface LeadCapturePopupProps {
  industry?: string
  isOpen: boolean
  onClose: () => void
}

export function LeadCapturePopup({ industry = "business", isOpen, onClose }: LeadCapturePopupProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { trackConversion } = useABTestConversion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return

    setIsSubmitting(true)

    // Track the popup conversion
    analytics.trackConversion(industry, "popup")
    trackConversion("popup_cta_test", "form_submit")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Send to webhook
    try {
      await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "popup_lead",
          name,
          email,
          industry,
          source: "popup",
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error("Webhook error:", error)
    }

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Auto close after success
    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
      setEmail("")
      setName("")
    }, 3000)
  }

  const handleCTAClick = () => {
    trackConversion("popup_cta_test", "click")
    window.open("https://calendly.com/essgrowth/30min", "_blank")
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border-orange-400/20 text-white">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">You're In! 🎉</h3>
            <p className="text-slate-300">
              Check your email for your free pricing guide and next steps to start charging what you're worth.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 border-orange-400/20 text-white p-0 overflow-hidden">
        {/* Header with close button */}
        <div className="relative">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 z-10 text-slate-400 hover:text-white hover:bg-slate-700/50"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Stop Leaving Money on the Table!</h2>
            <p className="text-orange-100 text-sm">
              Get the exact pricing strategies that helped 500+ {industry} professionals increase their rates by 40-60%
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-center">Learn Your Worth & Charge For It</h3>

            {/* Benefits */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-3 h-3 text-slate-900" />
                </div>
                <span className="text-sm text-slate-300">Free Pricing Confidence Guide (Value: $97)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-3 h-3 text-slate-900" />
                </div>
                <span className="text-sm text-slate-300">Industry-specific pricing benchmarks</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-3 h-3 text-slate-900" />
                </div>
                <span className="text-sm text-slate-300">Scripts to confidently raise your rates</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="popup-name" className="text-slate-300 text-sm">
                First Name
              </Label>
              <Input
                id="popup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div>
              <Label htmlFor="popup-email" className="text-slate-300 text-sm">
                Email Address
              </Label>
              <Input
                id="popup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400"
                placeholder="Enter your email address"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !email || !name}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold py-3 text-base"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Getting Your Guide...</span>
                </div>
              ) : (
                "Get My Free Pricing Guide"
              )}
            </Button>
          </form>

          {/* Alternative CTA */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400 mb-3">Or skip the guide and book your audit directly:</p>
            <PopupCTA onClick={handleCTAClick} industry={industry} />
          </div>

          {/* Trust indicators */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">🔒 Your information is secure. No spam, ever.</p>
            <p className="text-xs text-slate-500 mt-1">Join 2,847 professionals who've increased their income</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
