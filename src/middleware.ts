import { auth as middleware } from './auth';

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
