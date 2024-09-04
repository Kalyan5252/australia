import { NextResponse } from 'next/server';

export async function GET(req) {
  const response = NextResponse.json({
    status: 'success',
  });
  response.cookies.set('authKey', '', {
    httpOnly: true,
    path: '/',
    maxAge: new Date(60 * 3600),
  });
  return response;
}
