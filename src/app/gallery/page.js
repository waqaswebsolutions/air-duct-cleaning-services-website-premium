'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiX, FiCalendar, FiMapPin, FiZoomIn, FiStar, FiGrid, FiList, FiHeart, FiShare2 } from 'react-icons/fi'

// Premium gallery images - Professional air duct cleaning photos
const galleryImages = [
  {
    id: 1,
    title: "Elite Duct Cleaning in Progress",
    description: "Our technicians using state-of-the-art HEPA vacuum system for thorough cleaning",
    image: "https://stanleysteemer-cdn-guhsdrcta9dzabde.a01.azurefd.net/prod-container/images/default-source/stanley's-tips/featured-articles/stanley-steemer-technician-cleaning-air-duct-vent-in-bathroom.jpg?sfvrsn=332ab466_5",
    category: "Services",
    date: "March 2024",
    location: "Tampa, FL",
    featured: true,
    tags: ["HEPA", "Duct Cleaning", "Premium"]
  },
  {
    id: 2,
    title: "Certified Technician at Work",
    description: "NADCA-certified technician performing detailed system inspection",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2TvqgQB6FSggsTH983OqksDl5Qf_a9rOrg&s",
    category: "Team",
    date: "March 2024",
    location: "St. Petersburg, FL",
    featured: false,
    tags: ["Team", "Certified", "Inspection"]
  },
  {
    id: 3,
    title: "Advanced UV Light Installation",
    description: "Installing UV-C purification system for 99.9% pathogen elimination",
    image: "https://freezingmechanical.com/wp-content/uploads/2025/12/step-by-step-guide-how-to-install-a-uv-light-in-your-hvac-system_766.webp",
    category: "Technology",
    date: "February 2024",
    location: "Clearwater, FL",
    featured: true,
    tags: ["UV Light", "Technology", "Purification"]
  },
  {
    id: 4,
    title: "HVAC System Sanitization",
    description: "Deep cleaning and sanitizing of HVAC components",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSinHjih856i3IIPNGoyB_Zy6nc1mufpH5mfg&s",
    category: "Services",
    date: "February 2024",
    location: "Brandon, FL",
    featured: false,
    tags: ["HVAC", "Sanitization", "Cleaning"]
  },
  {
    id: 5,
    title: "Professional Team Ready",
    description: "Our elite team equipped with premium cleaning tools",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvHsI1EbTXKM5wOnpBx7AZsDV6kk_5Nd13Zg&s",
    category: "Team",
    date: "January 2024",
    location: "Lutz, FL",
    featured: false,
    tags: ["Team", "Equipment", "Professional"]
  },
  {
    id: 6,
    title: "Advanced Cleaning Equipment",
    description: "HEPA-filtered truck-mounted vacuum system",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS75pmdXkcYGtnpALMEB5PT4TwkYDigJZ5sMQ&s",
    category: "Equipment",
    date: "January 2024",
    location: "Wesley Chapel, FL",
    featured: true,
    tags: ["Equipment", "HEPA", "Technology"]
  },
  {
    id: 7,
    title: "Residential Duct Cleaning",
    description: "Complete home duct system cleaning service",
    image: "https://www.pluspoint.ae/uploads/Blogs/blog_629175444.webp",
    category: "Services",
    date: "March 2024",
    location: "Tampa, FL",
    featured: false,
    tags: ["Residential", "Duct Cleaning", "Service"]
  },
  {
    id: 8,
    title: "Customer Satisfaction",
    description: "Happy homeowners after premium service",
    image: "https://thumbs.dreamstime.com/b/satisfied-customer-talking-phone-looking-you-satisfied-customer-talking-phone-looking-you-sitting-sofa-102829100.jpg",
    category: "Team",
    date: "February 2024",
    location: "St. Petersburg, FL",
    featured: false,
    tags: ["Satisfaction", "Customer", "Results"]
  },
  {
    id: 9,
    title: "Premium Service Vehicle",
    description: "Fully equipped mobile service unit",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHCX0NmZ2Ji-CL1drCwrWn3i48mZfRA5uMg&s",
    category: "Equipment",
    date: "March 2024",
    location: "Clearwater, FL",
    featured: false,
    tags: ["Vehicle", "Mobile", "Equipment"]
  },
  {
    id: 10,
    title: "Quality Assurance Check",
    description: "Final inspection ensuring premium quality",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop",
    category: "Team",
    date: "February 2024",
    location: "Brandon, FL",
    featured: true,
    tags: ["Quality", "Inspection", "Assurance"]
  },
  {
    id: 11,
    title: "Commercial Duct Cleaning",
    description: "Professional service for commercial properties",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkTb6Rz2IjD5xsUp3nEASrLPIh0qgRhVd9Xg&s",
    category: "Services",
    date: "January 2024",
    location: "Lutz, FL",
    featured: false,
    tags: ["Commercial", "Business", "Service"]
  },
  {
    id: 12,
    title: "Elite Service Package",
    description: "Complete premium service experience",
    image: "https://images.unsplash.com/photo-1581092335871-5c5a3b0a7b8e?w=800&h=600&fit=crop",
    category: "Services",
    date: "March 2024",
    location: "Tampa, FL",
    featured: true,
    tags: ["Premium", "Complete", "Elite"]
  }
]

const categories = ["All", "Services", "Team", "Equipment", "Technology"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxOpen, setLightboxOpen] = useState(null)
  const [viewMode, setViewMode] = useState("grid")

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const featuredImages = filteredImages.filter(img => img.featured)
  const regularImages = filteredImages.filter(img => !img.featured)

  return (
    <div className="pt-32 pb-20 bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
            <FiStar className="text-gold text-sm" />
            <span className="text-gold text-sm font-medium">Visual Showcase</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Our Premium Gallery
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            Experience the PureFlow Elite difference through our professional work and satisfied customers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-gold">500+</div>
            <div className="text-white/60 text-xs">Projects Completed</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-gold">4.9/5</div>
            <div className="text-white/60 text-xs">Customer Rating</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-gold">15+</div>
            <div className="text-white/60 text-xs">Years Experience</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-gold">24/7</div>
            <div className="text-white/60 text-xs">Emergency Service</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gold text-primary shadow-lg shadow-gold/20'
                    : 'bg-white/5 text-white/70 hover:bg-gold/20 hover:text-gold border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition ${viewMode === "grid" ? 'bg-gold/20 text-gold' : 'text-white/40 hover:text-white'}`}
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition ${viewMode === "list" ? 'bg-gold/20 text-gold' : 'text-white/40 hover:text-white'}`}
            >
              <FiList size={18} />
            </button>
          </div>
        </div>

        {/* Featured Section */}
        {selectedCategory === "All" && featuredImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FiStar className="text-gold" /> Featured Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredImages.slice(0, 2).map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => setLightboxOpen(image)}
                >
                  <div className="relative h-80">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-xl font-bold mb-1">{image.title}</h3>
                        <p className="text-white/80 text-sm mb-2">{image.description}</p>
                        <div className="flex gap-3 text-white/60 text-xs">
                          <span className="flex items-center gap-1"><FiCalendar size={12} /> {image.date}</span>
                          <span className="flex items-center gap-1"><FiMapPin size={12} /> {image.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-gold/90 text-primary text-xs px-2 py-1 rounded-full font-semibold">
                    Featured
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className={`grid ${viewMode === "grid" ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {regularImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group cursor-pointer ${viewMode === "list" ? 'flex' : ''}`}
              onClick={() => setLightboxOpen(image)}
            >
              <div className={`bg-white/5 backdrop-blur rounded-xl border border-white/10 overflow-hidden hover:border-gold/30 hover:scale-[1.02] transition-all duration-300 ${viewMode === "list" ? 'flex w-full' : ''}`}>
                <div className={`relative overflow-hidden ${viewMode === "list" ? 'w-48 h-48 flex-shrink-0' : 'h-64'}`}>
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FiZoomIn className="text-white text-2xl" />
                  </div>
                  {image.featured && (
                    <div className="absolute top-3 right-3 bg-gold/90 text-primary text-xs px-2 py-0.5 rounded-full font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                <div className={`p-5 ${viewMode === "list" ? 'flex-1' : ''}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gold text-xs font-medium">{image.category}</span>
                    <span className="text-white/40 text-xs">•</span>
                    <span className="text-white/40 text-xs flex items-center gap-1"><FiCalendar size={10} /> {image.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gold transition">
                    {image.title}
                  </h3>
                  <p className="text-white/50 text-xs mb-3">{image.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-xs flex items-center gap-1"><FiMapPin size={10} /> {image.location}</span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="text-white/40 hover:text-gold transition">
                        <FiHeart size={14} />
                      </button>
                      <button className="text-white/40 hover:text-gold transition">
                        <FiShare2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-white/60 text-base">No images found in "{selectedCategory}" category.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gold/10 rounded-2xl p-8 border border-gold/30">
            <h3 className="text-2xl font-bold text-white mb-3">Ready for Your Premium Service?</h3>
            <p className="text-white/60 text-sm mb-6">Join our satisfied customers and experience the PureFlow Elite difference</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/booking" className="bg-gold text-primary px-8 py-3 rounded-full text-sm font-semibold hover:scale-105 transition">
                Book Your Service
              </a>
              <a href="/contact" className="border border-gold/50 text-gold px-8 py-3 rounded-full text-sm font-semibold hover:bg-gold/10 transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(null)}
          >
            <button
              onClick={() => setLightboxOpen(null)}
              className="absolute top-6 right-6 text-white text-3xl hover:text-gold z-10 transition"
            >
              <FiX />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full bg-primary rounded-2xl overflow-hidden border border-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[60vh] md:h-[70vh] bg-black/50">
                <img
                  src={lightboxOpen.image}
                  alt={lightboxOpen.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">{lightboxOpen.category}</span>
                  {lightboxOpen.featured && (
                    <span className="bg-gold text-primary text-xs px-2 py-0.5 rounded-full">Featured</span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{lightboxOpen.title}</h2>
                <p className="text-white/70 text-sm mb-4">{lightboxOpen.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1"><FiCalendar /> {lightboxOpen.date}</span>
                  <span className="flex items-center gap-1"><FiMapPin /> {lightboxOpen.location}</span>
                </div>
                {lightboxOpen.tags && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                    {lightboxOpen.tags.map((tag, i) => (
                      <span key={i} className="text-white/40 text-xs px-2 py-1 bg-white/5 rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex gap-3">
                  <a href="/booking" className="bg-gold text-primary px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition">
                    Book This Service
                  </a>
                  <a href="/contact" className="border border-gold/50 text-gold px-6 py-2 rounded-full text-sm font-semibold hover:bg-gold/10 transition">
                    Inquire Now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}