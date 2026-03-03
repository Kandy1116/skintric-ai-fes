import React from 'react';

const DemographicsResults = ({ data, onSelect }) => {
  
  const formatScore = (score) => (score * 100).toFixed(2) + '%';

  const sortAndFormat = (category) => {
    if (!data || !data[category]) return [];
    return Object.entries(data[category])
      .sort(([, a], [, b]) => b - a)
      .map(([key, value]) => ({ key, value }));
  };

  const race = sortAndFormat('race');
  const age = sortAndFormat('age');
  const gender = sortAndFormat('gender');

  const renderCategory = (title, items, categoryKey) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ul className="divide-y divide-gray-200">
        {items.map(({ key, value }) => (
          <li 
            key={key} 
            className="flex justify-between items-center py-3 cursor-pointer group"
            onClick={() => onSelect(categoryKey, key)}
          >
            <span className="capitalize text-gray-600 group-hover:text-blue-600 transition-colors">{key}</span>
            <span className="font-mono text-gray-800 group-hover:text-blue-600 transition-colors">{formatScore(value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {renderCategory('Race', race, 'race')}
      {renderCategory('Age', age, 'age')}
      {renderCategory('Gender', gender, 'gender')}
    </div>
  );
};

export default DemographicsResults;
