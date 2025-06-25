"use client"

import Image from "next/image"

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center">
          <Image
            src="/ess-logo-light.png"
            alt="Engineered Success Sales"
            width={400}
            height={200}
            className="h-12 sm:h-14 md:h-16 w-auto max-w-full"
            priority
          />
        </div>
      </div>
    </header>
  )
}

export default Header
export { Header }
