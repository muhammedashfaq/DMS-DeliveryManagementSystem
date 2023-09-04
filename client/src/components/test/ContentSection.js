import React from 'react';

const ContentSection = ({ title, content }) => {
  return (
    <div className="section-content">
      <h2 className="text-lg uppercase">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default ContentSection;
