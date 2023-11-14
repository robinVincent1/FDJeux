import React, { ChangeEvent, useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Association :</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Aucune</option>
      </select>
    </div>
  );
};

export default Dropdown;