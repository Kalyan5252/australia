import { NextResponse } from 'next/server';

export async function GET(req) {
  const response = NextResponse.json({
    status: 'success',
  });
  response.cookies.set('authKey', '', {
    httpOnly: true,
    expires: new Date(0),
    maxAge: 0, // Ensures the cookie is removed immediately
    path: '/',
    sameSite: 'strict',
    secure: true,
  });
  return response;
}
