import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Settings, Send } from "lucide-react"

export function OriginalPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <div className="w-32 h-8 bg-gray-200 rounded"></div>
        <nav className="flex items-center gap-6">
          <span className="text-gray-600">Industries</span>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6">BOOK MY FREE AUDIT - ($297 VALUE)</Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book Your Free ESS Sales Leak Audit</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-8">($297 Value)</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          This 30-minute call shows you exactly where your leads are slipping through the cracks—and how to fix it
          without hiring anyone new.
        </p>
        <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
          📋 Get My Free Sales Blueprint
        </Button>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">What You'll Walk Away With</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center p-6">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">🔍 Clear Diagnosis</h4>
              <p className="text-gray-600">Clarity on what's leaking leads or killing close rates</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">⚙️ Immediate Fix</h4>
              <p className="text-gray-600">A clear fix you can start applying immediately</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">🚀 Straight Talk</h4>
              <p className="text-gray-600">
                No pitch. Just straight talk from someone who's scaled the systems himself
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom Text */}
      <section className="py-8 px-6 text-center">
        <p className="text-gray-600 max-w-3xl mx-auto">
          We've helped contractors, real estate pros, and blue-collar businesses clean up messy pipelines and build
          systems that actually convert.
        </p>
      </section>
    </div>
  )
}
