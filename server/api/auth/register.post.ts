// server/api/auth/register.post.ts
import { RechargifyUser } from '~/models/RechargifyUser.model';
import { createError } from 'h3';
import crypto from 'crypto';
import { ensureConnection } from '~/utils/mongodb';

export default defineEventHandler(async (event) => {
  try {
    await ensureConnection();
    const body = await readBody(event);
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      throw createError({
        statusCode: 400,
        message: 'All fields are required'
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

    // Check if email exists
    const existingUser = await RechargifyUser.findOne({ email });
    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: 'Email already registered'
      });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const newUser = await RechargifyUser.create({
      firstName,
      lastName,
      email,
      password,
      verificationToken,
      verificationTokenExpiry
    });

    // Send verification email
    const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
    
    try {
      await $fetch('/api/email/send-verification', {
        method: 'POST',
        body: {
          email: newUser.email,
          firstname: newUser.firstName,
          verificationUrl
        }
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
    }

    return {
      success: true,
      message: 'Registration successful. Please check your email to verify your account.'
    };

  } catch (error: any) {
    console.error('Registration error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Registration failed'
    });
  }
});