import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  totalBookings: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema)