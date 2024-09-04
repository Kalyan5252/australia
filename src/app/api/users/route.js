import { NextResponse } from 'next/server';
import startDb from '@/app/lib/db';
import User from '../../models/userSchema';

await startDb();

export async function GET() {
  try {
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const newUser = await User.create({
      data: data,
      email: data.email,
      userName: `${data.firstName}_${data.lastName}`,
    });
    return NextResponse.json(newUser, { status: 200 });
    // return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
