// server/api/auth/change-password.post.ts
import { RechargifyUser } from '~/models/RechargifyUser.model';
import { createError } from 'h3';
import { ensureConnection } from '~/utils/mongodb';

export default defineEventHandler(async (event) => {
  try {
     await ensureConnection();
    const sessionCookie = getCookie(event, 'rechargify_user_session');
    if (!sessionCookie) {
      throw createError({
        statusCode: 401,
        message: 'Authentication required'
      });
    }

    const session = JSON.parse(sessionCookie);
    const { currentPassword, newPassword } = await readBody(event);

    if (!currentPassword || !newPassword) {
      throw createError({
        statusCode: 400,
        message: 'Current password and new password are required'
      });
    }

    // Validate new password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw createError({
        statusCode: 400,
        message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
      });
    }

    const user = await RechargifyUser.findById(session.userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      });
    }

    // Verify current password
    const isPasswordValid = user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return {
      success: true,
      message: 'Password changed successfully'
    };

  } catch (error: any) {
    console.error('Change password error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to change password'
    });
  }
});