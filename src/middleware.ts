import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

const PUBLIC_ROUTES = ['/', '/sign-in'];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { nextUrl } = req;

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthed = !!session?.user;

  if (!isAuthed && !isPublicRoute) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
