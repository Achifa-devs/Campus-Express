import React from 'react';
import './styles/skeleton.css'; // Import the CSS for styling

const SkeletonLoader = ({ width, height }) => {
  return (
    <div className="skeleton-loader" style={{ width, height }}></div>
  );
};

export default SkeletonLoader;
