import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Benefits from './components/Benefits'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Multiplatform from './components/Multiplatform'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0D1B3E] text-white">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Benefits />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Multiplatform />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
