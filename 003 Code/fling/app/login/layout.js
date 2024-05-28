import { redirect } from 'next/navigation';

const { authOptions } = require('@/pages/api/auth/[...nextauth]');
const { getServerSession } = require('next-auth');

const LoginLayout = ({ children }) => {
  let session = getServerSession(authOptions);
  if (session) {
    redirect('/fling/main');
  }

  return <>{children}</>;
};

export default LoginLayout;
