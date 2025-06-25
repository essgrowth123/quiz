"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white section-spacing">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Final CTA */}
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold">Ready to Stop Losing Leads?</h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Book your free sales audit and discover exactly where your leads are slipping through the cracks.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 w-full sm:w-auto"
              asChild
            >
              <Link href="/book">📞 Book My Free Audit – ($297 Value)</Link>
            </Button>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-400">© 2024 Engineered Success Sales. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
