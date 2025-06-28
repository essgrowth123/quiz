"use client"

import Navigation from "./Navigation"
import { EnhancedPage } from "../enhanced-page"

export default function BookPage() {
  return (
    <div>
      <Navigation />
      <div className="pt-0">
        <EnhancedPage />
      </div>
    </div>
  )
}
