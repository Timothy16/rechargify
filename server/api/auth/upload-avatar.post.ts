// server/api/auth/upload-avatar.post.ts
import { createError } from 'h3';
import { Buffer } from 'buffer';
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

    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No file uploaded'
      });
    }

    const file = formData[0];
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type || '')) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed'
      });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        message: 'File size too large. Maximum size is 5MB'
      });
    }

    // Convert to base64
    const base64Image = `data:${file.type};base64,${Buffer.from(file.data).toString('base64')}`;

    return {
      success: true,
      message: 'Avatar uploaded successfully',
      avatar: base64Image
    };

  } catch (error: any) {
    console.error('Upload avatar error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to upload avatar'
    });
  }
});