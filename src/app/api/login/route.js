import startDb from '@/app/lib/db';
import Users from '@/app/models/users';
import { NextResponse } from 'next/server';
import jwt, { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

await startDb();

const SECRET_KEY = process.env.SECRETKEY;

// console.log('key;', SECRET_KEY);
const sign = ({ id }) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: '1h',
  });
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error('Error occured creating the User, Try again Later');
    }

    const token = sign(user._id);
    const response = NextResponse.json({
      status: 'success',
      message: 'User Logged Successfully',
    });
    response.cookies.set('authKey', token, {
      httpOnly: true,
      path: '/',
      maxAge: new Date(60 * 3600),
    });
    return response;
    // return NextResponse.json();
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
