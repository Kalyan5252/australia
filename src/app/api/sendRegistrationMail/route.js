import { NextResponse } from 'next/server';
import { transporter, mailOptions } from './../../config/nodemailer';
import Users from '@/models/userSchema';

export async function POST(req) {
  try {
    const { to } = await req.json();
    const user = await Users.findOne({ email: to });
    if (!user) {
      throw new Error('No Such User Found');
    }
    const resetToken = await user.createPasswordResetToken();

    await transporter.sendMail({
      ...mailOptions,
      to,
      subject: 'Business Registration',
      text: `reset url:${DOMAIN}users/registrationForm/${user.id}`,
      html: `
          <div>
          <h1>Reset Your Password</h1>
          <p>
          Click on the link below to reset Your Password
          </p>
          <a href='${DOMAIN}/users/resetPassword/token/${resetToken}'>${DOMAIN}/users/resetPassword/token/${resetToken}</a>
          <p>
            Please use the above Url to Reset your Account's Passowrd. This Url becomes inactive after 20 minutes.
          </p>
          <p>If you didn't made this Reset Password Request then Ignore the mail</p>
          </div>`,
    });
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
