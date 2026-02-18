// models/RechargifyVirtualAccount.model.ts
import mongoose from 'mongoose';

const RechargifyVirtualAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RechargifyUser',
    required: true,
    unique: true,
    index: true
  },
  accountReference: {
    type: String,
    required: true,
    unique: true
  },
  accountName: {
    type: String,
    required: true
  },
  accounts: [{
    bankCode: String,
    bankName: String,
    accountNumber: String
  }],
  bvn: {
    type: String,
    required: true
  },
  
    nin: {
    type: String,
    required: true
    },
  bvnVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const RechargifyVirtualAccount = mongoose.models.RechargifyVirtualAccount ||
  mongoose.model('RechargifyVirtualAccount', RechargifyVirtualAccountSchema);