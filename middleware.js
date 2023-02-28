import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
 
export async function middleware(req) {
  
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
 
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/login`;
    
    return NextResponse.redirect(url);
  }
  else {

    return NextResponse.next();
  }
 
}

export async function middleware_s(req) {
  
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
 
  if (session && url.pathname === '/login') {
 
    const url = req.nextUrl.clone();
    url.pathname = `/`;
    
    return NextResponse.redirect(url);
  }
 
}



// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/checkout/summary']
};