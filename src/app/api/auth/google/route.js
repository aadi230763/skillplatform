import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    
    const params = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/google/callback',
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
      state: Math.random().toString(36).substring(7),
    };

    googleAuthUrl.search = new URLSearchParams(params).toString();

    console.log('Redirecting to Google OAuth URL:', googleAuthUrl.toString());

    return NextResponse.redirect(googleAuthUrl.toString());
  } catch (error) {
    console.error('Error in Google auth route:', error);
    return NextResponse.redirect(new URL('/login?error=GoogleAuthError', process.env.NEXTAUTH_URL));
  }
} 