// server/api/monnify/verify-payment.post.ts
import { RechargifyWallet } from '~/models/RechargifyWallet.model';
import { RechargifyWalletTransaction } from '~/models/RechargifyWalletTransaction.model';
import { getMonnifyToken, getMonnifyConfig } from '~/server/utils/monnify';
import { ensureConnection } from '~/utils/mongodb';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    await ensureConnection();

    const sessionCookie = getCookie(event, 'rechargify_user_session');
    if (!sessionCookie) {
      throw createError({ statusCode: 401, message: 'Authentication required' });
    }

    const session = JSON.parse(sessionCookie);
    const { transactionReference } = await readBody(event);

    if (!transactionReference) {
      throw createError({ statusCode: 400, message: 'Transaction reference is required' });
    }

    // Check for duplicate transaction
    const existingTx = await RechargifyWalletTransaction.findOne({
      reference: transactionReference
    });

    if (existingTx) {
      return {
        success: true,
        alreadyProcessed: true,
        message: 'Transaction already processed'
      };
    }

    // Verify payment with Monnify
    const { baseUrl } = getMonnifyConfig();
    const token = await getMonnifyToken();

    const response = await $fetch<any>(
      `${baseUrl}/api/v2/transactions/${encodeURIComponent(transactionReference)}`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    if (!response.requestSuccessful) {
      throw createError({ statusCode: 400, message: 'Failed to verify payment' });
    }

    const { paymentStatus, amountPaid } = response.responseBody;

    if (paymentStatus !== 'PAID') {
      throw createError({ statusCode: 400, message: 'Payment not completed' });
    }

    // Get or create wallet
    let wallet = await RechargifyWallet.findOne({ userId: session.userId });
    if (!wallet) {
      wallet = await RechargifyWallet.create({
        userId: session.userId,
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

    // Save transaction
    await RechargifyWalletTransaction.create({
      userId: session.userId,
      walletId: wallet._id,
      type: 'credit',
      amount: amountPaid,
      balanceBefore,
      balanceAfter,
      currency: 'NGN',
      status: 'completed',
      source: 'monnify',
      reference: transactionReference,
      description: 'Wallet funded via Monnify checkout',
      meta: response.responseBody
    });

    return {
      success: true,
      message: 'Wallet credited successfully',
      data: {
        amount: amountPaid,
        balance: balanceAfter
      }
    };

  } catch (error: any) {
    console.error('Verify payment error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to verify payment'
    });
  }
});