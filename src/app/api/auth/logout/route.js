import { NextResponse } from 'next/server';

export async function GET(req) {
  const response = NextResponse.json({
    status: 'success',
  });
  response.cookies.set('authKey', 'null', {
    httpOnly: false,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
    secure: true,
  });
  return response;
}
