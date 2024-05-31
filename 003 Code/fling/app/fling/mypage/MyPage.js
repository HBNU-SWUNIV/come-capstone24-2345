import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';

const MyPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header title="플링" />
      <div className="flex flex-col items-center p-4 flex-grow overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-pink-500 rounded-full"></div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">국립한밭대학교</h2>
              <p className="text-sm text-gray-500">컴퓨터공학과</p>
              <p className="text-sm text-gray-500 flex items-center">
                나를 한 줄로 표현하자면? <i className="icon-edit ml-1"></i>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md mt-4 p-4">
          <Link to="/profile-edit" className="flex items-center justify-between">
            <span className="text-gray-700">프로필 수정</span>
            <i className="icon-chevron-right"></i>
          </Link>
        </div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md mt-4 p-4">
          <Link to="/hobbies" className="flex items-center justify-between">
            <span className="text-gray-700">나의 취미</span>
            <i className="icon-chevron-right"></i>
          </Link>
        </div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md mt-4 p-4">
          <Link to="/personality" className="flex items-center justify-between">
            <span className="text-gray-700">나의 성격</span>
            <i className="icon-chevron-right"></i>
          </Link>
        </div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md mt-4 p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">대학교 인증</span>
            <span className="text-purple-600">인증완료</span>
            <i className="icon-chevron-right"></i>
          </div>
        </div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md mt-4 p-4">
          <Link to="/settings" className="flex items-center justify-between">
            <span className="text-gray-700">설정</span>
            <i className="icon-chevron-right"></i>
          </Link>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default MyPage;
