import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/dist/server/api-utils';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log(session);
    const client = await connectDB;
    const db = client.db('Fling');

    let result = await db
      .collection('user_cred')
      .find({
        email: session.user.email,
      })
      .toArray();

    if (result[0].role === 'admin') {
    } else {
      redirect('/fling/main');
    }
  } else {
    redirect('/fling/main');
  }
  return (
    <>
      <span>admin 페이지</span>
    </>
  );
};

export default AdminPage;
