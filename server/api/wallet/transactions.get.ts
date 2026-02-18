// server/api/wallet/transactions.get.ts
import { RechargifyWalletTransaction } from '~/models/RechargifyWalletTransaction.model';
import { ensureConnection } from '~/utils/mongodb';
import mongoose from 'mongoose';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    await ensureConnection();

    const sessionCookie = getCookie(event, 'rechargify_user_session');
    if (!sessionCookie) {
      throw createError({ statusCode: 401, message: 'Authentication required' });
    }

    const session = JSON.parse(sessionCookie);
    const query = getQuery(event);

    // Build filter
    const filter: any = { userId: session.userId };

    if (query.type && query.type !== 'all') {
      filter.type = query.type;
    }

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    // Date filter
    if (query.date && query.date !== 'all') {
      const now = new Date();
      if (query.date === 'today') {
        filter.createdAt = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
      } else if (query.date === 'week') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        filter.createdAt = { $gte: weekAgo };
      } else if (query.date === 'month') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        filter.createdAt = { $gte: monthAgo };
      }
    }

    // Search
    if (query.search) {
      filter.$or = [
        { reference: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } }
      ];
    }

    const transactions = await RechargifyWalletTransaction.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);


// Stats - convert userId to ObjectId
const userObjectId = new mongoose.Types.ObjectId(session.userId);

const totalIncome = await RechargifyWalletTransaction.aggregate([
  { $match: { userId: userObjectId, type: 'credit', status: 'completed' } },
  { $group: { _id: null, total: { $sum: '$amount' } } }
]);

const totalExpenses = await RechargifyWalletTransaction.aggregate([
  { $match: { userId: userObjectId, type: 'debit', status: 'completed' } },
  { $group: { _id: null, total: { $sum: '$amount' } } }
]);

    return {
      success: true,
      data: {
        transactions,
        stats: {
          totalIncome: totalIncome[0]?.total || 0,
          totalExpenses: totalExpenses[0]?.total || 0
        }
      }
    };

  } catch (error: any) {
    console.error('Transactions fetch error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch transactions'
    });
  }
});