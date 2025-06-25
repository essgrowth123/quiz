/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["blob.v0.dev"],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/real-estate",
        destination: "/industries/real-estate",
      },
      {
        source: "/contractors",
        destination: "/industries/contractors",
      },
      {
        source: "/auto-detailing",
        destination: "/industries/auto-detailing",
      },
      {
        source: "/landscaping",
        destination: "/industries/landscaping",
      },
      {
        source: "/hvac",
        destination: "/industries/hvac",
      },
      {
        source: "/medical",
        destination: "/industries/medical",
      },
      {
        source: "/automotive",
        destination: "/industries/automotive",
      },
    ]
  },
}

module.exports = nextConfig
