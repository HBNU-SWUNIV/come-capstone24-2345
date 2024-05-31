import React from 'react';
import Header from '../components/Header';

const PersonalityPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header title="나의 성격" />
      <div className="flex flex-col items-center p-4 flex-grow overflow-y-auto">
        {/* Your personality form */}
      </div>
    </div>
  );
};

export default PersonalityPage;
