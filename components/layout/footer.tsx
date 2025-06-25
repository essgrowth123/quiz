"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black-charcoal text-white homepage-section">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Final CTA */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold font-oswald">Ready to Stop Losing Leads?</h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Book your free sales audit and discover exactly where your leads are slipping through the cracks.
            </p>
            <Link href="/book" className="btn-primary text-lg px-8 py-4 inline-block btn-mobile-full">
              📞 Book My Free Audit – ($297 Value)
            </Link>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-700">
            <p className="text-gray-400">© 2024 Engineered Success Sales. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
