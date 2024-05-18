import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/" className="text-xl font-bold">AppName</Link>
      <nav>
        <Link to="/settings" className="p-2">설정</Link>
      </nav>
    </header>
  );
};

export default Header;
