import dbConnect from '@/lib/mongodb'
import Booking from '@/models/Booking'
import Customer from '@/models/Customer'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { 
      customerName, customerEmail, customerPhone, customerAddress,
      serviceType, serviceDate, serviceTime, total, notes, discountCode 
    } = body
    
    console.log('📅 New Booking Received:', { customerName, customerEmail, serviceType, total })
    
    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !serviceType || !serviceDate || !serviceTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Find or create customer
    let customer = await Customer.findOne({ email: customerEmail })
    if (!customer) {
      customer = await Customer.create({
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress || ''
      })
    }
    
    // Create booking
    const booking = await Booking.create({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress: customerAddress || '',
      serviceType,
      serviceDate: new Date(serviceDate),
      serviceTime,
      subtotal: total,
      discount: discountCode === 'ELITE20' ? total * 0.2 : 0,
      discountCode: discountCode || '',
      total: discountCode === 'ELITE20' ? total * 0.8 : total,
      notes: notes || '',
      status: 'confirmed'
    })
    
    console.log('✅ Booking saved:', booking.bookingNumber)
    
    // Update customer stats
    await Customer.findByIdAndUpdate(customer._id, {
      $inc: { totalBookings: 1, totalSpent: booking.total },
      $set: { address: customerAddress || customer.address }
    })
    
    // Send confirmation email to customer
    await resend.emails.send({
      from: 'PureFlow Elite <onboarding@resend.dev>',
      to: [customerEmail],
      subject: `📅 Booking Confirmation - ${booking.bookingNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0A3B3A; color: #EAB308; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px; }
            .booking-details { background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { text-align: center; padding: 15px; font-size: 12px; color: #666; border-top: 1px solid #eee; margin-top: 20px; }
            .badge { display: inline-block; background: #EAB308; color: #0A3B3A; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📅 Booking Confirmed!</h2>
              <p>PureFlow Elite - Premium Service</p>
            </div>
            <div class="content">
              <div class="badge">Booking Confirmation</div>
              <h3>Hello ${customerName},</h3>
              <p>Your booking has been successfully confirmed. Here are your details:</p>
              
              <div class="booking-details">
                <p><strong>📋 Booking Number:</strong> ${booking.bookingNumber}</p>
                <p><strong>🔧 Service:</strong> ${serviceType}</p>
                <p><strong>📅 Date:</strong> ${new Date(serviceDate).toLocaleDateString()}</p>
                <p><strong>⏰ Time:</strong> ${serviceTime}</p>
                <p><strong>💰 Total:</strong> $${booking.total}</p>
                ${discountCode === 'ELITE20' ? '<p><strong>🎉 Discount Applied:</strong> 20% off (ELITE20)</p>' : ''}
                ${notes ? `<p><strong>📝 Notes:</strong> ${notes}</p>` : ''}
              </div>
              
              <p><strong>What's Next?</strong></p>
              <ul>
                <li>Our team will arrive at your scheduled time</li>
                <li>You'll receive a reminder 24 hours before your appointment</li>
                <li>Call us at (813) 555-8267 if you have any questions</li>
              </ul>
              
              <p>Thank you for choosing PureFlow Elite!</p>
            </div>
            <div class="footer">
              <p>PureFlow Elite | Premium Air Duct Cleaning | NADCA Certified</p>
              <p>1245 Clearwater Avenue, Tampa, FL 33607 | (813) 555-8267</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    console.log('📧 Confirmation email sent to customer:', customerEmail)
    
    // Send notification email to admin (YOU)
    await resend.emails.send({
      from: 'PureFlow Elite <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL],
      subject: `🔔 NEW BOOKING: ${customerName} - ${serviceType}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0A3B3A; color: #EAB308; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px; }
            .booking-details { background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { text-align: center; padding: 15px; font-size: 12px; color: #666; border-top: 1px solid #eee; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🔔 NEW BOOKING ALERT!</h2>
              <p>A new customer has booked a service</p>
            </div>
            <div class="content">
              <div class="booking-details">
                <p><strong>📋 Booking Number:</strong> ${booking.bookingNumber}</p>
                <p><strong>👤 Customer Name:</strong> ${customerName}</p>
                <p><strong>📧 Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
                <p><strong>📞 Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p>
                <p><strong>📍 Address:</strong> ${customerAddress || 'Not provided'}</p>
                <p><strong>🔧 Service:</strong> ${serviceType}</p>
                <p><strong>📅 Date:</strong> ${new Date(serviceDate).toLocaleDateString()}</p>
                <p><strong>⏰ Time:</strong> ${serviceTime}</p>
                <p><strong>💰 Total:</strong> $${booking.total}</p>
                ${discountCode === 'ELITE20' ? '<p><strong>🎉 Discount:</strong> 20% off applied (ELITE20)</p>' : ''}
                ${notes ? `<p><strong>📝 Customer Notes:</strong> ${notes}</p>` : ''}
              </div>
              
              <p><strong>Quick Actions:</strong></p>
              <ul>
                <li>Reply to this email to respond to the customer</li>
                <li>Call the customer: ${customerPhone}</li>
                <li>View in MongoDB: Bookings collection</li>
              </ul>
            </div>
            <div class="footer">
              <p>PureFlow Elite | Booking Notification</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    console.log('📧 Admin notification sent to:', process.env.ADMIN_EMAIL)
    
    return NextResponse.json(
      { success: true, booking, message: 'Booking confirmed!' },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('❌ Booking API error:', error)
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}