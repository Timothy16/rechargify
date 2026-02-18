// server/api/monnify/get-virtual-account.get.ts
import { RechargifyVirtualAccount } from '~/models/RechargifyVirtualAccount.model';
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

    const virtualAccount = await RechargifyVirtualAccount.findOne({
      userId: session.userId
    });

    if (!virtualAccount) {
      return {
        success: true,
        hasAccount: false,
        data: null
      };
    }

    return {
      success: true,
      hasAccount: true,
      data: {
        accountName: virtualAccount.accountName,
        accounts: virtualAccount.accounts,
        createdAt: virtualAccount.createdAt
      }
    };

  } catch (error: any) {
    console.error('Get virtual account error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch virtual account'
    });
  }
});