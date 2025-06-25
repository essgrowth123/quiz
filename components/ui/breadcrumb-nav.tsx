"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav className="bg-white-smoke border-b border-gray-200">
      <div className="container mx-auto container-padding">
        <div className="flex items-center space-x-2 py-4 text-sm">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 text-steel-grey mx-2 opacity-60" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-steel-grey hover:text-ess-blue transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-black-charcoal font-semibold">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
