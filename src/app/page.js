'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiStar, FiCheck, FiClock, FiShield, FiAward, FiArrowRight, FiWind, FiHome, FiUsers } from 'react-icons/fi'

export default function Home() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee8d8d3b5c9c?w=1920&h=1080&fit=crop"
            alt="Clean air ducts"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/85"></div>
        </div>
        
        <div className="relative z-10 container-premium py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur rounded-full px-4 py-1.5 mb-6 border border-gold/30">
                <FiStar className="text-gold text-sm" />
                <span className="text-gold text-sm font-medium">Trusted Since 2009 • 5,000+ Homes</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
                Breathe Cleaner
                <span className="text-gold"> Air Today</span>
              </h1>
              <p className="text-base md:text-lg text-white/90 mb-8 max-w-lg">
                Professional air duct cleaning services with white-glove treatment. NADCA certified technicians serving Tampa Bay.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <button className="bg-gold text-primary font-bold py-3 px-8 rounded-full text-base hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
                    Get Free Estimate <FiArrowRight />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full text-base hover:bg-white/10 transition">
                    Our Services
                  </button>
                </Link>
              </div>
              <div className="flex gap-6 mt-8">
                <div className="flex items-center gap-2 text-white/80 text-sm"><FiCheck className="text-gold text-sm" /> 5,000+ Homes</div>
                <div className="flex items-center gap-2 text-white/80 text-sm"><FiCheck className="text-gold text-sm" /> 15+ Years</div>
                <div className="flex items-center gap-2 text-white/80 text-sm"><FiCheck className="text-gold text-sm" /> 100% Guarantee</div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="bg-primary/40 backdrop-blur-md rounded-2xl p-6 border border-gold/30">
                <div className="text-center">
                  <div className="text-gold text-5xl mb-3">🏆</div>
                  <h3 className="text-xl font-bold text-white mb-2">Elite Service. Premium Results.</h3>
                  <p className="text-white/80 text-sm mb-4">20% off for first-time customers</p>
                  <div className="bg-gold/20 rounded-lg p-3 border border-gold/50">
                    <p className="font-mono text-gold font-bold text-base">CODE: ELITE20</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-10 bg-primary border-b border-gold/20">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-2xl md:text-3xl font-bold text-gold">5,000+</div><div className="text-sm text-white/70">Homes Cleaned</div></div>
            <div><div className="text-2xl md:text-3xl font-bold text-gold">15+</div><div className="text-sm text-white/70">Years Experience</div></div>
            <div><div className="text-2xl md:text-3xl font-bold text-gold">4.9/5</div><div className="text-sm text-white/70">Customer Rating</div></div>
            <div><div className="text-2xl md:text-3xl font-bold text-gold">100%</div><div className="text-sm text-white/70">Satisfaction</div></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-primary">
        <div className="container-premium">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1 mb-4">
              <FiStar className="text-gold text-sm" />
              <span className="text-gold text-sm font-medium">Premium Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Elite Air Quality Solutions</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-sm">Experience the highest standard of professional duct cleaning</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FiWind, title: 'Elite Duct Cleaning', price: '$599', desc: 'Complete system cleaning with HEPA filtration', features: ['NADCA Certified', 'HEPA Vacuum', 'Sanitization'], delay: 0 },
              { icon: FiHome, title: 'Premium Dryer Vent', price: '$249', desc: 'Full vent system cleaning & inspection', features: ['Fire Prevention', '40% Faster Drying', 'Safety Check'], delay: 0.1 },
              { icon: FiStar, title: 'UV Purification', price: '$799', desc: 'Advanced UV-C light installation', features: ['99.9% Pathogen Kill', 'Mold Prevention', '2-Year Warranty'], delay: 0.2 },
            ].map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: service.delay }} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:border-gold/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                  <p className="text-2xl font-bold text-gold mb-2">{service.price}</p>
                  <p className="text-white/60 text-sm mb-4">{service.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {service.features.map((f, idx) => <li key={idx} className="flex items-center gap-2 text-xs text-white/70"><FiCheck className="text-gold text-xs" /> {f}</li>)}
                  </ul>
                  <Link href="/booking"><button className="w-full bg-gold text-primary font-semibold py-2.5 rounded-lg text-sm hover:scale-105 transition-all flex items-center justify-center gap-2">Book Now <FiArrowRight size={14} /></button></Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary/90" ref={ref}>
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1 mb-4">
                <FiAward className="text-gold text-sm" />
                <span className="text-gold text-sm font-medium">Why Choose Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The PureFlow Elite Difference</h2>
              <p className="text-white/70 text-sm mb-6">We don't just clean ducts—we transform your home's air quality with premium service and proven results.</p>
              <div className="space-y-3">
                {[
                  { title: 'NADCA Certified Technicians', desc: 'Industry-leading training and expertise' },
                  { title: 'State-of-the-Art Equipment', desc: 'HEPA filtration and advanced cleaning systems' },
                  { title: '100% Satisfaction Guarantee', desc: 'Your satisfaction is our priority' },
                  { title: 'White-Glove Service', desc: 'Shoe covers, floor protection, and thorough cleanup' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0"><FiCheck className="text-gold text-xs" /></div>
                    <div><h4 className="font-semibold text-white text-sm">{item.title}</h4><p className="text-white/60 text-xs">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
              <img src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=500&fit=crop" alt="Professional technician" className="rounded-2xl shadow-2xl border border-gold/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-gold">
        <div className="container-premium text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Ready for Cleaner Air?</h2>
            <p className="text-primary/80 text-sm mb-5 max-w-2xl mx-auto">Schedule your premium service today and experience the difference</p>
            <Link href="/booking">
              <button className="bg-primary text-white px-8 py-3 rounded-full text-base font-bold hover:scale-105 transition-all shadow-lg">
                Book Your Appointment
              </button>
            </Link>
            <p className="text-primary/70 text-xs mt-3">Use code <span className="font-mono bg-primary/20 px-2 py-0.5 rounded text-primary">ELITE20</span> for 20% off</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}