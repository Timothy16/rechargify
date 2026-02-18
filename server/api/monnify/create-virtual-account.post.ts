// server/api/monnify/create-virtual-account.post.ts
import { RechargifyUser } from '~/models/RechargifyUser.model';
import { RechargifyVirtualAccount } from '~/models/RechargifyVirtualAccount.model';
import { RechargifyWallet } from '~/models/RechargifyWallet.model';
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
    const { bvn, nin } = await readBody(event);

    if (!bvn || !/^\d{11}$/.test(bvn)) {
    throw createError({ statusCode: 400, message: 'BVN must be exactly 11 digits with no letters or spaces' });
    }

    if (!nin || !/^\d{11}$/.test(nin)) {
    throw createError({ statusCode: 400, message: 'NIN must be exactly 11 digits with no letters or spaces' });
    }

    // Check if virtual account already exists
    const existing = await RechargifyVirtualAccount.findOne({ userId: session.userId });
    if (existing) {
      throw createError({ statusCode: 400, message: 'Virtual account already exists' });
    }

    const user = await RechargifyUser.findById(session.userId);
    if (!user) {
      throw createError({ statusCode: 404, message: 'User not found' });
    }

    const { baseUrl, contractCode } = getMonnifyConfig();
    const token = await getMonnifyToken();

    // Unique account reference
    const accountReference = `RCHG-${session.userId}-${Date.now()}`;
    const accountName = `${user.firstName} ${user.lastName} - Rechargify`;
    console.log("accountName", accountName)
    // Create reserved account on Monnify
    const response = await $fetch<any>(`${baseUrl}/api/v2/bank-transfer/reserved-accounts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: {
        accountReference,
        accountName,
        currencyCode: 'NGN',
        contractCode,
        customerEmail: user.email,
        customerName: `${user.firstName} ${user.lastName}`,  
        bvn,
        nin,                                                
        getAllAvailableBanks: true
        }
    });

    if (!response.requestSuccessful) {
      throw createError({
        statusCode: 400,
        message: response.responseMessage || 'Failed to create virtual account'
      });
    }

    const { accountName: monnifyName, accounts, accountReference: ref } = response.responseBody;

    // Save virtual account
    const virtualAccount = await RechargifyVirtualAccount.create({
        userId: session.userId,
        accountReference: ref,
        accountName,        
        accounts,
        bvn,
        nin,                  
        bvnVerified: true
        });

    // Create wallet if not exists
    await RechargifyWallet.findOneAndUpdate(
      { userId: session.userId },
      { userId: session.userId, balance: 0, currency: 'NGN' },
      { upsert: true, new: true }
    );

    return {
      success: true,
      message: 'Virtual account created successfully',
      data: {
        accountName: virtualAccount.accountName,
        accounts: virtualAccount.accounts
      }
    };

  } catch (error: any) {
    console.error('Create virtual account error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create virtual account'
    });
  }
});