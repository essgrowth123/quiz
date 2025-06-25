"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Testimonial {
  name: string
  title: string
  content: string
  image: string
}

interface TestimonialsSectionProps {
  title: string
  testimonials: Testimonial[]
}

export function TestimonialsSection({ title, testimonials }: TestimonialsSectionProps) {
  return (
    <section className="section-spacing bg-gray-50">
      <div className="container mx-auto container-padding">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{title}</h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 text-lg leading-relaxed">"{testimonial.content}"</blockquote>

                    {/* Author */}
                    <div className="flex items-center space-x-4 pt-4 border-t">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600 text-sm">{testimonial.title}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 w-full sm:w-auto"
              asChild
            >
              <Link href="/book">📞 Book My Free Audit – ($297 Value)</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
