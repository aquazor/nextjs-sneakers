import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

const PUBLIC_ROUTES = ['/', '/sign-in', '/favorites', '/cart'];
const PUBLIC_ROUTE_PREFIXES = ['/sneakers'];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { nextUrl } = req;

  const isPublicRoute =
    PUBLIC_ROUTES.includes(nextUrl.pathname) ||
    PUBLIC_ROUTE_PREFIXES.some((prefix) => nextUrl.pathname.startsWith(prefix));

  const isAuthed = !!session?.user;

  if (isPublicRoute) {
    if (nextUrl.pathname === '/sign-in' && isAuthed) {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
    return NextResponse.next();
  }

  if (!isAuthed) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
