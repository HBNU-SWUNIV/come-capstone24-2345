import React from 'react';
import Header from '../components/Header';

const ProfileEditPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header title="프로필" />
      <div className="flex flex-col items-center p-4 flex-grow overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">프로필 사진</h2>
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500">+</span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">본인확인이 가능한 정면사진</p>
            <p className="text-sm text-gray-500">사진은 이미지 변환 처리됨</p>
            <p className="text-sm text-gray-500">사진은 공개되지 않음</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
