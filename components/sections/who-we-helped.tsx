export function WhoWeHelped() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-[#4F4F4F] mb-6 font-['Oswald']">💼 Who We've Helped</h3>
        <p className="text-lg text-[#4F4F4F] mb-8 max-w-3xl">
          Our clients span more than just the trades. If your business books appointments, quotes, or
          consultations—you're in our zone.
        </p>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <li className="flex items-start gap-2">
            <span className="text-xl">🏠</span>
            <span className="text-[#4F4F4F]">Real Estate Pros – speed up lead response and double callbacks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-xl">🛠️</span>
            <span className="text-[#4F4F4F]">Contractors & Landscapers – lock in jobs before they ghost</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-xl">🚗</span>
            <span className="text-[#4F4F4F]">Auto Detailers & Dealerships – stop chasing "just looking" leads</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-xl">🐾</span>
            <span className="text-[#4F4F4F]">Pet Service Pros – fill weekly spots without daily DMs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-xl">🦷</span>
            <span className="text-[#4F4F4F]">
              Med Spas & Dental Clinics – reduce no-shows, book high-ticket consults
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-xl">⚖️</span>
            <span className="text-[#4F4F4F]">Solo Attorneys – convert inquiry calls into retained clients</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-xl">👩‍🏫</span>
            <span className="text-[#4F4F4F]">Coaches & Experts – automate funnels without sounding robotic</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
