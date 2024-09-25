import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { connectDB } from './util/database';

export async function middleware(request) {
  //   console.log(request);
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
      console.log('현재', currChatroomID);
      console.log('유저', userChatroomID);

      if (currChatroomID !== userChatroomID) {
        return NextResponse.redirect(new URL('/main', request.url));
      }
    }
  }
}
