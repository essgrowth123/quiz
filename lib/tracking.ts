// Enhanced tracking utilities for remarketing
export class TrackingService {
  private static instance: TrackingService
  private userId: string | null = null
  private sessionId: string
  private visitData: any = {}

  constructor() {
    this.sessionId = this.generateSessionId()
    this.loadVisitorData()
  }

  static getInstance(): TrackingService {
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService()
    }
    return TrackingService.instance
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private loadVisitorData() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ess_visitor_data")
      if (stored) {
        try {
          this.visitData = JSON.parse(stored)
        } catch (e) {
          console.warn("Failed to load visitor data:", e)
        }
      }
    }
  }

  private saveVisitorData() {
    if (typeof window !== "undefined") {
      localStorage.setItem("ess_visitor_data", JSON.stringify(this.visitData))
    }
  }

  // Track page visits for remarketing
  trackPageView(page: string, additionalData?: any) {
    const visitData = {
      page,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      referrer: typeof window !== "undefined" ? document.referrer : "",
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
      ...additionalData,
    }

    // Update visit history
    if (!this.visitData.visits) this.visitData.visits = []
    this.visitData.visits.push(visitData)
    this.visitData.lastVisit = Date.now()
    this.visitData.totalVisits = (this.visitData.totalVisits || 0) + 1

    this.saveVisitorData()

    // Send to Facebook Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any).fbq("track", "PageView", {
        content_name: `ESS ${page} Page`,
        content_category: "Sales Training",
        custom_parameter_1: page,
      })
    }

    // Send to Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "page_view", {
        page_title: `ESS ${page} Landing Page`,
        page_location: window.location.href,
        custom_parameter_1: page,
      })
    }

    console.log("📊 Page tracked for remarketing:", visitData)
  }

  // Track form submissions for high-intent remarketing
  trackFormSubmission(page: string, formData: any) {
    const submissionData = {
      page,
      formData,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    }

    // Update visitor profile
    this.visitData.hasSubmittedForm = true
    this.visitData.lastFormSubmission = Date.now()
    this.visitData.formSubmissions = (this.visitData.formSubmissions || 0) + 1
    this.visitData.leadScore = this.calculateLeadScore()

    this.saveVisitorData()

    // Facebook Pixel - Lead event
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any).fbq("track", "Lead", {
        content_name: `ESS ${page} Form`,
        content_category: "Sales Training",
        value: 100, // Assign value to leads
        currency: "USD",
      })
    }

    // Google Analytics - Conversion
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "generate_lead", {
        event_category: "engagement",
        event_label: page,
        value: 100,
      })
    }

    console.log("📊 Form submission tracked for remarketing:", submissionData)
  }

  // Calculate lead score for remarketing segmentation
  private calculateLeadScore(): number {
    let score = 0

    // Base score for visiting
    score += 10

    // Multiple visits
    if (this.visitData.totalVisits > 1) score += 20
    if (this.visitData.totalVisits > 3) score += 30

    // Form submission
    if (this.visitData.hasSubmittedForm) score += 50

    // Multiple form submissions
    if (this.visitData.formSubmissions > 1) score += 25

    // Recent activity (within 7 days)
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    if (this.visitData.lastVisit > weekAgo) score += 15

    return Math.min(score, 100) // Cap at 100
  }

  // Get visitor data for remarketing
  getVisitorProfile() {
    return {
      ...this.visitData,
      sessionId: this.sessionId,
      leadScore: this.calculateLeadScore(),
    }
  }

  // Create remarketing audiences
  getRemarketingSegment(): string {
    const score = this.calculateLeadScore()
    const hasSubmitted = this.visitData.hasSubmittedForm
    const visits = this.visitData.totalVisits || 0

    if (hasSubmitted && score > 80) return "hot-leads"
    if (hasSubmitted) return "warm-leads"
    if (visits > 2) return "engaged-visitors"
    if (visits > 1) return "return-visitors"
    return "new-visitors"
  }
}

export const tracking = TrackingService.getInstance()
