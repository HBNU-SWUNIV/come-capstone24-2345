import HeaderComponent from '../HeaderComponent';

const ChatLayout = ({ children }) => {
  return (
    <>
      <HeaderComponent pageName='채팅' />
      {children}
    </>
  );
};

export default ChatLayout;
