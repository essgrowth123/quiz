export function WhoWeHelped() {
  return (
    <section className="bg-gradient-to-r from-construction-yellow/10 to-construction-yellow/5 py-16 lg:py-20 relative">
      {/* Decorative divider above */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-construction-yellow to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl lg:text-5xl font-bold text-steel-grey mb-8 font-oswald text-center">
            💼 Who We've Helped
          </h3>
          <p className="text-xl text-steel-grey mb-12 max-w-4xl mx-auto text-center leading-relaxed">
            Our clients span more than just the trades. If your business books appointments, quotes, or
            consultations—you're in our zone.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { emoji: "🏠", text: "Real Estate Pros – speed up lead response and double callbacks" },
              { emoji: "🛠️", text: "Contractors & Landscapers – lock in jobs before they ghost" },
              { emoji: "🚗", text: "Auto Detailers & Dealerships – stop chasing 'just looking' leads" },
              { emoji: "🐾", text: "Pet Service Pros – fill weekly spots without daily DMs" },
              { emoji: "🦷", text: "Med Spas & Dental Clinics – reduce no-shows, book high-ticket consults" },
              { emoji: "⚖️", text: "Solo Attorneys – convert inquiry calls into retained clients" },
              { emoji: "👩‍🏫", text: "Coaches & Experts – automate funnels without sounding robotic" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                  <span className="text-steel-grey leading-relaxed font-medium">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative divider below */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-construction-yellow to-transparent"></div>
    </section>
  )
}
