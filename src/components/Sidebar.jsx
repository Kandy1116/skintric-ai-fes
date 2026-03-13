import React from 'react';

const Sidebar = ({ userName, selections }) => {
  const renderSelection = (label, value) => (
    <div className="selection-item">
      <span className="selection-label">{label}</span>
      <span className="selection-value">{value || 'Not Selected'}</span>
    </div>
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="user-name">{userName}</h2>
      </div>
      <div className="sidebar-content">
        {renderSelection('RACE', selections.race)}
        {renderSelection('AGE', selections.age)}
        {renderSelection('GENDER', selections.gender)}
      </div>
    </aside>
  );
};

export default Sidebar;
