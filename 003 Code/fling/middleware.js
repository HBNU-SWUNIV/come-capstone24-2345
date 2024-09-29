import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  //   console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname === '/') {
    const session = await getToken({ req: request });
    if (session !== null) {
      return NextResponse.redirect(new URL('/main', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/main')) {
    const session = await getToken({ req: request });
    if (session == null) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/chatroom')) {
    const session = await getToken({ req: request });
    if (session == null) {
      return NextResponse.redirect(new URL('/', request.url));
    } else {
      const currChatroomID = request.nextUrl.pathname.split('/chatroom/')[1];
      const userChatroomID = session.user.chatroomID;
      if (currChatroomID !== userChatroomID) {
        return NextResponse.redirect(new URL('/main', request.url));
      }
    }
  }
}