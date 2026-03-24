import dbConnect from '@/lib/mongodb'
import Newsletter from '@/models/Newsletter'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    await dbConnect()
    
    const { email, source = 'blog_page' } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Check if email already exists
    const existing = await Newsletter.findOne({ email: email.toLowerCase() })
    
    if (existing) {
      return NextResponse.json(
        { message: 'You are already subscribed!' },
        { status: 200 }
      )
    }
    
    // Save new subscriber
    const subscriber = await Newsletter.create({
      email: email.toLowerCase(),
      source
    })
    
    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}