'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX, FiStar, FiPhone } from 'react-icons/fi'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => {
    if (path === '/') return pathname === '/'
    return pathname === path || pathname?.startsWith(path + '/')
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 md:py-3' : 'bg-white py-3 md:py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">P</span>
            </div>
            <div>
              <span className="text-lg md:text-xl font-display font-bold text-primary">PureFlow</span>
              <span className="text-lg md:text-xl font-display font-bold text-gold"> Elite</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition text-sm lg:text-base font-medium ${
                  isActive(link.href) 
                    ? 'text-primary border-b-2 border-gold pb-1' 
                    : 'text-textDark hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+18135558267" className="flex items-center gap-1.5 text-primary hover:text-accent transition text-sm lg:text-base">
              <FiPhone className="text-gold text-xs lg:text-sm" />
              <span className="font-medium">(813) 555-8267</span>
            </a>
            <Link href="/booking">
              <button className="bg-gold text-primary font-semibold py-2 px-4 lg:py-2.5 lg:px-6 rounded-full text-xs lg:text-sm hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5">
                <FiStar size={14} /> Book Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-textDark p-1" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm transition ${
                  isActive(link.href) ? 'text-primary font-semibold' : 'text-textDark'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+18135558267" className="block py-2 text-sm text-primary font-medium">
              📞 (813) 555-8267
            </a>
            <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full bg-gold text-primary font-semibold py-2.5 rounded-full text-sm mt-2 flex items-center justify-center gap-2">
                <FiStar size={14} /> Book Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}