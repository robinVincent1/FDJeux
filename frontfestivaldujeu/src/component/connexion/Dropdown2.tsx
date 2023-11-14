import React, { ChangeEvent, useState } from 'react';

interface Dropdown2Props {
    propo: (value: boolean) => void;
  }
  

const Dropdown2: React.FC<Dropdown2Props> = ({propo}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if(event.target.value == "P") {
        propo(true)
    }
    else {
        propo(false)
    }
  };

  return (
    <div>
      <label htmlFor="dropdown">Hebergement :</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="P">Proposition</option>
        <option value="R">Recherche</option>
        <option value="Ri">Rien</option>
      </select>
    </div>
  );
};

export default Dropdown2;