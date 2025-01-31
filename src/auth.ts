import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './lib/zod';
import { NextResponse } from 'next/server';

const publicRoutes = ['/sign-in'];
const protectedRoutes = ['/dashboard'];

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsed = signInSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        return { id: '0', email: credentials.email as string };
      },
    }),
  ],
  callbacks: {
    authorized: ({ request: { nextUrl }, auth }) => {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const isPublicRoute = publicRoutes.includes(pathname);
      const isProtectedRoute = protectedRoutes.includes(pathname);

      if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/sign-in', nextUrl));
      }

      if (isPublicRoute && isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
      }

      return !!auth;
    },
  },
  pages: { signIn: '/sign-in' },
});
