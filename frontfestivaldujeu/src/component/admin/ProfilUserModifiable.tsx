import React, { useState, ChangeEvent } from "react";
import { User } from "./AdminPage";
import "../output.css";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

type ProfilUserModifiableProps = {
  u: User;
};

export const ProfilUserModifiable = ({ u }: ProfilUserModifiableProps) => {
  const [modif, setModif] = useState(true);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="p-2">
      <div className="  flex justify-center shadow-xl rounded-lg ">
        <div className="p-4">
          <div className="text-md font-bold">{u.name}</div>
          <div className=" text-sm">{u.pseudo}</div>
          <div className="text-sm">{u.email}</div>
          {modif ? (
            <button
              className="border rounded p-2"
              onClick={() => {
                return setModif(false);
              }}
            >
              <strong> {u.role}</strong>
            </button>
          ) : (
            <div>
              <label htmlFor="dropdown"></label>
              <select
                className="text-xs"
                id="dropdown"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="Admin">Admin</option>
                <option value="Référent">Référent</option>
                <option value="Réspo soirée">Réspo soirée</option>
                <option value="Accueil bénévole">Accueil bénévole</option>
                <option value="Bénévole">Bénévole</option>
              </select>
              <button
                className="pl-2"
                onClick={() => {
                  return setModif(true);
                }}
              >
                {" "}
                <CheckCircleOutlineRoundedIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
