import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const isMobile = device.type === 'mobile' || device.type === 'tablet';

  const url = request.nextUrl.clone();

  if (isMobile && url.pathname === '/projects') {
    url.pathname = '/project';
    return NextResponse.redirect(url);
  }

  if (!isMobile && url.pathname === '/project') {
    url.pathname = '/projects';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/project', '/projects'],
};
