'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck, FiAlertCircle, FiMessageSquare, FiUser, FiHome } from 'react-icons/fi'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const services = [
    'Select a service',
    'Elite Duct Cleaning',
    'Premium Dryer Vent',
    'UV Purification System',
    'Air Quality Testing',
    'Complete Elite Package'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
      setLoading(false)
      return
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
        setTimeout(() => setStatus(''), 5000)
      } else {
        console.error('Error response:', data)
        setStatus('error')
        setTimeout(() => setStatus(''), 5000)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-16 bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
            <FiMessageSquare className="text-gold text-sm" />
            <span className="text-gold text-sm font-medium">Get In Touch</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Contact Us
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out for a free estimate or consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Phone Card */}
              <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-5 hover:border-gold/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-3">
                  <FiPhone className="text-gold text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-1">Phone</h3>
                <p className="text-white/60 text-sm mb-2">Call us for immediate assistance</p>
                <a href="tel:+18135558267" className="text-gold text-lg font-semibold hover:underline">(813) 555-8267</a>
              </div>

              {/* Email Card */}
              <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-5 hover:border-gold/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-3">
                  <FiMail className="text-gold text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-1">Email</h3>
                <p className="text-white/60 text-sm mb-2">Send us your questions</p>
                <a href="mailto:elite@pureflowair.demo" className="text-gold text-sm font-semibold hover:underline">elite@pureflowair.demo</a>
              </div>

              {/* Address Card */}
              <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-5 hover:border-gold/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-3">
                  <FiMapPin className="text-gold text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-1">Office Address</h3>
                <p className="text-white/60 text-sm">1245 Clearwater Avenue<br />Tampa, FL 33607</p>
              </div>

              {/* Hours Card */}
              <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-5 hover:border-gold/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-3">
                  <FiClock className="text-gold text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-1">Business Hours</h3>
                <div className="space-y-1 text-white/60 text-sm">
                  <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                  <p>Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gold mt-2">24/7 Emergency Service Available</p>
                </div>
              </div>

              {/* Service Area */}
              <div className="bg-gold/10 rounded-xl border border-gold/30 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FiHome className="text-gold" />
                  <h3 className="text-white font-semibold">Service Area</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-white/60 text-sm">
                  <span>✓ Tampa</span>
                  <span>✓ St. Petersburg</span>
                  <span>✓ Clearwater</span>
                  <span>✓ Brandon</span>
                  <span>✓ Lutz</span>
                  <span>✓ Wesley Chapel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
              <p className="text-white/60 text-sm mb-6">Fill out the form and we'll respond within 24 hours</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Full Name *</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Email Address *</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Phone Number *</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(813) 555-1234"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Service Interested In</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                    >
                      {services.map((s) => (
                        <option key={s} value={s === 'Select a service' ? '' : s} className="bg-primary">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Message *</label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your needs..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-primary font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-3 flex items-center justify-center gap-2">
                    <FiCheck className="text-green-400" />
                    <span className="text-green-400 text-sm">Thank you! We'll contact you soon.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 flex items-center justify-center gap-2">
                    <FiAlertCircle className="text-red-400" />
                    <span className="text-red-400 text-sm">Something went wrong. Please try again.</span>
                  </div>
                )}
              </form>
            </motion.div>

            {/* Map Section */}
            <div className="mt-8">
              <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-white font-semibold">Find Us</h3>
                </div>
                <div className="h-64 bg-white/5 relative">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-82.4952%2C27.9106%2C-82.3952%2C28.0106&layer=mapnik&marker=27.9506%2C-82.4452"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    title="PureFlow Elite Location"
                  ></iframe>
                </div>
                <div className="p-4 text-center border-t border-white/10">
                  <a 
                    href="https://www.openstreetmap.org/?mlat=27.9506&mlon=-82.4452#map=15/27.9506/-82.4452"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold text-sm hover:underline"
                  >
                    View larger map →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}