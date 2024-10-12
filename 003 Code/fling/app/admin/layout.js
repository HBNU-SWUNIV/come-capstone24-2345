'use client';

import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname().split('/')[2];

  const menuItems = [
    { name: '대학인증 관리', path: '/admin/univCert' },
    { name: '문의내역 관리', path: '/admin/inquiry' },
    { name: '신고내역 관리', path: '/admin/report' },
    { name: '플링 메인페이지', path: '/main/home' },
  ];
  return (
    <div className='w-full h-dvh flex flex-col'>
      <Navbar
        classNames={{
          base: 'bg-gray-400 text-white',
        }}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarBrand>
          <p className='font-bold text-inherit'>
            {pathname === 'univCert'
              ? '대학인증 관리'
              : pathname === 'inquiry'
                ? '문의내역 관리'
                : pathname === 'report'
                  ? '신고내역 관리'
                  : '관리 페이지'}
          </p>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
        </NavbarContent>
        <NavbarMenu className='w-full max-w-[440px] min-w-[330px] fixed top-[64px] left-1/2 transform -translate-x-1/2 z-[9999] flex gap-[20px] items-center px-[30px] py-[25px] bg-black/30 text-white'>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item.name}-${index}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === menuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                className='w-full'
                href={item.path}
                size='lg'
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <div className='flex-1 w-full flex flex-col py-[20px] px-[40px] gap-[20px] text-start'>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
