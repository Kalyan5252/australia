import Users from '@/models/userSchema';
import { NextResponse } from 'next/server';
import startDb from '../../lib/db';
import jwt, { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { promisify } from 'util';

await startDb();

const SECRET_KEY = process.env.SECRET_KEY;

const sign = ({ id }) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: '1h',
  });
};

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('authKey').value;
    if (!token || token == '') {
      throw new Error('Login Required');
    }
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    if (!decoded) {
      throw new Error('Session Closed.Please Login');
    }
    const userId = Buffer.from(decoded.id.data).toString('hex');
    const user = await Users.findById(userId);
    return NextResponse.json({ id: userId, role: user.role });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userName, password } = body;
    const user = await Users.findOne({ userName });
    if (!user) {
      throw new Error('No Such User Found');
    }
    if (user.password !== password) throw new Error('Incorrect Credentials');
    const token = sign(user._id);
    const response = NextResponse.json({
      status: 'success',
      message: 'Login Successfully',
      role: user.role,
      id: user._id,
    });
    response.cookies.set('authKey', token, {
      httpOnly: true,
      path: '/',
      maxAge: new Date(60 * 3600),
    });
    return response;
  } catch (error) {
    return NextResponse.json({ status: 'failure', error: error.message });
  }
}
