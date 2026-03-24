'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiCheck, FiArrowRight, FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiMapPin, FiTag, FiHome, FiWind, FiZap, FiDroplet, FiThermometer, FiStar } from 'react-icons/fi'

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingNumber, setBookingNumber] = useState('')
  const [formData, setFormData] = useState({
    serviceType: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
    discountCode: ''
  })

  // All 6 services from services page
  const services = [
    { id: 'elite-duct', name: 'Elite Duct Cleaning', price: 599, duration: '3-4 hours', icon: FiWind, popular: true },
    { id: 'premium-dryer', name: 'Premium Dryer Vent', price: 249, duration: '1-2 hours', icon: FiHome, popular: false },
    { id: 'uv-purification', name: 'UV Purification System', price: 799, duration: '2-3 hours', icon: FiZap, popular: true },
    { id: 'air-quality', name: 'Air Quality Testing', price: 199, duration: '1-2 hours', icon: FiDroplet, popular: false },
    { id: 'hvac-sanitization', name: 'HVAC Sanitization', price: 299, duration: '2-3 hours', icon: FiThermometer, popular: false },
    { id: 'complete-package', name: 'Complete Elite Package', price: 1399, duration: '5-6 hours', icon: FiStar, popular: true, highlight: true }
  ]

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

  const calculateTotal = () => {
    const service = services.find(s => s.id === formData.serviceType)
    if (!service) return 0
    let total = service.price
    if (formData.discountCode === 'ELITE20') total = total * 0.8
    return total
  }

  const resetForm = () => {
    setFormData({
      serviceType: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      preferredDate: '',
      preferredTime: '',
      notes: '',
      discountCode: ''
    })
    setStep(1)
    setBookingComplete(false)
    setBookingNumber('')
    window.scrollTo(0, 0)
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    const total = calculateTotal()
    const selectedService = services.find(s => s.id === formData.serviceType)
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          serviceType: selectedService?.name || formData.serviceType,
          serviceDate: formData.preferredDate,
          serviceTime: formData.preferredTime,
          total: total,
          notes: formData.notes,
          discountCode: formData.discountCode
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setBookingNumber(data.booking?.bookingNumber || `ELITE-${Date.now()}`)
        setBookingComplete(true)
        toast.success('Booking confirmed! Check your email for details.')
      } else {
        toast.error(data.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedServiceObj = services.find(s => s.id === formData.serviceType)

  // Show success message after booking
  if (bookingComplete) {
    return (
      <div className="pt-32 pb-20 bg-primary min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur rounded-2xl border border-gold/30 p-8 md:p-12"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-green-500 text-4xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
            <p className="text-white/60 mb-2">Your booking number: <span className="text-gold font-mono">{bookingNumber}</span></p>
            <p className="text-white/60 text-sm mb-6">A confirmation email has been sent to {formData.email}</p>
            <div className="bg-gold/10 rounded-xl p-4 mb-6 text-left">
              <h3 className="text-gold font-semibold mb-2">Booking Details:</h3>
              <p className="text-white/70 text-sm"><strong>Service:</strong> {selectedServiceObj?.name}</p>
              <p className="text-white/70 text-sm"><strong>Date:</strong> {formData.preferredDate}</p>
              <p className="text-white/70 text-sm"><strong>Time:</strong> {formData.preferredTime}</p>
              <p className="text-white/70 text-sm"><strong>Total:</strong> ${calculateTotal()}</p>
            </div>
            <button
              onClick={resetForm}
              className="bg-gold text-primary font-semibold px-8 py-3 rounded-xl hover:scale-105 transition"
            >
              Book Another Service
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
            <FiCalendar className="text-gold text-sm" />
            <span className="text-gold text-sm font-medium">Book Your Service</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Schedule Your Premium Service
          </h1>
          <p className="text-white/70 text-sm max-w-2xl mx-auto">
            Experience white-glove service with online booking. Use code ELITE20 for 20% off.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 md:p-8">
              {/* Steps */}
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s ? 'bg-gold text-primary' : 'bg-white/10 text-white/40'
                    }`}>
                      {s}
                    </div>
                    {s < 3 && <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-gold' : 'bg-white/10'}`} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Select Your Service</h2>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {services.map((service) => {
                      const Icon = service.icon
                      return (
                        <label
                          key={service.id}
                          className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition ${
                            formData.serviceType === service.id
                              ? 'border-gold bg-gold/10'
                              : 'border-white/10 hover:border-gold/50'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              name="service"
                              value={service.id}
                              checked={formData.serviceType === service.id}
                              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                              className="w-5 h-5 text-gold"
                            />
                            <Icon className="text-gold text-xl" />
                            <div>
                              <div className="font-semibold text-white">{service.name}</div>
                              <div className="text-white/50 text-sm">{service.duration}</div>
                              {service.popular && (
                                <span className="text-gold text-xs font-medium">⭐ Popular</span>
                              )}
                            </div>
                          </div>
                          <div className="text-xl font-bold text-gold">${service.price}</div>
                        </label>
                      )
                    })}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.serviceType}
                    className="w-full bg-gold text-primary font-semibold py-3 rounded-xl hover:scale-105 transition disabled:opacity-50"
                  >
                    Continue →
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Your Information</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="tel"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        placeholder="Service Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="px-6 py-2 border border-white/20 rounded-xl text-white">Back</button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!formData.name || !formData.email || !formData.phone}
                      className="flex-1 bg-gold text-primary font-semibold py-2 rounded-xl hover:scale-105 transition disabled:opacity-50"
                    >
                      Continue →
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Schedule & Confirm</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Preferred Time</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-gold"
                      >
                        <option value="" className="bg-primary text-white">Select Time</option>
                        {timeSlots.map(t => (
                          <option key={t} value={t} className="bg-primary text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <textarea
                    placeholder="Special Requests or Notes"
                    rows="3"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
                  />
                  <div className="relative">
                    <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      placeholder="Discount Code (ELITE20 for 20% off)"
                      value={formData.discountCode}
                      onChange={(e) => setFormData({ ...formData, discountCode: e.target.value.toUpperCase() })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="px-6 py-2 border border-white/20 rounded-xl text-white">Back</button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading || !formData.preferredDate || !formData.preferredTime}
                      className="flex-1 bg-gold text-primary font-semibold py-2 rounded-xl hover:scale-105 transition disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl border border-gold/30 p-6 sticky top-32">
              <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-3 border-b border-white/20 pb-4">
                <div className="flex justify-between">
                  <span className="text-white/70">Service</span>
                  <span className="text-white font-medium">{selectedServiceObj?.name || 'Select service'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Price</span>
                  <span className="text-gold font-bold">${selectedServiceObj?.price || 0}</span>
                </div>
                {formData.discountCode === 'ELITE20' && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (20%)</span>
                    <span>-${(selectedServiceObj?.price * 0.2 || 0).toFixed(0)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-4 text-xl font-bold">
                <span className="text-white">Total</span>
                <span className="text-gold">${calculateTotal()}</span>
              </div>
              <p className="text-xs text-white/40 mt-4">
                ✨ Use code <span className="text-gold font-mono">ELITE20</span> for 20% off your first booking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}