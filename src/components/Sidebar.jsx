import React from 'react';

const Sidebar = ({ selections }) => {
  const renderSelection = (label, value) => (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900 capitalize">{value || '-'}</p>
    </div>
  );

  return (
    <aside className="w-80 bg-white p-[8px] border-r border-gray-200">
      <h2 className="text-lg font-bold text-gray-800 mb-2">SKINSTRIC</h2>
      <p className="text-sm text-gray-500 mb-8">A.I. ANALYSIS</p>
      
      <div className="space-y-6">
        <h3 className="text-md font-semibold text-gray-800 border-b pb-2">YOUR ACTUALS</h3>
        {renderSelection('Race', selections.race)}
        {renderSelection('Age', selections.age)}
        {renderSelection('Gender', selections.gender)}
      </div>
    </aside>
  );
};

export default Sidebar;
