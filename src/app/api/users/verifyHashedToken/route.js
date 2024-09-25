import Users from './../../../../models/userSchema';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req, context) {
  try {
    const { token } = await req.json();

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await Users.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error('Url is Expired');
    }
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
