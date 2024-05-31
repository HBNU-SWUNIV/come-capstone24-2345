import React from 'react';
import Header from '../components/Header';

const SettingsPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header title="설정" />
      <div className="flex flex-col items-center p-4 flex-grow overflow-y-auto">
        {/* Your settings form */}
      </div>
    </div>
  );
};

export default SettingsPage;
