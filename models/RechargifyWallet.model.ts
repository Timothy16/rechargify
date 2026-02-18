// models/RechargifyWallet.model.ts
import mongoose from 'mongoose';

const RechargifyWalletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RechargifyUser',
    required: true,
    unique: true,
    index: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'NGN'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastCreditedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

export const RechargifyWallet = mongoose.models.RechargifyWallet ||
  mongoose.model('RechargifyWallet', RechargifyWalletSchema);