import HeaderComponent from '../HeaderComponent';

const Layout = ({ children }) => {
  return (
    <>
      <HeaderComponent pageName='홈' />
      {children}
    </>
  );
};

export default Layout;
