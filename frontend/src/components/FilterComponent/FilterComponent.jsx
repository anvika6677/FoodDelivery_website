// src/components/FilterComponent.js
import React, { useState } from 'react';

const FilterComponent = ({ onFilterChange }) => {
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      cuisine: selectedCuisine,
      rating: selectedRating,
    });
  };

  return (
    <div className="filter-container">
      <select onChange={(e) => setSelectedCuisine(e.target.value)}>
        <option value="">Select Cuisine</option>
        <option value="Indian">Indian</option>
        <option value="Chinese">Chinese</option>
        <option value="Italian">Italian</option>
      </select>

      <select onChange={(e) => setSelectedRating(e.target.value)}>
        <option value="">Select Rating</option>
        <option value="4">4 stars and above</option>
        <option value="3">3 stars and above</option>
      </select>

      <button onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default FilterComponent;
