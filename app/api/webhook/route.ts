import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    console.log("🚀 SERVER WEBHOOK - Received data:", data)

    const webhookUrl = process.env.NEXT_PUBLIC_ESS_WEBHOOK_URL

    if (!webhookUrl) {
      console.error("❌ WEBHOOK URL NOT SET!")
      return NextResponse.json({ error: "Webhook URL not configured" }, { status: 500 })
    }

    // Send to Zapier
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    console.log("🚀 SERVER WEBHOOK - Zapier response status:", response.status)

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      const errorText = await response.text()
      console.error("❌ Zapier error:", errorText)
      return NextResponse.json({ error: "Zapier request failed" }, { status: 500 })
    }
  } catch (error) {
    console.error("❌ SERVER WEBHOOK ERROR:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
