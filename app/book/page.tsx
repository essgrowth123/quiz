import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Brain, Rocket, AlertTriangle } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Your Free Sales Audit | Engineered Success Sales",
  description:
    "Book your free 30-minute sales leak audit. Discover exactly where your leads are slipping through the cracks and how to fix it.",
}

export default function BookingPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Book Your Audit" }]

  return (
    <div className="min-h-screen bg-white-smoke">
      <Header />
      <BreadcrumbNav items={breadcrumbItems} />

      <main className="container mx-auto container-padding">
        {/* Header Section */}
        <section className="homepage-section text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-black-charcoal mb-6 leading-tight font-oswald">
              Book Your Free ESS Sales Leak Audit <span className="text-urgency-red">($297 Value)</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-steel-grey mb-8 max-w-3xl mx-auto leading-relaxed">
              This 30-minute call shows you exactly where your leads are slipping through the cracks—and how to fix it
              without hiring anyone new.
            </p>

            <Link href="#calendly-embed" className="btn-primary text-lg px-8 py-4 inline-block">
              📞 Book My Free Audit – ($297 Value)
            </Link>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* What to Expect Section */}
        <section className="homepage-section">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-black-charcoal mb-12 font-oswald">
              What You'll Walk Away With
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white border-2 border-transparent hover:border-construction-yellow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-construction-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-ess-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-black-charcoal mb-3 font-oswald">🔎 Clear Diagnosis</h3>
                  <p className="text-steel-grey leading-relaxed">
                    Clarity on what's leaking leads or killing close rates
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white border-2 border-transparent hover:border-construction-yellow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-construction-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-ess-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-black-charcoal mb-3 font-oswald">🧠 Immediate Fix</h3>
                  <p className="text-steel-grey leading-relaxed">A clear fix you can start applying immediately</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white border-2 border-transparent hover:border-construction-yellow sm:col-span-2 lg:col-span-1">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-construction-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-8 h-8 text-ess-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-black-charcoal mb-3 font-oswald">🚀 Straight Talk</h3>
                  <p className="text-steel-grey leading-relaxed">
                    No pitch. Just straight talk from someone who's scaled the systems himself
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-steel-grey mt-8 max-w-3xl mx-auto text-base sm:text-lg">
              We've helped contractors, real estate pros, and blue-collar businesses clean up messy pipelines and build
              systems that actually convert.
            </p>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Calendly Embed Section */}
        <section id="calendly-embed" className="homepage-section">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-black-charcoal mb-8 font-oswald">
              Pick a Time That Works for You Below
            </h2>

            <Card className="shadow-2xl bg-white">
              <CardContent className="p-0">
                <div className="w-full h-[600px] sm:h-[700px] rounded-lg overflow-hidden">
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
            <p className="text-center text-steel-grey mt-4 text-sm sm:text-base">
              👉 Once booked, you'll get a confirmation email with everything you need. If something comes up, just
              reschedule—no hard feelings.
            </p>

            {/* No-Show Policy Box */}
            <Alert className="mt-6 border-urgency-red bg-red-50">
              <AlertTriangle className="h-4 w-4 text-urgency-red" />
              <AlertDescription className="text-urgency-red">
                <strong>⚠️ Cancellation Policy</strong>
                <br />
                We take this time seriously. No-shows without notice may be subject to a $97 rebooking fee.
                <br />
                If you need to reschedule, no problem—just give us a heads-up.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Updated FAQ Section */}
        <section className="homepage-section">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-black-charcoal mb-12 font-oswald">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-2 rounded-lg px-4 sm:px-6 bg-white">
                <AccordionTrigger className="text-left font-semibold text-base sm:text-lg hover:no-underline py-4 text-black-charcoal font-oswald">
                  Do I need anything prepared for the call?
                </AccordionTrigger>
                <AccordionContent className="text-steel-grey pt-2 pb-4 text-sm sm:text-base">
                  Nope. If you can walk me through how leads come in and what usually happens next, we're good to go.
                  Bonus if you have a recent quote or customer example.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-2 rounded-lg px-4 sm:px-6 bg-white">
                <AccordionTrigger className="text-left font-semibold text-base sm:text-lg hover:no-underline py-4 text-black-charcoal font-oswald">
                  Are you going to try and sell me something?
                </AccordionTrigger>
                <AccordionContent className="text-steel-grey pt-2 pb-4 text-sm sm:text-base">
                  No pitch. This is an audit. I'll show you what's broken and give you a real solution. If you want help
                  implementing it, we can talk—but the value stands on its own.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-2 rounded-lg px-4 sm:px-6 bg-white">
                <AccordionTrigger className="text-left font-semibold text-base sm:text-lg hover:no-underline py-4 text-black-charcoal font-oswald">
                  What happens after the call?
                </AccordionTrigger>
                <AccordionContent className="text-steel-grey pt-2 pb-4 text-sm sm:text-base">
                  If there's a fit, I'll map out a custom plan to increase your booked jobs. If not, you'll still walk
                  away with clarity and a quick win.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-2 rounded-lg px-4 sm:px-6 bg-white">
                <AccordionTrigger className="text-left font-semibold text-base sm:text-lg hover:no-underline py-4 text-black-charcoal font-oswald">
                  What if I miss my call?
                </AccordionTrigger>
                <AccordionContent className="text-steel-grey pt-2 pb-4 text-sm sm:text-base">
                  I block time to prep for your business. If you ghost the call without notice, I may charge a $97
                  rebooking fee. Just reschedule if needed—no hard feelings.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Final CTA Section */}
        <section className="homepage-section text-center bg-white rounded-2xl shadow-xl mx-4 md:mx-0 border-2 border-construction-yellow/20">
          <div className="max-w-3xl mx-auto p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black-charcoal mb-6 font-oswald">
              Ready to Stop the Leaks?
            </h2>
            <p className="text-lg sm:text-xl text-steel-grey mb-8">
              This isn't fluff. It's the first step to finally getting your lead flow and quoting process working like a
              system.
            </p>
            <Link href="#calendly-embed" className="btn-primary text-lg px-8 py-4 inline-block btn-mobile-full">
              📞 Book My Free Audit – ($297 Value)
            </Link>
          </div>
        </section>

        {/* Bottom Padding for Mobile */}
        <div className="pb-16"></div>
      </main>

      <Footer />
    </div>
  )
}
