import { NextResponse } from 'next/server';
import Users from './../../../../../models/userSchema';

export async function PATCH(req, context) {
  try {
    const { password } = await req.json();
    const { userId } = context.params;
    const user = await Users.findOne({ _id: userId }).select('+password');
    // console.log('user:', user);
    if (!user) throw new Error('No Such User Found');
    user.password = password;
    await user.save({ validateBeforeSave: false });
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
