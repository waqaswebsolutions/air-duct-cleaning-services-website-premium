import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'PureFlow Elite | Premium Air Duct Cleaning Services',
  description: 'Luxury air duct cleaning services with online booking, customer portal, and premium support.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}