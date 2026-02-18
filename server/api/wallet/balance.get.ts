// server/api/wallet/balance.get.ts
import { RechargifyWallet } from '~/models/RechargifyWallet.model';
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

    const wallet = await RechargifyWallet.findOne({ userId: session.userId });

    if (!wallet) {
      return {
        success: true,
        data: {
          balance: 0,
          currency: 'NGN'
        }
      };
    }

    return {
      success: true,
      data: {
        balance: wallet.balance,
        currency: wallet.currency,
        lastCreditedAt: wallet.lastCreditedAt
      }
    };

  } catch (error: any) {
    console.error('Wallet balance error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch wallet balance'
    });
  }
});