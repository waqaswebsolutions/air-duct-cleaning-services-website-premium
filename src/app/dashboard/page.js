'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiCalendar, FiDollarSign, FiStar, FiTrendingUp, FiArrowRight, FiClock } from 'react-icons/fi'

export default function DashboardPage() {
  const [customer, setCustomer] = useState(null)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    setCustomer({ name: 'John Smith', email: 'john@example.com', totalSpent: 1399, totalBookings: 2, points: 250 })
    setBookings([
      { id: 'PF-202403-001', service: 'Complete Elite Package', date: 'Apr 15, 2024', time: '9:00 AM', status: 'confirmed', amount: 1399 },
      { id: 'PF-202402-005', service: 'Elite Duct Cleaning', date: 'Feb 10, 2024', time: '2:00 PM', status: 'completed', amount: 599 },
    ])
  }, [])

  const stats = [
    { title: 'Total Spent', value: `$${customer?.totalSpent}`, icon: FiDollarSign, color: 'text-green-600' },
    { title: 'Bookings', value: customer?.totalBookings, icon: FiCalendar, color: 'text-blue-600' },
    { title: 'Loyalty Points', value: customer?.points, icon: FiStar, color: 'text-gold' },
    { title: 'Total Saved', value: '$280', icon: FiTrendingUp, color: 'text-purple-600' },
  ]

  return (
    <div className="pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="container-premium">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome back, {customer?.name}!</h1>
          <p className="text-textLight">Manage your premium service bookings</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 shadow-md">
                <Icon className={`w-8 h-8 ${stat.color} mb-3`} />
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-textLight">{stat.title}</div>
              </motion.div>
            )
          })}
        </div>

        <Link href="/booking"><button className="bg-gold text-primary px-8 py-3 rounded-full font-bold mb-8 hover:shadow-lg transition flex items-center gap-2">+ Book New Service <FiArrowRight /></button></Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-transparent"><h2 className="text-xl font-bold text-primary">Recent Bookings</h2></div>
          <div className="divide-y">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition">
                <div><div className="font-semibold text-primary">{booking.service}</div><div className="text-sm text-textLight flex items-center gap-2 mt-1"><FiCalendar size={12} /> {booking.date} <FiClock size={12} /> {booking.time}</div></div>
                <div className="text-right"><div className="font-bold text-gold">${booking.amount}</div><span className={`text-xs px-2 py-1 rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{booking.status}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}