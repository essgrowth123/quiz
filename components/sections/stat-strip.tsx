export function StatStrip() {
  const stats = [
    {
      emoji: "✅",
      number: "$4.2M+",
      label: "in Sales Rescued",
    },
    {
      emoji: "🧰",
      number: "300+",
      label: "Funnels Fixed",
    },
    {
      emoji: "⏱️",
      number: "48hr",
      label: "Turnaround Option",
    },
  ]

  return (
    <section className="stat-strip bg-white-smoke py-12 lg:py-16">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl mb-2">{stat.emoji}</div>
              <div className="text-2xl lg:text-3xl font-bold text-black-charcoal font-oswald mb-1">{stat.number}</div>
              <div className="text-steel-grey font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
