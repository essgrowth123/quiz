"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function BackToIndustries() {
  return (
    <div className="container mx-auto container-padding py-4">
      <Button variant="outline" asChild className="mb-4">
        <Link href="/#industries" className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Industries</span>
        </Link>
      </Button>
    </div>
  )
}
