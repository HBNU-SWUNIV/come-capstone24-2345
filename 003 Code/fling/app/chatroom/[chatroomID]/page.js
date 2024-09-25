import { getServerSession } from 'next-auth';
import ClientComponent from './ClientComponent';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

const ChatPage = async () => {
  let session = await getServerSession(authOptions);

  if (session) {
    // console.log(session.user);
    return <ClientComponent currUser={session.user} />;
  } else {
    redirect('/login');
  }
};

export default ChatPage;
