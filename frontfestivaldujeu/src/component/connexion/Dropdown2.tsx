import React, { ChangeEvent, useState } from "react";
import "../output.css";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Dropdown2Props {
  setHebergementState: (value: boolean) => void;
}

const Dropdown2: React.FC<Dropdown2Props> = ({ setHebergementState }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value === "P") {
      setHebergementState(true);
    } else {
      setHebergementState(false);
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Hebergement</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOption}
          label="Hebergement"
          onChange={handleSelectChange}
        >
          <MenuItem value="P">Proposition</MenuItem>
          <MenuItem value="R">Recherche</MenuItem>
          <MenuItem value="Ri">Rien</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown2;
