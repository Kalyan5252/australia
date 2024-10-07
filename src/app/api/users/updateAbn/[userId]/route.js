import { NextResponse } from 'next/server';
import Users from './../../../../../models/userSchema';

export async function PATCH(req, context) {
  try {
    const { abn } = await req.json();
    const { userId } = context.params;
    const user = await Users.findOne({ _id: userId });
    //   console.log('user:', user);
    if (!user) throw new Error('No Such User Found');
    const data = user.data;
    data.abn = abn;
    // user.data.abn = abn;
    user.abn = abn;
    const updatedData = data;
    // console.log('Updated User:', updatedData);
    await user.save({ validateBeforeSave: false });
    await Users.findByIdAndUpdate(
      { _id: userId },
      { $set: { data: updatedData } }
    );
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
