// models/RechargifyWalletTransaction.model.ts
import mongoose from 'mongoose';

const RechargifyWalletTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RechargifyUser',
    required: true,
    index: true
  },
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RechargifyWallet',
    required: true
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  balanceBefore: {
    type: Number,
    required: true
  },
  balanceAfter: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'NGN'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  },
  source: {
    type: String,
    enum: ['monnify', 'manual', 'transfer'],
    default: 'monnify'
  },
  reference: {
    type: String,
    index: true
  },
  description: {
    type: String,
    default: null
  },
  meta: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

export const RechargifyWalletTransaction = mongoose.models.RechargifyWalletTransaction ||
  mongoose.model('RechargifyWalletTransaction', RechargifyWalletTransactionSchema);