import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">{title}</h2>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start space-x-4 mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</blockquote>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 w-full sm:w-auto"
              asChild
            >
              <a href="/book">📞 Book My Free Audit – ($297 Value)</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
