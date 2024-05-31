import { redirect } from 'next/navigation';

const { authOptions } = require('@/pages/api/auth/[...nextauth]');
const { getServerSession } = require('next-auth');

const LoginLayout = async ({ children }) => {
  let session = await getServerSession(authOptions);

  if (session != null) {
    redirect('/fling/main');
  } else {
    console.log('세션 없음');
  }

  return <>{children}</>;
};

export default LoginLayout;
