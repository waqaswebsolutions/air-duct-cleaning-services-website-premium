'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCheck, FiArrowRight, FiClock, FiShield, FiStar, FiWind, FiHome, FiZap, FiDroplet, FiThermometer } from 'react-icons/fi'

export default function ServicesPage() {
  const services = [
    {
      id: 'elite-duct',
      icon: FiWind,
      title: 'Elite Duct Cleaning',
      price: '$599',
      duration: '3-4 hours',
      description: 'Complete air duct system cleaning using HEPA-filtered vacuum technology that removes 99.9% of dust, allergens, and contaminants from your entire HVAC system.',
      features: [
        'NADCA Certified Technicians',
        'HEPA Vacuum System',
        'Full System Sanitization',
        'Before & After Photos',
        '5-Point Inspection'
      ],
      popular: true,
      tag: 'Most Popular'
    },
    {
      id: 'dryer-vent',
      icon: FiHome,
      title: 'Premium Dryer Vent',
      price: '$249',
      duration: '1-2 hours',
      description: 'Complete dryer vent cleaning and inspection to prevent fire hazards, improve efficiency, and extend the life of your dryer.',
      features: [
        'Fire Hazard Prevention',
        '40% Faster Drying Time',
        'Energy Savings',
        'Safety Inspection',
        'Lint Buildup Removal'
      ],
      popular: false,
      tag: 'Essential'
    },
    {
      id: 'uv-light',
      icon: FiZap,
      title: 'UV Purification System',
      price: '$799',
      duration: '2-3 hours',
      description: 'Advanced UV-C light installation that kills airborne pathogens, bacteria, and mold spores, improving indoor air quality by up to 99.9%.',
      features: [
        '99.9% Pathogen Kill Rate',
        'Mold & Bacteria Prevention',
        '2-Year Warranty',
        'Low Maintenance',
        'Energy Efficient'
      ],
      popular: true,
      tag: 'Premium'
    },
    {
      id: 'air-quality',
      icon: FiDroplet,
      title: 'Air Quality Testing',
      price: '$199',
      duration: '1-2 hours',
      description: 'Comprehensive indoor air quality assessment measuring particulate matter, humidity, VOCs, and potential contaminants in your home.',
      features: [
        'Professional Lab Analysis',
        'Detailed Report',
        'Custom Recommendations',
        'Allergen Detection',
        'Mold & VOC Testing'
      ],
      popular: false,
      tag: 'Diagnostic'
    },
    {
      id: 'hvac-sanitization',
      icon: FiThermometer,
      title: 'HVAC Sanitization',
      price: '$299',
      duration: '2-3 hours',
      description: 'Deep clean and sanitize your entire HVAC system including coils, drain pans, and plenum boxes using EPA-approved products.',
      features: [
        'Eliminates Musty Odors',
        'Prevents Mold Growth',
        'Improves Airflow',
        'FDA-Approved Sanitizers',
        'Safe for Families'
      ],
      popular: false,
      tag: 'Essential'
    },
    {
      id: 'complete-package',
      icon: FiStar,
      title: 'Complete Elite Package',
      price: '$1,399',
      duration: '5-6 hours',
      description: 'The ultimate solution - includes elite duct cleaning, dryer vent service, UV light installation, and comprehensive air quality testing.',
      features: [
        'Everything in Elite Duct',
        'UV Light System',
        'Dryer Vent Service',
        'Air Quality Testing',
        'Priority Scheduling',
        '20% Savings'
      ],
      popular: true,
      tag: 'Best Value',
      highlight: true
    }
  ]

  return (
    <div className="pt-32 pb-20 bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
            <FiStar className="text-gold text-sm" />
            <span className="text-gold text-sm font-medium">Premium Services</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Our Elite Services
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            Experience the highest standard of professional air duct cleaning with our premium service offerings
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white/5 backdrop-blur rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                  service.highlight 
                    ? 'border-gold/50 shadow-lg shadow-gold/10' 
                    : 'border-white/10 hover:border-gold/30'
                }`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-primary text-xs font-bold px-3 py-1 rounded-full">
                    {service.tag}
                  </div>
                )}
                
                <div className="p-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                    service.highlight ? 'bg-gold/30' : 'bg-gold/20'
                  }`}>
                    <Icon className={`w-7 h-7 text-gold`} />
                  </div>
                  
                  {/* Title & Price */}
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{service.title}</h2>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl md:text-3xl font-bold text-gold">{service.price}</span>
                    <span className="text-white/50 text-xs">/ service</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/50 text-xs mb-4">
                    <FiClock size={12} />
                    <span>{service.duration}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white/60 text-sm mb-5 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <FiCheck className="text-gold text-xs mt-0.5 flex-shrink-0" />
                        <span className="text-white/70 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Book Button */}
                  <Link href="/booking">
                    <button className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm ${
                      service.highlight 
                        ? 'bg-gold text-primary hover:scale-105' 
                        : 'border border-gold/50 text-gold hover:bg-gold/10'
                    }`}>
                      Book Now <FiArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Comparison Table */}
        <div className="mt-16 bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center">Service Comparison</h2>
            <p className="text-white/60 text-sm text-center mt-1">Choose the perfect package for your needs</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-4 py-3 text-left text-gold text-sm font-semibold">Service</th>
                  <th className="px-4 py-3 text-center text-gold text-sm font-semibold">Elite Duct</th>
                  <th className="px-4 py-3 text-center text-gold text-sm font-semibold">Complete Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr><td className="px-4 py-3 text-white/80 text-sm">Duct Cleaning</td><td className="px-4 py-3 text-center text-gold text-sm">✓</td><td className="px-4 py-3 text-center text-gold text-sm">✓</td></tr>
                <tr><td className="px-4 py-3 text-white/80 text-sm">Dryer Vent Cleaning</td><td className="px-4 py-3 text-center text-white/50 text-sm">-</td><td className="px-4 py-3 text-center text-gold text-sm">✓</td></tr>
                <tr><td className="px-4 py-3 text-white/80 text-sm">UV Light Installation</td><td className="px-4 py-3 text-center text-white/50 text-sm">-</td><td className="px-4 py-3 text-center text-gold text-sm">✓</td></tr>
                <tr><td className="px-4 py-3 text-white/80 text-sm">Air Quality Testing</td><td className="px-4 py-3 text-center text-white/50 text-sm">-</td><td className="px-4 py-3 text-center text-gold text-sm">✓</td></tr>
                <tr><td className="px-4 py-3 text-white/80 text-sm">HVAC Sanitization</td><td className="px-4 py-3 text-center text-white/50 text-sm">-</td><td className="px-4 py-3 text-center text-gold text-sm">✓</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Choose Premium */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: FiShield, title: 'NADCA Certified', desc: 'Industry-leading certification and training' },
            { icon: FiStar, title: '5-Star Service', desc: 'Rated 4.9/5 by 500+ customers' },
            { icon: FiClock, title: 'Satisfaction Guarantee', desc: '100% money-back guarantee' }
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                <Icon className="w-8 h-8 text-gold mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-white/50 text-xs">{item.desc}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gold/10 rounded-2xl p-6 border border-gold/30">
            <h3 className="text-xl font-bold text-white mb-2">Not sure which service is right for you?</h3>
            <p className="text-white/60 text-sm mb-4">Contact our experts for a free consultation</p>
            <Link href="/contact">
              <button className="bg-gold text-primary px-6 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}