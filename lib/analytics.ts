// Analytics tracking service for ESS landing pages
export interface ConversionEvent {
  page:
    | "blue-collar"
    | "ford"
    | "limo"
    | "real-estate"
    | "hvac"
    | "medical"
    | "dentist"
    | "dog-walker"
    | "home-cleaning"
    | "dog-training"
    | "car-detailing"
    | "personal-trainer"
    | "barber"
  event: "page_view" | "form_submit" | "calendly_click" | "form_error"
  timestamp: number
  userAgent?: string
  referrer?: string
  formData?: {
    name?: string
    email?: string
    company?: string
    phone?: string
    dealership?: string
    limoService?: string
    brokerage?: string
    practice?: string
    business?: string
  }
}

class AnalyticsService {
  private events: ConversionEvent[] = []
  private sessionId: string

  constructor() {
    this.sessionId = this.generateSessionId()
    this.loadStoredEvents()
  }

  private generateSessionId(): string {
    return `ess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private loadStoredEvents() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ess_analytics")
      if (stored) {
        try {
          this.events = JSON.parse(stored)
        } catch (e) {
          console.warn("Failed to load stored analytics:", e)
        }
      }
    }
  }

  private saveEvents() {
    if (typeof window !== "undefined") {
      localStorage.setItem("ess_analytics", JSON.stringify(this.events))
    }
  }

  track(event: Omit<ConversionEvent, "timestamp">) {
    const fullEvent: ConversionEvent = {
      ...event,
      timestamp: Date.now(),
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
      referrer: typeof window !== "undefined" ? document.referrer : undefined,
    }

    this.events.push(fullEvent)
    this.saveEvents()

    // Send to external analytics if configured
    this.sendToExternalAnalytics(fullEvent)

    console.log("📊 ESS Analytics:", fullEvent)
  }

  private sendToExternalAnalytics(event: ConversionEvent) {
    // Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", event.event, {
        page_title: `ESS ${event.page} Landing Page`,
        page_location: window.location.href,
        custom_parameter_1: event.page,
        session_id: this.sessionId,
      })
    }

    // Facebook Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any).fbq("track", event.event === "form_submit" ? "Lead" : "PageView", {
        content_name: `ESS ${event.page} Page`,
        content_category: "Sales Training",
      })
    }

    // Custom webhook for your CRM/database
    if (event.event === "form_submit") {
      this.sendToWebhook(event)
    }
  }

  private async sendToWebhook(event: ConversionEvent) {
    console.log("🚀 WEBHOOK DEBUG - Event received:", event)

    try {
      // Send simple key-value pairs that Zapier loves
      const webhookData = {
        name: event.formData?.name || "Unknown",
        email: event.formData?.email || "No Email",
        phone:
          event.formData?.dealership ||
          event.formData?.limoService ||
          event.formData?.brokerage ||
          event.formData?.practice ||
          event.formData?.company ||
          event.formData?.business ||
          "Not Provided",
        business_type: this.getBusinessType(event.page),
        industry: this.getIndustry(event.page),
        lead_source: this.getLeadSource(event.page),
        referrer: event.referrer || "Direct",
        lead_score: this.calculateLeadScore(event),
        calendly_clicked: "No",
        session_id: this.sessionId,
        date_submitted: new Date(event.timestamp).toLocaleDateString(),
        follow_up_date: this.getFollowUpDate(),
        time_on_page: this.calculateTimeOnPage(event.timestamp),
        status: "New Lead",
        notes: `Lead from ${event.page} page`,
        user_agent: event.userAgent?.substring(0, 50) || "Unknown",
      }

      console.log("🚀 WEBHOOK DEBUG - Sending array data:", webhookData)

      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      console.log("🚀 WEBHOOK DEBUG - API response status:", response.status)

      if (response.ok) {
        console.log("✅ WEBHOOK SUCCESS!")
      } else {
        const errorData = await response.json()
        console.error("❌ WEBHOOK API ERROR:", errorData)
      }
    } catch (error) {
      console.error("❌ WEBHOOK ERROR:", error)
    }
  }

  private getBusinessType(page: string): string {
    switch (page) {
      case "ford":
        return "Car Dealership"
      case "limo":
        return "Limo Service"
      case "blue-collar":
        return "Blue-Collar Business"
      case "real-estate":
        return "Real Estate"
      case "hvac":
        return "HVAC Company"
      case "medical":
        return "Medical Practice"
      case "dentist":
        return "Dental Practice"
      case "dog-walker":
        return "Pet Services"
      case "home-cleaning":
        return "Cleaning Service"
      case "dog-training":
        return "Dog Training"
      case "car-detailing":
        return "Car Detailing"
      case "personal-trainer":
        return "Personal Training"
      case "barber":
        return "Barbershop"
      default:
        return "Unknown"
    }
  }

  private getIndustry(page: string): string {
    switch (page) {
      case "ford":
        return "Automotive"
      case "limo":
        return "Transportation"
      case "blue-collar":
        return "Construction/Trade"
      case "real-estate":
        return "Real Estate"
      case "hvac":
        return "HVAC"
      case "medical":
        return "Healthcare"
      case "dentist":
        return "Healthcare"
      case "dog-walker":
        return "Pet Services"
      case "home-cleaning":
        return "Home Services"
      case "dog-training":
        return "Pet Services"
      case "car-detailing":
        return "Automotive"
      case "personal-trainer":
        return "Fitness"
      case "barber":
        return "Personal Care"
      default:
        return "Other"
    }
  }

  private getLeadSource(page: string): string {
    switch (page) {
      case "ford":
        return "Ford Page"
      case "limo":
        return "Limo Page"
      case "blue-collar":
        return "Blue-Collar Page"
      case "real-estate":
        return "Real Estate Page"
      case "hvac":
        return "HVAC Page"
      case "medical":
        return "Medical Page"
      case "dentist":
        return "Dentist Page"
      case "dog-walker":
        return "Dog Walker Page"
      case "home-cleaning":
        return "Home Cleaning Page"
      case "dog-training":
        return "Dog Training Page"
      case "car-detailing":
        return "Car Detailing Page"
      case "personal-trainer":
        return "Personal Trainer Page"
      case "barber":
        return "Barber Page"
      default:
        return "Unknown Page"
    }
  }

  private calculateLeadScore(event: ConversionEvent): string {
    if (event.event === "form_submit") {
      return event.formData?.name && event.formData?.email ? "Hot" : "Warm"
    }
    return "Cold"
  }

  private getFollowUpDate(): string {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Skip weekends
    if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1) // Skip Sunday
    if (tomorrow.getDay() === 6) tomorrow.setDate(tomorrow.getDate() + 2) // Skip Saturday

    return tomorrow.toISOString().split("T")[0] // Return YYYY-MM-DD format
  }

  private calculateTimeOnPage(timestamp: number): string {
    const sessionStart = Number.parseInt(this.sessionId.split("_")[1])
    const timeOnPage = Math.round((timestamp - sessionStart) / 1000)
    return `${timeOnPage} seconds`
  }

  getConversionStats() {
    const stats = {
      "blue-collar": { views: 0, submissions: 0, conversionRate: 0 },
      ford: { views: 0, submissions: 0, conversionRate: 0 },
      limo: { views: 0, submissions: 0, conversionRate: 0 },
      "real-estate": { views: 0, submissions: 0, conversionRate: 0 },
      hvac: { views: 0, submissions: 0, conversionRate: 0 },
      medical: { views: 0, submissions: 0, conversionRate: 0 },
      dentist: { views: 0, submissions: 0, conversionRate: 0 },
      "dog-walker": { views: 0, submissions: 0, conversionRate: 0 },
      "home-cleaning": { views: 0, submissions: 0, conversionRate: 0 },
      "dog-training": { views: 0, submissions: 0, conversionRate: 0 },
      "car-detailing": { views: 0, submissions: 0, conversionRate: 0 },
      "personal-trainer": { views: 0, submissions: 0, conversionRate: 0 },
      barber: { views: 0, submissions: 0, conversionRate: 0 },
    }

    this.events.forEach((event) => {
      if (event.event === "page_view") {
        stats[event.page].views++
      } else if (event.event === "form_submit") {
        stats[event.page].submissions++
      }
    })

    // Calculate conversion rates
    Object.keys(stats).forEach((page) => {
      const pageStats = stats[page as keyof typeof stats]
      pageStats.conversionRate =
        pageStats.views > 0 ? Math.round((pageStats.submissions / pageStats.views) * 100 * 100) / 100 : 0
    })

    return stats
  }

  exportData() {
    return {
      sessionId: this.sessionId,
      events: this.events,
      stats: this.getConversionStats(),
      exportedAt: new Date().toISOString(),
    }
  }
}

export const analytics = new AnalyticsService()
