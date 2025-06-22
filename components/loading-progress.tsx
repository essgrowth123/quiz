"use client"

import { useEffect, useState } from "react"
import { RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LoadingProgressProps {
  progress: number
  className?: string
  hasError?: boolean
  onRetry?: () => void
  errorMessage?: string
}

export function LoadingProgress({
  progress,
  className = "",
  hasError = false,
  onRetry,
  errorMessage = "Loading failed. Please try again.",
}: LoadingProgressProps) {
  const [displayProgress, setDisplayProgress] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    if (!hasError) {
      // Smooth progress animation
      const timer = setTimeout(() => {
        setDisplayProgress(progress)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [progress, hasError])

  const handleRetry = () => {
    if (onRetry) {
      setIsRetrying(true)
      setDisplayProgress(0)
      onRetry()

      // Reset retry state after a brief delay
      setTimeout(() => {
        setIsRetrying(false)
      }, 1000)
    }
  }

  if (hasError) {
    return (
      <div className={`w-full ${className}`}>
        {/* Error State */}
        <div className="text-center space-y-4 p-6 bg-red-50 rounded-lg border border-red-200">
          <div className="flex justify-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold" style={{ color: "#003366", fontFamily: "Oswald, sans-serif" }}>
              Loading Failed
            </h3>
            <p className="text-sm" style={{ color: "#666666", fontFamily: "Roboto, sans-serif" }}>
              {errorMessage}
            </p>
          </div>

          <Button
            onClick={handleRetry}
            disabled={isRetrying}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            style={{ fontFamily: "Montserrat, sans-serif", backgroundColor: "#003366" }}
          >
            {isRetrying ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </>
            )}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar Container */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${displayProgress}%`,
            background: "linear-gradient(90deg, #003366 0%, #FFCC00 100%)",
          }}
        />
      </div>

      {/* Progress Text */}
      <div className="flex justify-between items-center text-sm">
        <span style={{ color: "#666666", fontFamily: "Roboto, sans-serif" }}>
          {isRetrying ? "Retrying..." : "Loading ESS..."}
        </span>
        <span className="font-semibold" style={{ color: "#003366", fontFamily: "Montserrat, sans-serif" }}>
          {Math.round(displayProgress)}%
        </span>
      </div>
    </div>
  )
}
