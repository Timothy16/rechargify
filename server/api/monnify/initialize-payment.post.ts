// server/api/monnify/initialize-payment.post.ts
import { RechargifyUser } from '~/models/RechargifyUser.model';
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
    const { amount } = await readBody(event);

    if (!amount || amount < 100) {
      throw createError({ statusCode: 400, message: 'Minimum amount is ₦100' });
    }

    const user = await RechargifyUser.findById(session.userId);
    if (!user) {
      throw createError({ statusCode: 404, message: 'User not found' });
    }

    const { contractCode, apiKey } = getMonnifyConfig();
    const paymentReference = `RCHG-PAY-${session.userId}-${Date.now()}`;

    return {
      success: true,
      data: {
        apiKey,
        contractCode,
        paymentReference,
        amount,
        currency: 'NGN',
        customerName: `${user.firstName} ${user.lastName}`,
        customerEmail: user.email,
        paymentDescription: `Wallet Funding - ${user.firstName} ${user.lastName}`
      }
    };

  } catch (error: any) {
    console.error('Initialize payment error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to initialize payment'
    });
  }
});