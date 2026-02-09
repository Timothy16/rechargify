// server/api/auth/reset-password.post.ts
import { RechargifyUser } from '~/models/RechargifyUser.model';
import { createError } from 'h3';
import { ensureConnection } from '~/utils/mongodb';
export default defineEventHandler(async (event) => {
  try {
    await ensureConnection();
    const { token, password } = await readBody(event);

    if (!token || !password) {
      throw createError({
        statusCode: 400,
        message: 'Token and password are required'
      });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw createError({
        statusCode: 400,
        message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
      });
    }

    // Find user with valid reset token
    const user = await RechargifyUser.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() }
    });

    if (!user) {
      throw createError({
        statusCode: 400,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password and clear reset token
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();

    return {
      success: true,
      message: 'Password reset successfully'
    };

  } catch (error: any) {
    console.error('Reset password error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to reset password'
    });
  }
});