// server/api/wallet/transactions/[id].get.ts
import { RechargifyWalletTransaction } from '~/models/RechargifyWalletTransaction.model';
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
    const id = getRouterParam(event, 'id');

    const transaction = await RechargifyWalletTransaction.findOne({
      _id: id,
      userId: session.userId
    });

    if (!transaction) {
      throw createError({ statusCode: 404, message: 'Transaction not found' });
    }

    return {
      success: true,
      data: transaction
    };

  } catch (error: any) {
    console.error('Transaction fetch error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch transaction'
    });
  }
});