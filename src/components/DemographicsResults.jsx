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
    <div className="category-container">
      <h3 className="category-title">{title}</h3>
      <ul className="category-list">
        {items.map(({ key, value }) => (
          <li
            key={key}
            className="category-item"
            onClick={() => onSelect(categoryKey, key)}
          >
            <span className="category-key">{key}</span>
            <span className="category-value">{formatScore(value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="demographics-results-grid">
      {renderCategory('RACE', race, 'race')}
      {renderCategory('AGE', age, 'age')}
      {renderCategory('GENDER', gender, 'gender')}
    </div>
  );
};

export default DemographicsResults;
