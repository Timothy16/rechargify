// server/api/monnify/webhook.post.ts
import { RechargifyVirtualAccount } from '~/models/RechargifyVirtualAccount.model';
import { RechargifyWallet } from '~/models/RechargifyWallet.model';
import { RechargifyWalletTransaction } from '~/models/RechargifyWalletTransaction.model';
import { ensureConnection } from '~/utils/mongodb';
import { createHmac } from 'crypto';

export default defineEventHandler(async (event) => {
  try {
    await ensureConnection();

    const config = useRuntimeConfig();
    const body = await readBody(event);

    // Verify Monnify webhook signature
    const monnifySignature = getHeader(event, 'monnify-signature');
    if (!monnifySignature) {
      console.error('Webhook: Missing Monnify signature');
      return { success: false };
    }

    const computedHash = createHmac('sha512', config.monnifySecretKey)
      .update(JSON.stringify(body))
      .digest('hex');

    if (computedHash !== monnifySignature) {
      console.error('Webhook: Invalid signature');
      return { success: false };
    }

    const { eventType, eventData } = body;

    // Only process successful reserved account payments
    if (eventType !== 'SUCCESSFUL_TRANSACTION') {
      return { success: true };
    }

    const {
      product,
      amountPaid,
      transactionReference,
      paymentReference
    } = eventData;

    // product.reference is the accountReference we set
    const virtualAccount = await RechargifyVirtualAccount.findOne({
      accountReference: product.reference
    });

    if (!virtualAccount) {
      console.error('Webhook: Virtual account not found for reference:', product.reference);
      return { success: false };
    }

    // Check duplicate transaction
    const existingTx = await RechargifyWalletTransaction.findOne({
      reference: transactionReference
    });

    if (existingTx) {
      console.log('Webhook: Duplicate transaction, skipping:', transactionReference);
      return { success: true };
    }

    // Get or create wallet
    let wallet = await RechargifyWallet.findOne({ userId: virtualAccount.userId });
    if (!wallet) {
      wallet = await RechargifyWallet.create({
        userId: virtualAccount.userId,
        balance: 0,
        currency: 'NGN'
      });
    }

    const balanceBefore = wallet.balance;
    const balanceAfter = balanceBefore + amountPaid;

    // Credit wallet
    wallet.balance = balanceAfter;
    wallet.lastCreditedAt = new Date();
    await wallet.save();

    // Save transaction record
    await RechargifyWalletTransaction.create({
      userId: virtualAccount.userId,
      walletId: wallet._id,
      type: 'credit',
      amount: amountPaid,
      balanceBefore,
      balanceAfter,
      currency: 'NGN',
      status: 'completed',
      source: 'monnify',
      reference: transactionReference,
      description: `Wallet funded via bank transfer`,
      meta: { paymentReference, eventData }
    });

    console.log(`Webhook: Wallet credited ₦${amountPaid} for user ${virtualAccount.userId}`);

    return { success: true };

  } catch (error: any) {
    console.error('Webhook error:', error);
    return { success: false };
  }
});