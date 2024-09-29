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

  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('Surrogate-Control', 'no-store');

  return response;
}
