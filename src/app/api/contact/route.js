import dbConnect from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { name, email, phone, service, message } = body
    
    console.log('Contact form submission:', { name, email, phone, service })
    
    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }
    
    // Save to database
    const lead = await Lead.create({
      name,
      email,
      phone,
      service: service || '',
      message: message || '',
      package: 'premium'
    })
    
    console.log('Lead saved successfully:', lead._id)
    
    // Send email notification to admin
    try {
      await resend.emails.send({
        from: 'PureFlow Elite <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL],
        subject: `🔔 New Lead: ${name} - ${service || 'Contact Form'}`,
        replyTo: email,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0A3B3A; color: #EAB308; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #fff; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
              .label { font-weight: bold; color: #0A3B3A; font-size: 14px; margin-bottom: 5px; }
              .value { color: #333; font-size: 16px; }
              .badge { display: inline-block; background: #EAB308; color: #0A3B3A; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 15px; }
              .footer { text-align: center; padding: 15px; font-size: 12px; color: #666; border-top: 1px solid #eee; margin-top: 20px; }
              .button { display: inline-block; background: #0A3B3A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🔔 New Lead Notification</h2>
                <p>PureFlow Elite - Premium Service</p>
              </div>
              <div class="content">
                <div class="badge">Premium Package</div>
                
                <div class="field">
                  <div class="label">Customer Name</div>
                  <div class="value"><strong>${name}</strong></div>
                </div>
                
                <div class="field">
                  <div class="label">Email Address</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                <div class="field">
                  <div class="label">Phone Number</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                
                ${service && service !== 'Select a service' ? `
                <div class="field">
                  <div class="label">Service Interested In</div>
                  <div class="value">${service}</div>
                </div>
                ` : ''}
                
                ${message ? `
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">Submitted At</div>
                  <div class="value">${new Date().toLocaleString()}</div>
                </div>
                
                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 20px;">
                  <p style="margin: 0 0 10px 0;"><strong>📋 Quick Actions:</strong></p>
                  <ul style="margin: 0; padding-left: 20px;">
                    <li>Reply to this email to respond directly to ${name}</li>
                    <li>Call the customer: <a href="tel:${phone}">${phone}</a></li>
                    <li>View in MongoDB: leads collection</li>
                  </ul>
                </div>
              </div>
              <div class="footer">
                <p>PureFlow Elite | Premium Air Duct Cleaning Services</p>
                <p>NADCA Certified | Licensed & Insured</p>
              </div>
            </div>
          </body>
          </html>
        `,
      })
      console.log('✅ Admin email sent to:', process.env.ADMIN_EMAIL)
    } catch (emailError) {
      console.error('❌ Email error:', emailError.message)
      // Don't fail the request if email fails - data is already saved
    }
    
    // Send auto-reply to customer
    try {
      await resend.emails.send({
        from: 'PureFlow Elite <onboarding@resend.dev>',
        to: [email],
        subject: `Thank you for contacting PureFlow Elite, ${name}!`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0A3B3A; color: #EAB308; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #fff; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px; }
              .footer { text-align: center; padding: 15px; font-size: 12px; color: #666; border-top: 1px solid #eee; margin-top: 20px; }
              .info-box { background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #EAB308; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>✨ Thank You, ${name}!</h2>
              </div>
              <div class="content">
                <p>We've received your inquiry and will get back to you within <strong>24 hours</strong>.</p>
                
                <div class="info-box">
                  <p><strong>📋 Here's what you requested:</strong></p>
                  <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    ${service && service !== 'Select a service' ? `<li><strong>Service:</strong> ${service}</li>` : ''}
                    ${message ? `<li><strong>Message:</strong> ${message}</li>` : ''}
                  </ul>
                </div>
                
                <p><strong>Need immediate assistance?</strong><br>
                Call us at <strong style="color: #EAB308;">(813) 555-8267</strong> and reference your inquiry.</p>
                
                <p style="margin-top: 25px;">Best regards,<br>
                <strong>PureFlow Elite Team</strong><br>
                <span style="font-size: 12px; color: #888;">Premium Service | Exceptional Results</span></p>
              </div>
              <div class="footer">
                <p>© 2024 PureFlow Elite. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      })
      console.log('✅ Auto-reply sent to:', email)
    } catch (emailError) {
      console.error('❌ Auto-reply error:', emailError.message)
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! We will contact you soon.' 
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}