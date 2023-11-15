import React, { useState, ChangeEvent } from "react";
import { User } from "./AdminPage";
import "../output.css"
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';


type ProfilUserModifiableProps = {
    u: User;
  };
  

export const ProfilUserModifiable = ({u}: ProfilUserModifiableProps) => {
  const [modif, setModif] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="border ">
        <div>
        {u.pseudo}
        </div>
      
      <p>
        <div className="">
        {u.name}
        </div>
        <div>
        {u.email}
        </div>
        {modif ? (
          <button
            onClick={() => {
              return setModif(false);
            }}
          >
             Role : <strong> {u.role}</strong>
          </button>
        ) : (
          <div>
            <label htmlFor="dropdown">Role :</label>
            <select
              id="dropdown"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="Admin">Admin</option>
              <option value="Référent">Référent</option>
              <option value="Responsable soirée découverte">
                Résponsable soirée découverte
              </option>
              <option value="Accueil bénévole">Accueil bénévole</option>
              <option value="Bénévole">Bénévole</option>
            </select>
            <button
            onClick={() => {
                return setModif(true);
            }}
            > <CheckCircleOutlineRoundedIcon /></button>
          </div>
        )}
      </p>
    </div>
  );
};