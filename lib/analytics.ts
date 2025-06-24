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

export interface PageCategory {
  id: string
  name: string
  color: string
  icon: string
  description?: string
}

export interface PromotedPage {
  pageName: string
  categoryId: string
  promotedAt: number
  customIcon?: string
}

export interface MediaContent {
  type: "video" | "photo" | "gallery"
  title: string
  description: string
  placeholder: string
  section: "hero" | "features" | "testimonials" | "process" | "gallery" | "team" | "footer"
}

export interface CategoryTemplate {
  id: string
  categoryId: string
  name: string
  description: string
  heroTitle: string
  heroSubtitle: string
  ctaText: string
  features: string[]
  testimonialText: string
  testimonialAuthor: string
  colorScheme: {
    primary: string
    secondary: string
    accent: string
  }
  mediaContent: MediaContent[]
  clientBranding?: {
    companyName: string
    logo?: string
    colors?: {
      primary: string
      secondary: string
    }
  }
  tags: string[]
  isPublic: boolean
  createdAt: number
  updatedAt: number
  version: number
}

export interface BulkOperation {
  id: string
  type: "generate" | "export" | "customize"
  templates: string[]
  settings: {
    pageNames?: string[]
    clientBranding?: {
      companyName: string
      colors?: { primary: string; secondary: string }
    }
    outputFormat?: "tsx" | "zip" | "github"
  }
  status: "pending" | "processing" | "completed" | "failed"
  createdAt: number
  results?: string[]
}

class AnalyticsService {
  private events: ConversionEvent[] = []
  private sessionId: string
  private promotedPages: Map<string, PromotedPage> = new Map()
  private categories: Map<string, PageCategory> = new Map()
  private templates: Map<string, CategoryTemplate> = new Map()
  private bulkOperations: Map<string, BulkOperation> = new Map()

  constructor() {
    this.sessionId = this.generateSessionId()
    this.loadStoredEvents()
    this.loadPromotedPages()
    this.loadCategories()
    this.loadTemplates()
    this.loadBulkOperations()
    this.initializeDefaultCategories()
    this.initializeDefaultTemplates()
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

  private loadPromotedPages() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ess_promoted_pages")
      if (stored) {
        try {
          const pages = JSON.parse(stored)
          this.promotedPages = new Map(pages.map((p: PromotedPage) => [p.pageName, p]))
        } catch (e) {
          console.warn("Failed to load promoted pages:", e)
        }
      }
    }
  }

  private loadCategories() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ess_categories")
      if (stored) {
        try {
          const categories = JSON.parse(stored)
          this.categories = new Map(categories.map((c: PageCategory) => [c.id, c]))
        } catch (e) {
          console.warn("Failed to load categories:", e)
        }
      }
    }
  }

  private loadTemplates() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ess_templates")
      if (stored) {
        try {
          const templates = JSON.parse(stored)
          this.templates = new Map(templates.map((t: CategoryTemplate) => [t.id, t]))
        } catch (e) {
          console.warn("Failed to load templates:", e)
        }
      }
    }
  }

  private loadBulkOperations() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ess_bulk_operations")
      if (stored) {
        try {
          const operations = JSON.parse(stored)
          this.bulkOperations = new Map(operations.map((op: BulkOperation) => [op.id, op]))
        } catch (e) {
          console.warn("Failed to load bulk operations:", e)
        }
      }
    }
  }

  private initializeDefaultCategories() {
    const defaultCategories: PageCategory[] = [
      {
        id: "automotive",
        name: "Automotive",
        color: "bg-blue-500",
        icon: "🚗",
        description: "Car dealerships, detailing, and automotive services",
      },
      {
        id: "healthcare",
        name: "Healthcare",
        color: "bg-green-500",
        icon: "🏥",
        description: "Medical practices, dental offices, and health services",
      },
      {
        id: "home-services",
        name: "Home Services",
        color: "bg-orange-500",
        icon: "🏠",
        description: "HVAC, cleaning, and home improvement services",
      },
      {
        id: "personal-services",
        name: "Personal Services",
        color: "bg-purple-500",
        icon: "✂️",
        description: "Barbers, personal trainers, and lifestyle services",
      },
      {
        id: "pet-services",
        name: "Pet Services",
        color: "bg-yellow-500",
        icon: "🐕",
        description: "Dog walking, training, and pet care services",
      },
      {
        id: "real-estate",
        name: "Real Estate",
        color: "bg-indigo-500",
        icon: "🏢",
        description: "Real estate agencies and property services",
      },
      {
        id: "transportation",
        name: "Transportation",
        color: "bg-gray-500",
        icon: "🚐",
        description: "Limo services and transportation companies",
      },
      {
        id: "trades",
        name: "Trades & Construction",
        color: "bg-red-500",
        icon: "🔧",
        description: "Blue-collar businesses and construction services",
      },
      {
        id: "other",
        name: "Other",
        color: "bg-gray-400",
        icon: "📄",
        description: "Miscellaneous and uncategorized pages",
      },
    ]

    // Only add default categories if they don't exist
    defaultCategories.forEach((category) => {
      if (!this.categories.has(category.id)) {
        this.categories.set(category.id, category)
      }
    })

    this.saveCategories()
  }

  private initializeDefaultTemplates() {
    const defaultTemplates: CategoryTemplate[] = [
      {
        id: "automotive-dealership",
        categoryId: "automotive",
        name: "Car Dealership Template",
        description: "Professional template for car dealerships with inventory showcase",
        heroTitle: "Find Your Perfect Vehicle Today",
        heroSubtitle:
          "Browse our extensive inventory of quality pre-owned and new vehicles with competitive financing options.",
        ctaText: "Browse Inventory",
        features: [
          "Extensive vehicle inventory",
          "Competitive financing options",
          "Expert service department",
          "Trade-in evaluations",
          "Extended warranties available",
        ],
        testimonialText:
          "Outstanding service and great deals! The team helped me find exactly what I was looking for within my budget.",
        testimonialAuthor: "Sarah Johnson, Happy Customer",
        colorScheme: {
          primary: "blue-600",
          secondary: "blue-100",
          accent: "orange-500",
        },
        mediaContent: [
          {
            type: "video",
            title: "Dealership Tour",
            description: "Virtual tour of our showroom and service center",
            placeholder: "Add video of dealership walkthrough showing inventory, service bays, and customer areas here",
            section: "hero",
          },
          {
            type: "gallery",
            title: "Vehicle Inventory",
            description: "High-quality photos of available vehicles",
            placeholder: "Add photo gallery of current vehicle inventory with multiple angles and interior shots here",
            section: "features",
          },
          {
            type: "video",
            title: "Customer Testimonials",
            description: "Real customers sharing their experiences",
            placeholder:
              "Add video of satisfied customers discussing their car buying experience and service quality here",
            section: "testimonials",
          },
          {
            type: "photo",
            title: "Service Team",
            description: "Meet our certified technicians",
            placeholder: "Add photo of service team in uniform with certifications and awards displayed here",
            section: "team",
          },
        ],
        tags: ["automotive", "dealership", "sales", "service"],
        isPublic: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
      {
        id: "healthcare-practice",
        categoryId: "healthcare",
        name: "Medical Practice Template",
        description: "Clean, professional template for medical practices and clinics",
        heroTitle: "Comprehensive Healthcare You Can Trust",
        heroSubtitle: "Providing exceptional medical care with a personal touch. Schedule your appointment today.",
        ctaText: "Book Appointment",
        features: [
          "Board-certified physicians",
          "State-of-the-art facilities",
          "Comprehensive health screenings",
          "Same-day appointments available",
          "Insurance accepted",
        ],
        testimonialText:
          "The staff is incredibly professional and caring. I always feel heard and well taken care of during my visits.",
        testimonialAuthor: "Dr. Michael Chen, Patient",
        colorScheme: {
          primary: "green-600",
          secondary: "green-100",
          accent: "blue-500",
        },
        mediaContent: [
          {
            type: "video",
            title: "Facility Tour",
            description: "Tour of our modern medical facility",
            placeholder:
              "Add video of clean, modern medical facility showing exam rooms, waiting areas, and advanced equipment here",
            section: "hero",
          },
          {
            type: "photo",
            title: "Medical Team",
            description: "Our board-certified physicians and staff",
            placeholder:
              "Add photo of medical team in professional attire with credentials and specialties listed here",
            section: "team",
          },
          {
            type: "video",
            title: "Patient Care Process",
            description: "What to expect during your visit",
            placeholder:
              "Add video explaining the patient journey from check-in to treatment with emphasis on comfort and care here",
            section: "process",
          },
          {
            type: "gallery",
            title: "Modern Equipment",
            description: "State-of-the-art medical technology",
            placeholder:
              "Add photo gallery of advanced medical equipment and technology used for diagnostics and treatment here",
            section: "features",
          },
        ],
        tags: ["healthcare", "medical", "clinic", "doctors"],
        isPublic: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
      {
        id: "home-services-hvac",
        categoryId: "home-services",
        name: "HVAC Services Template",
        description: "Template for HVAC contractors and home service providers",
        heroTitle: "Reliable HVAC Services for Your Home",
        heroSubtitle: "Expert heating, cooling, and ventilation services. Available 24/7 for emergency repairs.",
        ctaText: "Get Free Estimate",
        features: [
          "24/7 emergency service",
          "Licensed and insured technicians",
          "Free estimates and consultations",
          "Energy-efficient solutions",
          "Maintenance plans available",
        ],
        testimonialText: "Quick response time and fair pricing. They fixed our AC on the hottest day of summer!",
        testimonialAuthor: "Jennifer Martinez, Homeowner",
        colorScheme: {
          primary: "orange-600",
          secondary: "orange-100",
          accent: "red-500",
        },
        mediaContent: [
          {
            type: "video",
            title: "HVAC Installation Process",
            description: "Professional installation from start to finish",
            placeholder:
              "Add video of HVAC technicians performing professional installation showing attention to detail and cleanliness here",
            section: "process",
          },
          {
            type: "photo",
            title: "Before & After",
            description: "HVAC system transformations",
            placeholder:
              "Add photo comparison of old vs new HVAC installations showing improved efficiency and appearance here",
            section: "gallery",
          },
          {
            type: "video",
            title: "Emergency Response",
            description: "24/7 emergency service commitment",
            placeholder:
              "Add video of emergency response team arriving quickly with fully stocked service vehicles here",
            section: "features",
          },
          {
            type: "photo",
            title: "Certified Technicians",
            description: "Licensed and experienced professionals",
            placeholder:
              "Add photo of uniformed technicians with certifications, licenses, and professional equipment here",
            section: "team",
          },
        ],
        tags: ["hvac", "heating", "cooling", "home-services"],
        isPublic: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
      {
        id: "personal-services-fitness",
        categoryId: "personal-services",
        name: "Personal Trainer Template",
        description: "Motivational template for personal trainers and fitness coaches",
        heroTitle: "Transform Your Body, Transform Your Life",
        heroSubtitle:
          "Personalized fitness training programs designed to help you achieve your health and wellness goals.",
        ctaText: "Start Your Journey",
        features: [
          "Customized workout plans",
          "Nutritional guidance",
          "One-on-one training sessions",
          "Group fitness classes",
          "Progress tracking and support",
        ],
        testimonialText: "Best investment I've made in my health! Lost 30 pounds and feel stronger than ever.",
        testimonialAuthor: "David Thompson, Client",
        colorScheme: {
          primary: "purple-600",
          secondary: "purple-100",
          accent: "pink-500",
        },
        mediaContent: [
          {
            type: "video",
            title: "Training Session Demo",
            description: "See our training methods in action",
            placeholder:
              "Add video of personal training session showing proper form, motivation techniques, and client progress here",
            section: "hero",
          },
          {
            type: "gallery",
            title: "Client Transformations",
            description: "Real results from real clients",
            placeholder:
              "Add photo gallery of client before/after transformations with permission and success stories here",
            section: "testimonials",
          },
          {
            type: "video",
            title: "Gym Facility Tour",
            description: "State-of-the-art fitness equipment",
            placeholder:
              "Add video tour of gym facility showing modern equipment, clean environment, and training areas here",
            section: "features",
          },
          {
            type: "photo",
            title: "Trainer Credentials",
            description: "Certified fitness professionals",
            placeholder:
              "Add photo of trainer with certifications, awards, and professional fitness credentials displayed here",
            section: "team",
          },
        ],
        tags: ["fitness", "personal-training", "health", "wellness"],
        isPublic: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
      {
        id: "real-estate-agency",
        categoryId: "real-estate",
        name: "Real Estate Agency Template",
        description: "Professional template for real estate agents and agencies",
        heroTitle: "Your Dream Home Awaits",
        heroSubtitle: "Expert real estate services to help you buy, sell, or invest in properties with confidence.",
        ctaText: "View Properties",
        features: [
          "Extensive property listings",
          "Market analysis and insights",
          "Professional photography",
          "Negotiation expertise",
          "Full-service support",
        ],
        testimonialText: "Made the home buying process smooth and stress-free. Highly recommend their services!",
        testimonialAuthor: "Lisa and Mark Wilson, Homebuyers",
        colorScheme: {
          primary: "indigo-600",
          secondary: "indigo-100",
          accent: "gold-500",
        },
        mediaContent: [
          {
            type: "video",
            title: "Property Showcase",
            description: "Virtual tours of featured properties",
            placeholder:
              "Add video of property walkthrough with professional narration highlighting key features and neighborhood here",
            section: "hero",
          },
          {
            type: "gallery",
            title: "Property Portfolio",
            description: "High-quality property photography",
            placeholder:
              "Add photo gallery of current listings with professional real estate photography and staging here",
            section: "features",
          },
          {
            type: "video",
            title: "Agent Introduction",
            description: "Meet your real estate professional",
            placeholder:
              "Add video of real estate agent introducing themselves, experience, and commitment to client service here",
            section: "team",
          },
          {
            type: "photo",
            title: "Market Success",
            description: "Recent sales and achievements",
            placeholder:
              "Add photo collage of sold signs, happy clients at closings, and market achievement awards here",
            section: "testimonials",
          },
        ],
        tags: ["real-estate", "property", "buying", "selling"],
        isPublic: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
    ]

    // Only add default templates if they don't exist
    defaultTemplates.forEach((template) => {
      if (!this.templates.has(template.id)) {
        this.templates.set(template.id, template)
      }
    })

    this.saveTemplates()
  }

  private savePromotedPages() {
    if (typeof window !== "undefined") {
      localStorage.setItem("ess_promoted_pages", JSON.stringify(Array.from(this.promotedPages.values())))
    }
  }

  private saveCategories() {
    if (typeof window !== "undefined") {
      localStorage.setItem("ess_categories", JSON.stringify(Array.from(this.categories.values())))
    }
  }

  private saveTemplates() {
    if (typeof window !== "undefined") {
      localStorage.setItem("ess_templates", JSON.stringify(Array.from(this.templates.values())))
    }
  }

  private saveBulkOperations() {
    if (typeof window !== "undefined") {
      localStorage.setItem("ess_bulk_operations", JSON.stringify(Array.from(this.bulkOperations.values())))
    }
  }

  private saveEvents() {
    if (typeof window !== "undefined") {
      localStorage.setItem("ess_analytics", JSON.stringify(this.events))
    }
  }

  promotePageToKnown(pageName: string, categoryId: string, customIcon?: string) {
    const promotedPage: PromotedPage = {
      pageName,
      categoryId,
      promotedAt: Date.now(),
      customIcon,
    }
    this.promotedPages.set(pageName, promotedPage)
    this.savePromotedPages()
    console.log(`📊 Page "${pageName}" promoted to category "${categoryId}"`)
  }

  movePageToCategory(pageName: string, newCategoryId: string) {
    const promotedPage = this.promotedPages.get(pageName)
    if (promotedPage) {
      this.promotedPages.set(pageName, { ...promotedPage, categoryId: newCategoryId })
      this.savePromotedPages()
      console.log(`📊 Page "${pageName}" moved to category "${newCategoryId}"`)
      return true
    }
    return false
  }

  demotePageFromKnown(pageName: string) {
    this.promotedPages.delete(pageName)
    this.savePromotedPages()
    console.log(`📊 Page "${pageName}" demoted from known pages`)
  }

  createCategory(category: Omit<PageCategory, "id">): string {
    const id = category.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
    const newCategory: PageCategory = { ...category, id }
    this.categories.set(id, newCategory)
    this.saveCategories()
    return id
  }

  updateCategory(categoryId: string, updates: Partial<PageCategory>) {
    const category = this.categories.get(categoryId)
    if (category) {
      this.categories.set(categoryId, { ...category, ...updates })
      this.saveCategories()
    }
  }

  deleteCategory(categoryId: string) {
    // Move all pages in this category to "other"
    this.promotedPages.forEach((page, pageName) => {
      if (page.categoryId === categoryId) {
        this.promotedPages.set(pageName, { ...page, categoryId: "other" })
      }
    })
    this.categories.delete(categoryId)
    this.saveCategories()
    this.savePromotedPages()
  }

  createTemplate(template: Omit<CategoryTemplate, "id" | "createdAt" | "updatedAt" | "version">): string {
    const id = `${template.categoryId}-${template.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`
    const newTemplate: CategoryTemplate = {
      ...template,
      id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    }
    this.templates.set(id, newTemplate)
    this.saveTemplates()
    return id
  }

  duplicateTemplate(templateId: string, newName: string): string {
    const template = this.templates.get(templateId)
    if (!template) return ""

    const duplicated = {
      ...template,
      name: newName,
      isPublic: false, // Duplicated templates are private by default
    }
    delete (duplicated as any).id
    delete (duplicated as any).createdAt
    delete (duplicated as any).updatedAt
    delete (duplicated as any).version

    return this.createTemplate(duplicated)
  }

  updateTemplate(templateId: string, updates: Partial<CategoryTemplate>) {
    const template = this.templates.get(templateId)
    if (template) {
      this.templates.set(templateId, {
        ...template,
        ...updates,
        updatedAt: Date.now(),
        version: template.version + 1,
      })
      this.saveTemplates()
    }
  }

  deleteTemplate(templateId: string) {
    this.templates.delete(templateId)
    this.saveTemplates()
  }

  createBulkOperation(operation: Omit<BulkOperation, "id" | "createdAt" | "status">): string {
    const id = `bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newOperation: BulkOperation = {
      ...operation,
      id,
      createdAt: Date.now(),
      status: "pending",
    }
    this.bulkOperations.set(id, newOperation)
    this.saveBulkOperations()

    // Process the operation
    this.processBulkOperation(id)

    return id
  }

  private async processBulkOperation(operationId: string) {
    const operation = this.bulkOperations.get(operationId)
    if (!operation) return

    // Update status to processing
    operation.status = "processing"
    this.bulkOperations.set(operationId, operation)
    this.saveBulkOperations()

    try {
      const results: string[] = []

      if (operation.type === "generate") {
        operation.templates.forEach((templateId, index) => {
          const template = this.templates.get(templateId)
          if (template) {
            const pageName = operation.settings.pageNames?.[index] || `page-${index + 1}`
            const customizedTemplate = { ...template }

            // Apply client branding if provided
            if (operation.settings.clientBranding) {
              customizedTemplate.clientBranding = operation.settings.clientBranding
              if (operation.settings.clientBranding.colors) {
                customizedTemplate.colorScheme = {
                  ...customizedTemplate.colorScheme,
                  ...operation.settings.clientBranding.colors,
                }
              }
            }

            const code = this.generatePageFromTemplate(templateId, pageName, customizedTemplate)
            results.push(code)
          }
        })
      }

      // Update operation with results
      operation.status = "completed"
      operation.results = results
      this.bulkOperations.set(operationId, operation)
      this.saveBulkOperations()
    } catch (error) {
      operation.status = "failed"
      this.bulkOperations.set(operationId, operation)
      this.saveBulkOperations()
    }
  }

  getBulkOperation(operationId: string): BulkOperation | undefined {
    return this.bulkOperations.get(operationId)
  }

  getBulkOperations(): BulkOperation[] {
    return Array.from(this.bulkOperations.values()).sort((a, b) => b.createdAt - a.createdAt)
  }

  generatePageFromTemplate(templateId: string, pageName: string, customTemplate?: CategoryTemplate): string {
    const template = customTemplate || this.templates.get(templateId)
    if (!template) return ""

    const category = this.categories.get(template.categoryId)
    const categoryName = category?.name || "Business"
    const companyName = template.clientBranding?.companyName || "ESS"

    // Generate media content sections
    const generateMediaSection = (mediaItems: MediaContent[], sectionType: string) => {
      const sectionItems = mediaItems.filter((item) => item.section === sectionType)
      if (sectionItems.length === 0) return ""

      return sectionItems
        .map(
          (item) => `
        {/* ${item.title} - ${item.type.toUpperCase()} */}
        <div className="media-placeholder bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-gray-500 mb-2">
            <strong>${item.title}</strong>
          </div>
          <p className="text-sm text-gray-400 italic">
            ${item.placeholder}
          </p>
        </div>
      `,
        )
        .join("\n")
    }

    return `'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Phone, Mail, MapPin, Play, Camera } from 'lucide-react'
import { analytics } from "./lib/analytics"
import { useConversionTracking } from "./hooks/use-conversion-tracking"

export default function ${pageName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")}Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useConversionTracking("${pageName}")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track form submission
    analytics.track({
      page: "${pageName}" as any,
      event: "form_submit",
      formData: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        business: formData.message
      }
    })

    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-${template.colorScheme.secondary} to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              We've received your information and will contact you within 24 hours to discuss how we can help your ${categoryName.toLowerCase()} business grow.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-${template.colorScheme.primary} hover:bg-${template.colorScheme.primary}/90"
            >
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-${template.colorScheme.secondary} to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">${category?.icon || "📄"}</span>
              <span className="text-xl font-bold text-gray-900">${companyName} ${categoryName}</span>
            </div>
            <Button 
              className="bg-${template.colorScheme.primary} hover:bg-${template.colorScheme.primary}/90"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-${template.colorScheme.accent} text-white">
                ${categoryName} Excellence
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                ${template.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                ${template.heroSubtitle}
              </p>
              <Button 
                size="lg"
                className="bg-${template.colorScheme.primary} hover:bg-${template.colorScheme.primary}/90 text-white px-8 py-4 text-lg"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ${template.ctaText}
              </Button>
            </div>
            <div className="space-y-4">
              ${generateMediaSection(template.mediaContent, "hero")}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our ${categoryName} Services?
          </h2>
          
          {/* Media Content for Features */}
          <div className="mb-12">
            ${generateMediaSection(template.mediaContent, "features")}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${template.features
              .map(
                (feature, index) => `
            <Card key={${index}} className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 text-${template.colorScheme.primary} mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">${feature}</h3>
              </CardContent>
            </Card>`,
              )
              .join("")}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Process
          </h2>
          ${generateMediaSection(template.mediaContent, "process")}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Work
          </h2>
          ${generateMediaSection(template.mediaContent, "gallery")}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Team
          </h2>
          ${generateMediaSection(template.mediaContent, "team")}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-${template.colorScheme.secondary}">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            ${generateMediaSection(template.mediaContent, "testimonials")}
          </div>
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl font-medium text-gray-900 mb-4">
            "${template.testimonialText}"
          </blockquote>
          <cite className="text-lg text-gray-600">— ${template.testimonialAuthor}</cite>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-lg">
                Fill out the form below and we'll contact you within 24 hours to discuss your ${categoryName.toLowerCase()} needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Tell us about your ${categoryName.toLowerCase()} needs</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-${template.colorScheme.primary} hover:bg-${template.colorScheme.primary}/90 text-white py-3 text-lg"
                >
                  ${template.ctaText}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">${category?.icon || "📄"}</span>
                <span className="text-xl font-bold">${companyName} ${categoryName}</span>
              </div>
              <p className="text-gray-400">
                Professional ${categoryName.toLowerCase()} services you can trust.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@${companyName.toLowerCase()}${categoryName.toLowerCase().replace(/\s+/g, "")}.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Your City, State</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                ${template.features
                  .slice(0, 4)
                  .map((feature) => `<li>${feature}</li>`)
                  .join("")}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ${companyName} ${categoryName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}`
  }

  getCategories(): PageCategory[] {
    return Array.from(this.categories.values())
  }

  getPromotedPages(): PromotedPage[] {
    return Array.from(this.promotedPages.values())
  }

  getTemplates(): CategoryTemplate[] {
    return Array.from(this.templates.values())
  }

  getTemplatesByCategory(categoryId: string): CategoryTemplate[] {
    return Array.from(this.templates.values()).filter((template) => template.categoryId === categoryId)
  }

  searchTemplates(query: string, categoryId?: string): CategoryTemplate[] {
    const templates = categoryId ? this.getTemplatesByCategory(categoryId) : this.getTemplates()
    const lowerQuery = query.toLowerCase()

    return templates.filter(
      (template) =>
        template.name.toLowerCase().includes(lowerQuery) ||
        template.description.toLowerCase().includes(lowerQuery) ||
        template.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
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
    if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1) // Sunday
    if (tomorrow.getDay() === 6) tomorrow.setDate(tomorrow.getDate() + 2) // Saturday

    return tomorrow.toISOString().split("T")[0] // YYYY-MM-DD
  }

  private calculateTimeOnPage(timestamp: number): string {
    const sessionStart = Number.parseInt(this.sessionId.split("_")[1])
    const seconds = Math.round((timestamp - sessionStart) / 1000)
    return `${seconds} seconds`
  }
}

// ------------------------------------------------------------
// ⭐  EXPORT SINGLETON
// ------------------------------------------------------------
export const analytics = new AnalyticsService()
