"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Brain, Rocket, Clock } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function BookingPage() {
  const scrollToCalendly = () => {
    const calendlySection = document.getElementById("calendly-embed")
    if (calendlySection) {
      calendlySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto container-padding">
        {/* Header Section */}
        <section className="section-spacing text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Book Your Free ESS Sales Leak Audit <span className="text-primary">(${297} Value)</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              This 30-minute call shows you exactly where your leads are slipping through the cracks—and how to fix it
              without hiring anyone new.
            </p>

            <Button
              size="xl"
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={scrollToCalendly}
            >
              📩 Get My Free Sales Blueprint
            </Button>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="section-spacing">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              What You'll Walk Away With
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🔎 Clear Diagnosis</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Clarity on what's leaking leads or killing close rates
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🧠 Immediate Fix</h3>
                  <p className="text-gray-600 leading-relaxed">A clear fix you can start applying immediately</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🚀 Straight Talk</h3>
                  <p className="text-gray-600 leading-relaxed">
                    No pitch. Just straight talk from someone who's scaled the systems himself
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-gray-600 mt-8 max-w-3xl mx-auto">
              We've helped contractors, real estate pros, and blue-collar businesses clean up messy pipelines and build
              systems that actually convert.
            </p>
          </div>
        </section>

        {/* Calendly Embed Section */}
        <section id="calendly-embed" className="section-spacing">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
              Pick a Time That Works for You Below
            </h2>

            <Card className="shadow-xl">
              <CardContent className="p-0">
                <div className="w-full h-[700px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://calendly.com/essgrowth/30min"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Schedule your ESS Sales Leak Audit"
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
            <p className="text-center text-gray-600 mt-4">
              👉 Once booked, you'll get a confirmation email with everything you need. If something comes up, just
              reschedule—no hard feelings.
            </p>

            {/* No-Show Policy Box */}
            <Alert className="mt-6 border-red-200 bg-red-50">
              <Clock className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>⚠️ Cancellation Policy</strong>
                <br />
                We take this time seriously. No-shows without notice may be subject to a $97 rebooking fee.
                <br />
                If you need to reschedule, no problem—just give us a heads-up.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-spacing">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  Do I need to prepare anything?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2 pb-4">
                  Nope. If you have a recent quote or know how most leads come in, that's helpful—but we'll take it from
                  there.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  Will you try to sell me something?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2 pb-4">
                  No pitch. We diagnose the issue and give you a fix. If you want help implementing it, we can talk. But
                  the call is valuable whether you move forward or not.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  What happens after the audit?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2 pb-4">
                  If you're a fit, you'll get a custom Profit Overhaul plan and an invite to work with us. If not,
                  you'll leave with tools to improve your sales pipeline either way.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  What if I miss my call?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2 pb-4">
                  Life happens—just don't ghost us. We reserve this time and prep for it, so no-shows without notice may
                  be charged a rebooking fee.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section-spacing text-center bg-white rounded-2xl shadow-lg mx-4 md:mx-0">
          <div className="max-w-3xl mx-auto p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Stop the Leaks?</h2>
            <p className="text-xl text-gray-600 mb-8">
              This isn't fluff. It's the first step to finally getting your lead flow and quoting process working like a
              system.
            </p>
            <Button
              size="xl"
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={scrollToCalendly}
            >
              📞 Book My ESS Audit Now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
