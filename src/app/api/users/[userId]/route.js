import { NextResponse } from 'next/server';
import startDb from '@/app/lib/db';
import User from '../../../models/userSchema';

await startDb();

export async function GET(req, context) {
  const { userId } = context.params;
  try {
    const user = await User.findById(userId);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PATCH(req, { params }) {
  try {
    const { userId } = params;
    const body = await req.json();
    // if()
    const userData = await User.findById(userId);
    const updateFields = {};
    if (body.password) {
      updateFields['password'] = body.password;
    } else {
      if (body.email) {
        updateFields['email'] = body.email;
      }
      if (body.firstName && body.lastName) {
        updateFields['userName'] = `${body.firstName}_${body.lastName}`;
      } else if (body.lastName) {
        updateFields[
          'userName'
        ] = `${userData.data.firstName}_${body.lastName}`;
      } else if (body.firstName) {
        updateFields[
          'userName'
        ] = `${body.firstName}_${userData.data.lastName}`;
      }
      for (const [key, value] of Object.entries(body)) {
        if (key) {
          updateFields[`data.${key}`] = value;
        }
      }
    }
    console.log(updateFields);

    const user = await User.updateOne({ _id: userId }, { $set: updateFields });
    // return NextResponse.json({});
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}
