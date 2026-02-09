// server/api/auth/verify-email.post.ts
import { RechargifyUser } from '~/models/RechargifyUser.model';
import { createError } from 'h3';
import { ensureConnection } from '~/utils/mongodb';

export default defineEventHandler(async (event) => {
  try {
    await ensureConnection();
    const { token } = await readBody(event);

    if (!token) {
      throw createError({
        statusCode: 400,
        message: 'Verification token is required'
      });
    }

    const user = await RechargifyUser.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      throw createError({
        statusCode: 400,
        message: 'Invalid or expired verification token'
      });
    }

    user.isEmailVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();

    return {
      success: true,
      message: 'Email verified successfully. You can now login.'
    };

  } catch (error: any) {
    console.error('Email verification error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Email verification failed'
    });
  }
});