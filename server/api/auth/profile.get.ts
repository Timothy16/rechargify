// server/api/auth/profile.get.ts
import { RechargifyUser } from '~/models/RechargifyUser.model';
import { createError } from 'h3';
import { ensureConnection } from '~/utils/mongodb';

export default defineEventHandler(async (event) => {
    await ensureConnection();
  try {
    const sessionCookie = getCookie(event, 'rechargify_user_session');
    if (!sessionCookie) {
      throw createError({
        statusCode: 401,
        message: 'Authentication required'
      });
    }

    const session = JSON.parse(sessionCookie);

    if (session.type !== 'rechargify-user') {
      throw createError({
        statusCode: 401,
        message: 'Invalid session type'
      });
    }

    const user = await RechargifyUser.findById(session.userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      throw createError({
        statusCode: 403,
        message: 'Your account has been deactivated'
      });
    }

    const { password, verificationToken, verificationTokenExpiry, ...userData } = user.toObject();

    return {
      success: true,
      user: {
        ...userData,
        name: `${user.firstName} ${user.lastName}`,
        type: 'rechargify-user'
      }
    };

  } catch (error: any) {
    console.error('Profile fetch error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch profile'
    });
  }
});