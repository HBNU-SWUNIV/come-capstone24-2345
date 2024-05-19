import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className='fixed bottom-0 left-0 right-0 flex justify-around items-center p-4 bg-white shadow-lg'>
      <NavLink to='/' exact className='nav-link' activeClassName='active'>
        홈
      </NavLink>
      <NavLink to='/search' className='nav-link' activeClassName='active'>
        검색
      </NavLink>
      <NavLink to='/messages' className='nav-link' activeClassName='active'>
        메시지
      </NavLink>
      <NavLink to='/profile' className='nav-link' activeClassName='active'>
        프로필
      </NavLink>
    </nav>
  );
};

export default NavigationBar;
