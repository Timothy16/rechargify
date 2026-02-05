// server/api/auth/resend-verification.post.ts
import { RechargifyUser } from '~/models/RechargifyUser.model';
import { createError } from 'h3';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody(event);

    if (!email) {
      throw createError({
        statusCode: 400,
        message: 'Email is required'
      });
    }

    const user = await RechargifyUser.findOne({ email });
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      });
    }

    if (user.isEmailVerified) {
      throw createError({
        statusCode: 400,
        message: 'Email is already verified'
      });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = verificationTokenExpiry;
    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
    
    try {
      await $fetch('/api/email/send-verification', {
        method: 'POST',
        body: {
          email: user.email,
          firstname: user.firstName,
          verificationUrl
        }
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      throw createError({
        statusCode: 500,
        message: 'Failed to send verification email'
      });
    }

    return {
      success: true,
      message: 'Verification email sent successfully'
    };

  } catch (error: any) {
    console.error('Resend verification error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to resend verification email'
    });
  }
});