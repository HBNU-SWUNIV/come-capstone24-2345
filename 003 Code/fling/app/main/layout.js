import { getServerSession } from 'next-auth';
import BottomNav from './BottomNav';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import React, { Children, cloneElement, isValidElement } from 'react';

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login', 'replace');
  } else {
    console.log(session);
  }

  // const childrenWithProps = Children.map(children, (child) => {
  //   if (isValidElement(child)) {
  //     return cloneElement(child, { userInfo: session.user });
  //   }
  //   return child;
  // });

  if (session) {
    return (
      <>
        <div userinfo={session.user}>{children}</div>
        <BottomNav />
      </>
    );
  }
};

export default Layout;
