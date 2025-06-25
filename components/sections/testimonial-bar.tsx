"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
  role: string
  stars: number
}

export function TestimonialBar() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const testimonials: Testimonial[] = [
    {
      quote: "We doubled our booked estimates in 14 days.",
      author: "Sarah",
      role: "Real Estate Agent",
      stars: 5,
    },
    {
      quote: "Finally a sales audit that didn't sound like fluff.",
      author: "Bryan",
      role: "Contractor",
      stars: 5,
    },
    {
      quote: "My closing rate went from 30% to 68% in one month.",
      author: "Michael",
      role: "Auto Detailer",
      stars: 5,
    },
    {
      quote: "I stopped competing on price and started selling value.",
      author: "Jessica",
      role: "Landscaper",
      stars: 5,
    },
    {
      quote: "The follow-up system alone was worth 10x the investment.",
      author: "David",
      role: "Med Spa Owner",
      stars: 5,
    },
  ]

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <section className="bg-[#F5F5F5] py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#0D2C54] font-['Oswald']">What Our Clients Say</h3>
          <div className="hidden md:flex gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="min-w-[280px] md:min-w-[320px] bg-white p-6 rounded-lg shadow-sm flex flex-col snap-start"
            >
              <div className="text-[#F2C038] flex mb-3">
                {Array(testimonial.stars)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>★</span>
                  ))}
              </div>
              <p className="text-[#4F4F4F] mb-4 flex-grow">"{testimonial.quote}"</p>
              <div>
                <p className="font-bold text-[#0D2C54]">{testimonial.author}</p>
                <p className="text-sm text-[#4F4F4F]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
