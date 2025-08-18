"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Wrench, Target, Zap } from "lucide-react"

interface QuizAnswers {
  businessType: string[]
  leadTracking: string[]
  headaches: string[]
  leadCapacity: string
  revenue: string
  priority: string
  magicWand: string
}

interface Scores {
  leadFlow: number
  salesGap: number
  operational: number
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    businessType: [],
    leadTracking: [],
    headaches: [],
    leadCapacity: "",
    revenue: "",
    priority: "",
    magicWand: "",
  })
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [cellNumber, setCellNumber] = useState("")

  const totalSteps = 9 // start + 6 questions + bonus + email capture + results

  const businessTypes = [
    "🛠 Home Services (HVAC, Electrical, Roofing, etc.)",
    "🚗 Auto Services (Detailing, Tinting, Repair)",
    "💇 Personal Services (Salon, Spa, Medical)",
    "🍴 Food & Beverage (Restaurant, Catering, Food Truck)",
    "🏗️ Construction & Trades",
    "🏢 Professional Services (Legal, Tax, Consulting)",
    "💻 Digital Services & Online Business",
    "🛍️ Retail & E-commerce",
    "🎓 Education & Training",
    "⚖️ Financial Services & Real Estate",
    "🏥 Healthcare & Wellness",
    "🎨 Creative Services (Design, Marketing, Photography)",
    "➕ Other",
  ]

  const leadTrackingOptions = [
    "Word-of-mouth or referrals",
    "Social media posts and engagement",
    "Google Business Profile / SEO",
    "Paid advertising (Google, Facebook, etc.)",
    "CRM or follow-up software",
    "Spreadsheets or manual tracking",
    "We don't really track much at all",
  ]

  const headacheOptions = [
    "Leads fall through the cracks",
    "Prospects ghost me after initial contact",
    "Paying for marketing that doesn't convert",
    "Team ignores systems I've set up",
    "I'm stuck at the same revenue level",
    "It feels like I am the business",
  ]

  const capacityOptions = [
    "We're ready – systems + staff in place",
    "We'd scramble but get it done",
    "We'd melt – can't take more right now",
  ]

  const revenueOptions = ["Under $10K", "$10K–$25K", "$25K–$50K", "$50K–$100K", "Over $100K"]

  const priorityOptions = [
    "My time – I'm tired of doing everything",
    "Better clients who actually pay",
    "More customers without chasing",
    "A real system that doesn't rely on me",
  ]

  const calculateScores = (): Scores => {
    const scores: Scores = { leadFlow: 0, salesGap: 0, operational: 0 }

    // Question 2: Lead tracking scoring
    if (answers.leadTracking.includes("Word-of-mouth or referrals")) scores.leadFlow += 2
    if (answers.leadTracking.includes("We don't really track much at all")) {
      scores.leadFlow += 3
      scores.salesGap += 2
    }
    if (answers.leadTracking.includes("Spreadsheets or manual tracking")) scores.salesGap += 2
    if (answers.leadTracking.includes("CRM or follow-up software")) scores.salesGap -= 1

    // Question 3: Headaches scoring
    if (answers.headaches.includes("Leads fall through the cracks")) scores.salesGap += 3
    if (answers.headaches.includes("Prospects ghost me after initial contact")) scores.salesGap += 3
    if (answers.headaches.includes("Paying for marketing that doesn't convert")) scores.leadFlow += 3
    if (answers.headaches.includes("Team ignores systems I've set up")) scores.operational += 3
    if (answers.headaches.includes("I'm stuck at the same revenue level")) scores.operational += 2
    if (answers.headaches.includes("It feels like I am the business")) scores.operational += 3

    // Question 4: Capacity scoring
    if (answers.leadCapacity === "We'd melt – can't take more right now") scores.operational += 3
    if (answers.leadCapacity === "We'd scramble but get it done") scores.operational += 1
    if (answers.leadCapacity === "We're ready – systems + staff in place") scores.salesGap += 1

    // Question 6: Priority scoring
    if (answers.priority === "My time – I'm tired of doing everything") scores.operational += 2
    if (answers.priority === "Better clients who actually pay") scores.leadFlow += 2
    if (answers.priority === "More customers without chasing") scores.salesGap += 2
    if (answers.priority === "A real system that doesn't rely on me") scores.operational += 2

    return scores
  }

  const getTopBottleneck = (): string => {
    const scores = calculateScores()
    if (scores.leadFlow >= scores.salesGap && scores.leadFlow >= scores.operational) {
      return "Lead Flow Leak"
    } else if (scores.salesGap >= scores.operational) {
      return "Sales Gap"
    } else {
      return "Operational Bottleneck"
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 2) {
      // -2 to account for email capture and results
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 7) {
      setCurrentStep(8) // Go to email capture
    }
  }

  const handleEmailSubmit = () => {
    if (email && firstName && cellNumber) {
      setShowResults(true)
      setCurrentStep(totalSteps - 1)
    }
  }

  const handleCheckboxChange = (field: keyof QuizAnswers, value: string, checked: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter((item) => item !== value),
    }))
  }

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Wrench className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">🛠️ Stop the Leak: Sales Performance Checkup</h1>
              <p className="text-xl text-gray-600 mb-6">Find the silent leak in your business—and fix it in 7 days.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <p className="text-lg font-semibold text-gray-800 mb-2">
                🎯 Take this 6-question checkup and get your free Growth Bottleneck Report + custom action plan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
              <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span>6 quick questions</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span>≈3 minutes</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span>Instant results</span>
              </div>
            </div>

            <Button
              onClick={handleNext}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg"
            >
              🟡 Start My Free Checkup
            </Button>

            <p className="text-sm text-gray-500 mt-4">No spam. No BS. Just your custom report + fixes.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    const bottleneck = getTopBottleneck()
    const scores = calculateScores()

    const bottleneckContent = {
      "Lead Flow Leak": {
        icon: <Zap className="h-12 w-12 text-red-500" />,
        color: "red",
        analysis:
          "It looks like your business could benefit from more consistent lead generation. Many business owners hit a ceiling when relying solely on referrals or outdated marketing tactics.",
        tips: [
          "Double down on your online presence – implement a system for regularly asking for reviews and consider running targeted digital ads for quick wins.",
          "Implement a simple CRM to track every inquiry – you mentioned leads slip through the cracks, and a system could plug that leak immediately.",
        ],
        solution: "This is exactly what we help fix in Week 1 of your Tune-Up Audit.",
        cta: "Schedule My Free Lead Flow Tune-Up",
      },
      "Sales Gap": {
        icon: <Target className="h-12 w-12 text-orange-500" />,
        color: "orange",
        analysis:
          "Your biggest opportunity is in your sales process. You might be losing revenue by not following up with prospects – a common issue we can fix in days.",
        tips: [
          "Create a systematic follow-up process – most sales happen after the 3rd touchpoint, but most business owners give up after one attempt.",
          "Implement automated text and email sequences for prospects who haven't decided yet – this alone can boost close rates by 20-30%.",
        ],
        solution: "This is exactly what we help fix with our Sales Department-in-a-Box service.",
        cta: "Talk to a Sales Automation Expert – Free Session",
      },
      "Operational Bottleneck": {
        icon: <Wrench className="h-12 w-12 text-blue-500" />,
        color: "blue",
        analysis:
          "You're likely hitting capacity limits or efficiency issues that prevent scaling. Many successful business owners get stuck here until they implement proper systems.",
        tips: [
          "Document your core processes so they don't rely on you personally – start with your most time-consuming daily tasks.",
          "Implement team accountability systems – clear expectations and regular check-ins can dramatically improve productivity without micromanaging.",
        ],
        solution: "This is exactly what we help fix with our Profit Overhaul service.",
        cta: "Schedule My Free Operations Audit",
      },
    }

    const content = bottleneckContent[bottleneck as keyof typeof bottleneckContent]

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              {content.icon}
              <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Your Top Bottleneck: {bottleneck}</h1>
              <div className="flex justify-center space-x-4 text-sm mb-6">
                <div className="text-center">
                  <div className="font-semibold">Lead Flow</div>
                  <div
                    className={`text-2xl font-bold ${scores.leadFlow === Math.max(scores.leadFlow, scores.salesGap, scores.operational) ? "text-red-500" : "text-gray-400"}`}
                  >
                    {scores.leadFlow}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Sales Process</div>
                  <div
                    className={`text-2xl font-bold ${scores.salesGap === Math.max(scores.leadFlow, scores.salesGap, scores.operational) ? "text-orange-500" : "text-gray-400"}`}
                  >
                    {scores.salesGap}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Operations</div>
                  <div
                    className={`text-2xl font-bold ${scores.operational === Math.max(scores.leadFlow, scores.salesGap, scores.operational) ? "text-blue-500" : "text-gray-400"}`}
                  >
                    {scores.operational}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-4">{content.analysis}</p>

              <div className="space-y-3">
                {content.tips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Tip {index + 1}:</strong> {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">How to Fix It:</h3>
              <p className="text-gray-700 mb-4">
                The good news is, there are proven systems to solve this exact issue. {content.solution}
              </p>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 text-lg"
                onClick={() => window.open("https://engineeredsuccesssales.com/book", "_blank")}
              >
                🛠 {content.cta}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 bg-transparent"
                onClick={() => window.open("https://engineeredsuccesssales.com/book", "_blank")}
              >
                🔧 Prefer Done-for-You Help? Explore Our Systems
              </Button>
            </div>

            {answers.magicWand && (
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Your Magic Wand Answer:</h4>
                <p className="text-gray-700 italic">"{answers.magicWand}"</p>
                <p className="text-sm text-gray-600 mt-2">
                  We'll use this to personalize your follow-up recommendations.
                </p>
              </div>
            )}

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Questions about your results? Reply to your email or call us directly.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Sales Performance Checkup</h2>
              <span className="text-sm text-gray-500">
                Question {currentStep} of 6{currentStep === 7 ? " (Bonus)" : ""}
              </span>
            </div>
            <Progress value={currentStep <= 6 ? (currentStep / 6) * 100 : 100} className="h-2" />
          </div>

          {currentStep === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">❓ 1. What kind of business are you running?</h3>
              <p className="text-gray-600 mb-4">(Check all that apply)</p>
              <div className="space-y-3">
                {businessTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={answers.businessType.includes(type)}
                      onCheckedChange={(checked) => handleCheckboxChange("businessType", type, checked as boolean)}
                    />
                    <Label htmlFor={type} className="text-sm">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">❓ 2. How do you track new leads and follow-up?</h3>
              <p className="text-gray-600 mb-4">(Check all that apply)</p>
              <div className="space-y-3">
                {leadTrackingOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={answers.leadTracking.includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange("leadTracking", option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">❓ 3. What's your #1 headache as an owner?</h3>
              <p className="text-gray-600 mb-4">(Pick up to 2)</p>
              <div className="space-y-3">
                {headacheOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={answers.headaches.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked && answers.headaches.length >= 2) return
                        handleCheckboxChange("headaches", option, checked as boolean)
                      }}
                      disabled={!answers.headaches.includes(option) && answers.headaches.length >= 2}
                    />
                    <Label htmlFor={option} className="text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">❓ 4. If leads doubled next month, what would happen?</h3>
              <RadioGroup
                value={answers.leadCapacity}
                onValueChange={(value) => setAnswers((prev) => ({ ...prev, leadCapacity: value }))}
              >
                <div className="space-y-3">
                  {capacityOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">❓ 5. What's your current monthly revenue?</h3>
              <p className="text-gray-600 mb-4">(Confidential – for context only)</p>
              <RadioGroup
                value={answers.revenue}
                onValueChange={(value) => setAnswers((prev) => ({ ...prev, revenue: value }))}
              >
                <div className="space-y-3">
                  {revenueOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {currentStep === 6 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">❓ 6. What do you want to get back first?</h3>
              <p className="text-gray-600 mb-4">(Calibrated—primes emotional offer match)</p>
              <RadioGroup
                value={answers.priority}
                onValueChange={(value) => setAnswers((prev) => ({ ...prev, priority: value }))}
              >
                <div className="space-y-3">
                  {priorityOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {currentStep === 7 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">✨ BONUS QUESTION (Optional but Gold)</h3>
              <p className="text-gray-600 mb-4">
                "If you had a magic wand and could fix one thing in your business this month, what would it be?"
              </p>
              <Textarea
                placeholder="Tell us what you'd fix..."
                value={answers.magicWand}
                onChange={(e) => setAnswers((prev) => ({ ...prev, magicWand: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>
          )}

          {currentStep === 8 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                🔐 Where should we send your personalized report + action plan?
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name (required)</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (required)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cellNumber">Cell Number (required)</Label>
                  <Input
                    id="cellNumber"
                    type="tel"
                    value={cellNumber}
                    onChange={(e) => setCellNumber(e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">No spam. No BS. Just your custom report + fixes.</p>
                <Button
                  onClick={handleEmailSubmit}
                  disabled={!email || !firstName || !cellNumber}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3"
                >
                  🟡 Show My Results & Free Plan
                </Button>
              </div>
            </div>
          )}

          {currentStep > 0 && currentStep < 8 && (
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && answers.businessType.length === 0) ||
                  (currentStep === 2 && answers.leadTracking.length === 0) ||
                  (currentStep === 3 && answers.headaches.length === 0) ||
                  (currentStep === 4 && !answers.leadCapacity) ||
                  (currentStep === 5 && !answers.revenue) ||
                  (currentStep === 6 && !answers.priority)
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                {currentStep === 7 ? "🎯 Get My Free Growth Report" : "Next Question"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
