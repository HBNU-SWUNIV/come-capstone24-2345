import { getServerSession } from 'next-auth';
import ClientComponent from './ClientComponent';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import HeaderComponent from './HeaderComponent';

const ChatPage = async () => {
  let session = await getServerSession(authOptions);

  return (
    <>
      <HeaderComponent currUser={session.user} />
      <ClientComponent currUser={session.user} />
    </>
  );
};

export default ChatPage;
