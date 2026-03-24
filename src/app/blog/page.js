'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCalendar, FiClock, FiArrowRight, FiUser, FiStar, FiCheck, FiAlertCircle } from 'react-icons/fi'

const blogPosts = [
  {
    id: 1,
    title: "5 Signs Your Air Ducts Need Professional Cleaning",
    slug: "signs-air-ducts-need-cleaning",
    excerpt: "Learn the tell-tale signs that indicate it's time to schedule professional duct cleaning. From visible mold to unexplained allergies, we cover everything you need to know.",
    date: "March 15, 2024",
    readTime: "4 min read",
    category: "Tips",
    author: "Mike Thompson",
    authorTitle: "Lead Technician",
    image: "🏠",
    featured: true
  },
  {
    id: 2,
    title: "How Clean Air Ducts Can Save You 30% on Energy Bills",
    slug: "air-ducts-improve-hvac-efficiency",
    excerpt: "Discover how regular duct maintenance can save you up to 30% on energy bills while extending the life of your HVAC system.",
    date: "March 10, 2024",
    readTime: "5 min read",
    category: "Energy Savings",
    author: "David Chen",
    authorTitle: "HVAC Specialist",
    image: "⚡",
    featured: false
  },
  {
    id: 3,
    title: "The Connection Between Indoor Air Quality and Allergies",
    slug: "air-quality-and-allergies",
    excerpt: "Understanding how clean ducts can significantly reduce allergy symptoms in your home and improve overall respiratory health.",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Health",
    author: "Sarah Martinez",
    authorTitle: "Customer Service Manager",
    image: "🌸",
    featured: false
  },
  {
    id: 4,
    title: "DIY vs Professional Duct Cleaning: What You Need to Know",
    slug: "diy-vs-professional-duct-cleaning",
    excerpt: "Is DIY duct cleaning worth it? We compare the pros and cons of professional service versus doing it yourself.",
    date: "February 28, 2024",
    readTime: "7 min read",
    category: "Tips",
    author: "Mike Thompson",
    authorTitle: "Lead Technician",
    image: "🔧",
    featured: false
  },
  {
    id: 5,
    title: "How Often Should You Clean Your Dryer Vent?",
    slug: "how-often-clean-dryer-vent",
    excerpt: "Learn why regular dryer vent cleaning is crucial for safety and efficiency, plus signs that yours needs attention.",
    date: "February 20, 2024",
    readTime: "4 min read",
    category: "Safety",
    author: "David Chen",
    authorTitle: "HVAC Specialist",
    image: "🔥",
    featured: false
  },
  {
    id: 6,
    title: "UV Light Installation: Does It Really Work?",
    slug: "uv-light-installation-benefits",
    excerpt: "Exploring the benefits of UV light systems for improving indoor air quality and reducing airborne pathogens.",
    date: "February 15, 2024",
    readTime: "5 min read",
    category: "Technology",
    author: "Jessica Williams",
    authorTitle: "Quality Assurance",
    image: "💡",
    featured: false
  }
]

const categories = ["All", "Tips", "Energy Savings", "Health", "Safety", "Technology"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState("")
  const [newsletterLoading, setNewsletterLoading] = useState(false)

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  // Separate regular posts (all non-featured posts)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  // Featured post - ONLY show when "All" is selected
  const showFeatured = selectedCategory === "All"
  const featuredPost = showFeatured ? blogPosts.find(post => post.featured === true) : null

  // Check if there are any posts to show
  const hasPosts = filteredPosts.length > 0
  const hasRegularPosts = regularPosts.length > 0

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    
    setNewsletterLoading(true)
    setNewsletterStatus("")
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, source: 'blog_page' })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setNewsletterStatus("success")
        setNewsletterEmail("")
        setTimeout(() => setNewsletterStatus(""), 3000)
      } else {
        setNewsletterStatus("error")
        setTimeout(() => setNewsletterStatus(""), 3000)
      }
    } catch (error) {
      setNewsletterStatus("error")
      setTimeout(() => setNewsletterStatus(""), 3000)
    } finally {
      setNewsletterLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-16 bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
            <FiStar className="text-gold text-sm" />
            <span className="text-gold text-sm font-medium">Expert Insights</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Air Duct Cleaning Blog
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            Expert tips, industry insights, and guides for better indoor air quality
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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

        {/* No Posts Message */}
        {!hasPosts && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-white/60 text-base">No posts found in "{selectedCategory}" category.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-4 text-gold text-sm font-semibold hover:underline"
            >
              View all posts →
            </button>
          </div>
        )}

        {/* Featured Post - ONLY shows when "All" is selected */}
        {showFeatured && featuredPost && (
          <div className="mb-12">
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-gold/30 overflow-hidden hover:border-gold/50 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-gold/20 to-gold/5 p-8 flex items-center justify-center">
                  <div className="text-7xl md:text-8xl">{featuredPost.image}</div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">Featured</span>
                    <span className="text-white/50 text-xs flex items-center gap-1"><FiCalendar size={12} /> {featuredPost.date}</span>
                    <span className="text-white/50 text-xs flex items-center gap-1"><FiClock size={12} /> {featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 hover:text-gold transition">
                    <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                        <FiUser className="text-gold text-xs" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">{featuredPost.author}</p>
                        <p className="text-white/40 text-xs">{featuredPost.authorTitle}</p>
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <button className="text-gold text-sm font-semibold hover:gap-2 transition-all flex items-center gap-1">
                        Read More <FiArrowRight size={14} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid - Regular Posts */}
        {hasRegularPosts && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="bg-white/5 backdrop-blur rounded-xl border border-white/10 overflow-hidden hover:border-gold/30 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="bg-gold/10 p-6 flex items-center justify-center">
                    <div className="text-5xl">{post.image}</div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gold text-xs font-medium">{post.category}</span>
                      <span className="text-white/40 text-xs">•</span>
                      <span className="text-white/40 text-xs flex items-center gap-1"><FiCalendar size={10} /> {post.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 hover:text-gold transition line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-white/50 text-xs mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <FiUser className="text-gold text-xs" />
                        <span className="text-white/40 text-xs truncate max-w-[100px]">{post.author}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <button className="text-gold text-xs font-semibold hover:gap-2 transition-all flex items-center gap-1">
                          Read More <FiArrowRight size={12} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Newsletter CTA - Working */}
        <div className="mt-12 text-center">
          <div className="bg-gold/10 rounded-2xl p-6 border border-gold/30">
            <h3 className="text-lg font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-white/60 text-xs mb-4">Get expert tips and exclusive offers delivered to your inbox</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
              <button 
                type="submit"
                disabled={newsletterLoading}
                className="bg-gold text-primary px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition disabled:opacity-50"
              >
                {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {newsletterStatus === "success" && (
              <div className="mt-3 text-green-400 text-xs flex items-center justify-center gap-1">
                <FiCheck /> Successfully subscribed!
              </div>
            )}
            {newsletterStatus === "error" && (
              <div className="mt-3 text-red-400 text-xs flex items-center justify-center gap-1">
                <FiAlertCircle /> Something went wrong. Please try again.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}