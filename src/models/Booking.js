import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
    bookingNumber: { type: String, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String },
    serviceType: { type: String, required: true },
    serviceDate: { type: Date, required: true },
    serviceTime: { type: String, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    discountCode: { type: String },
    total: { type: Number, required: true },
    notes: { type: String },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
})

// Generate booking number before saving
BookingSchema.pre('save', async function (next) {
    if (!this.bookingNumber) {
        const date = new Date()
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const count = await mongoose.model('Booking').countDocuments() + 1
        this.bookingNumber = `ELITE-${year}${month}-${String(count).padStart(4, '0')}`
    }
    next()
})

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema)