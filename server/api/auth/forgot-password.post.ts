// server/api/auth/forgot-password.post.ts
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

    // Always return success even if user doesn't exist (security best practice)
    if (!user) {
      return {
        success: true,
        message: 'If an account exists with this email, you will receive password reset instructions.'
      };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Send reset email
    const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    try {
      await $fetch('/api/email/send-password-reset', {
        method: 'POST',
        body: {
          email: user.email,
          firstname: user.firstName,
          resetUrl
        }
      });
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      throw createError({
        statusCode: 500,
        message: 'Failed to send password reset email'
      });
    }

    return {
      success: true,
      message: 'Password reset instructions sent to your email'
    };

  } catch (error: any) {
    console.error('Forgot password error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to process password reset request'
    });
  }
});