import Link from 'next/link'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-premium py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-display font-bold">PureFlow Elite</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">Premium air duct cleaning services with white-glove treatment. Trusted by 5,000+ Tampa Bay homeowners.</p>
            <div className="flex gap-2"><span className="text-gold">★★★★★</span><span className="text-sm text-gray-300">4.9/5 from 500+ reviews</span></div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="text-gray-300 hover:text-gold transition">Services</Link></li>
              <li><Link href="/booking" className="text-gray-300 hover:text-gold transition">Book Online</Link></li>
              <li><Link href="/gallery" className="text-gray-300 hover:text-gold transition">Gallery</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-gold transition">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-gold transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3"><FiPhone className="text-gold" /> (813) 555-8267</li>
              <li className="flex items-center gap-3"><FiMail className="text-gold" /> elite@pureflowair.demo</li>
              <li className="flex items-center gap-3"><FiMapPin className="text-gold" /> 1245 Clearwater Ave, Tampa, FL</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-3"><FiClock className="text-gold" /> Mon-Fri: 8am - 8pm</li>
              <li className="pl-8">Sat: 9am - 6pm</li>
              <li className="pl-8">Sun: 10am - 4pm</li>
              <li className="text-gold mt-2">24/7 Emergency Service</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
          <p>© 2024 PureFlow Elite. Premium Service. Exceptional Results. | Demo Website</p>
        </div>
      </div>
    </footer>
  )
}