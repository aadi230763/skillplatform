import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Google OAuth error:', error);
      return NextResponse.redirect(new URL('/login?error=GoogleAuthFailed', process.env.NEXTAUTH_URL));
    }

    if (!code) {
      console.error('No code provided in callback');
      return NextResponse.redirect(new URL('/login?error=NoCodeProvided', process.env.NEXTAUTH_URL));
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/google/callback',
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Token exchange failed:', errorData);
      throw new Error('Failed to get tokens');
    }

    const tokens = await tokenResponse.json();

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.error('User info fetch failed:', errorData);
      throw new Error('Failed to get user info');
    }

    const userData = await userResponse.json();

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.name,
          password: '', // No password for Google users
          phone: '', // No phone for Google users
          skills: [], // Empty skills array for Google users
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Redirect to dashboard with token
    const response = NextResponse.redirect(new URL('/dashboard', process.env.NEXTAUTH_URL));
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 1 day
    });

    return response;
  } catch (error) {
    console.error('Error in Google callback:', error);
    return NextResponse.redirect(new URL('/login?error=GoogleAuthFailed', process.env.NEXTAUTH_URL));
  }
} 