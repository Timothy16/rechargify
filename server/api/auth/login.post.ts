// server/api/auth/login.post.ts
import { RechargifyUser } from '~/models/RechargifyUser.model';
import { createError } from 'h3';
import { ensureConnection } from '~/utils/mongodb';
export default defineEventHandler(async (event) => {
  try {
    await ensureConnection();
    const { email, password } = await readBody(event);

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      });
    }

    const user = await RechargifyUser.findOne({ email });
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      });
    }

    if (!user.isActive) {
      throw createError({
        statusCode: 403,
        message: 'Your account has been deactivated'
      });
    }

    if (!user.isEmailVerified) {
      throw createError({
        statusCode: 403,
        message: 'Please verify your email before logging in'
      });
    }

    const isPasswordValid = user.comparePassword(password);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const session = {
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      type: 'rechargify-user'
    };

    setCookie(event, 'rechargify_user_session', JSON.stringify(session), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });

    return {
      success: true,
      message: 'Login successful',
      user: {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        type: 'rechargify-user'
      }
    };

  } catch (error: any) {
    console.error('Login error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Login failed'
    });
  }
});