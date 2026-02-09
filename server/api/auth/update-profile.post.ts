// server/api/auth/update-profile.post.ts
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
    const { firstName, lastName, avatar } = await readBody(event);

    if (!firstName || !lastName) {
      throw createError({
        statusCode: 400,
        message: 'First name and last name are required'
      });
    }

    const user = await RechargifyUser.findById(session.userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    if (avatar) {
      user.avatar = avatar;
    }
    await user.save();

    // Update session cookie
    const updatedSession = {
      ...session,
      firstName: user.firstName,
      lastName: user.lastName
    };

    setCookie(event, 'rechargify_user_session', JSON.stringify(updatedSession), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    const { password, verificationToken, verificationTokenExpiry, resetPasswordToken, resetPasswordExpiry, ...userData } = user.toObject();

    return {
      success: true,
      message: 'Profile updated successfully',
      user: {
        ...userData,
        name: `${user.firstName} ${user.lastName}`,
        type: 'rechargify-user'
      }
    };

  } catch (error: any) {
    console.error('Update profile error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update profile'
    });
  }
});