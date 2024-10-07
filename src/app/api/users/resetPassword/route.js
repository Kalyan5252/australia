import Users from './../../../../models/userSchema';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req, context) {
  try {
    const { token, password } = await req.json();
    // console.log({ token, password });
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await Users.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error('Url is Expired');
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
