import React from 'react';

const TablePage: React.FC = () => {
  return (
    <>
      <div className="bg-primary-card p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <img src="/images/dineplus-logo.png" alt="DINE+ Logo" className="h-12" />
          <h1 className="text-xl font-bold">DINE+</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="image-placeholder bg-gray-300 rounded-lg h-48 mb-4 flex items-center justify-center">
          <span className="text-gray-500">Image Placeholder</span>
        </div>
      </div>
    </>
  );
};

export default TablePage;