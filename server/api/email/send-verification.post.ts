// server/api/email/send-verification.post.ts
import { createError } from 'h3';
import { Resend } from 'resend';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, firstname, verificationUrl } = body;

    if (!email || !firstname || !verificationUrl) {
      throw createError({
        statusCode: 400,
        message: 'email, firstname, and verificationUrl are required'
      });
    }

    await sendVerificationEmail(email, firstname, verificationUrl);

    return {
      success: true,
      message: 'Verification email sent successfully'
    };
  } catch (error: any) {
    console.error('Verification email error:', error);

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to send verification email'
    });
  }
});

async function sendVerificationEmail(
  email: string,
  firstname: string,
  verificationUrl: string
) {
  const config = useRuntimeConfig();

  if (!config.resendApiKey) {
    throw new Error('RESEND_API_KEY is missing');
  }

  const resend = new Resend(config.resendApiKey);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verify Your Email - Rechargify</title>
</head>
<body style="margin:0;padding:0;background:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f9fc;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.07);overflow:hidden;">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background:#0066FF;padding:40px 40px 32px 40px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <img src="${config.public.appUrl || 'https://rechargify.com'}/favicon.png" alt="Rechargify" width="48" height="48" style="display:block;margin:0 auto 16px auto;border-radius:10px;">
                    <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">Verify Your Email Address</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 40px 32px 40px;">
              <p style="margin:0 0 16px 0;color:#1f2937;font-size:16px;line-height:24px;">
                Hi <strong>${firstname}</strong>,
              </p>
              
              <p style="margin:0 0 24px 0;color:#4b5563;font-size:16px;line-height:24px;">
                Thank you for signing up with Rechargify. To complete your registration and start managing your finances, please verify your email address by clicking the button below.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0;">
                <tr>
                  <td align="center">
                    <a href="${verificationUrl}" 
                       style="display:inline-block;background:#0066FF;color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:600;font-size:16px;box-shadow:0 2px 4px rgba(0,102,255,0.2);">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Alternative Link -->
              <p style="margin:24px 0 0 0;color:#6b7280;font-size:14px;line-height:20px;">
                If the button above doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin:8px 0 0 0;">
                <a href="${verificationUrl}" 
                   style="color:#0066FF;font-size:13px;word-break:break-all;text-decoration:underline;">
                  ${verificationUrl}
                </a>
              </p>

              <!-- Security Notice -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 0 0;background:#f3f4f6;border-radius:8px;padding:16px;">
                <tr>
                  <td>
                    <p style="margin:0;color:#374151;font-size:13px;line-height:18px;">
                      <strong>🔒 Security Notice:</strong><br>
                      This verification link will expire in 24 hours. If you didn't create an account with Rechargify, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:32px 40px;border-top:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 12px 0;color:#6b7280;font-size:13px;line-height:18px;">
                      <strong style="color:#374151;">Need help?</strong><br>
                      Contact our support team at <a href="mailto:support@rechargify.com" style="color:#0066FF;text-decoration:none;">support@rechargify.com</a>
                    </p>
                    
                    <p style="margin:16px 0 0 0;color:#9ca3af;font-size:12px;line-height:16px;">
                      © ${new Date().getFullYear()} Rechargify Financial Services. All rights reserved.<br>
                      Licensed by the Central Bank of Nigeria (CBN)
                    </p>

                    <!-- Social Links -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin:16px 0 0 0;">
                      <tr>
                        <td style="padding-right:12px;">
                          <a href="https://twitter.com/rechargify" style="color:#9ca3af;text-decoration:none;font-size:12px;">Twitter</a>
                        </td>
                        <td style="padding-right:12px;color:#d1d5db;">|</td>
                        <td style="padding-right:12px;">
                          <a href="https://facebook.com/rechargify" style="color:#9ca3af;text-decoration:none;font-size:12px;">Facebook</a>
                        </td>
                        <td style="padding-right:12px;color:#d1d5db;">|</td>
                        <td>
                          <a href="https://instagram.com/rechargify" style="color:#9ca3af;text-decoration:none;font-size:12px;">Instagram</a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:16px 0 0 0;color:#9ca3af;font-size:11px;line-height:14px;">
                      This email was sent to ${email}. If you'd like to unsubscribe, please contact support.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  await resend.emails.send({
    from: `Rechargify <${config.resendFrom}>`,
    to: email,
    subject: 'Verify your email address - Rechargify',
    html,
  });
}