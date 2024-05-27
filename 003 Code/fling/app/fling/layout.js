import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const FlingLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log(session);
  } else {
    // alert('로그인 후 이용해 주세요');
    redirect('/');
  }
  return <>{children}</>;
};

export default FlingLayout;
