// server/api/auth/logout.post.ts
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    deleteCookie(event, 'rechargify_user_session', {
      httpOnly: true,
      path: '/'
    });

    return {
      success: true,
      message: 'Logged out successfully'
    };

  } catch (error) {
    console.error('Logout error:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to logout'
    });
  }
});