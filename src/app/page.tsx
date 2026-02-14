import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Fuel from '@/components/Fuel'

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen">
      <Hero />
      <Features />
      <Pricing />
      <Fuel />
    </main>
  )
}
