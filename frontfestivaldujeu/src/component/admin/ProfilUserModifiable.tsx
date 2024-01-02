import React, { useState, ChangeEvent } from "react";
import { User } from "./AdminPage";
import "../output.css";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type ProfilUserModifiableProps = {
  u: User;
  idFestival: string;
  onRoleUpdate: () => void;
};

export const ProfilUserModifiable = ({
  u,
  idFestival,
  onRoleUpdate,
}: ProfilUserModifiableProps) => {
  const [modif, setModif] = useState(true);

  const handleSelectChange = ( event: SelectChangeEvent<string>) => {
    setNouveauRole(event.target.value as string);
  };

  const [ancienRole, setAncienRole] = useState(u.role);
  const [nouveauRole, setNouveauRole] = useState(u.role);

  const ModifRole = async () => {
    const idUser = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `http://localhost:8080/user/ModifRole/${idUser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: nouveauRole,
          }),
        }
      );

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la modification :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("Modification réussie :", data);
        onRoleUpdate();
      }
    } catch (error: any) {
      console.error("Erreur lors de la modification :", error.message);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/festival/ModifRoleUser/${idFestival}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nouveauRole: nouveauRole,
            ancienRole: ancienRole,
          }),
        }
      );

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la modification :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("Modification réussie :", data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la modification :", error.message);
    }
  };

  return (
    <div className="p-2">
      <div className="  flex justify-center shadow-xl rounded-lg ">
        <div className="p-4">
          <div className="text-md font-bold">
            {u.firstName} {u.lastName}
          </div>
          <div className=" text-sm">{u.pseudo}</div>
          <div className="text-sm">{u.email}</div>
          {modif ? (
            <button
              className="border rounded p-2"
              onClick={() => {
                ModifRole();
                return setModif(false);
              }}
            >
              <strong> {u.role}</strong>
            </button>
          ) : (
            <div className="p-4 flex">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={nouveauRole}
                  label="Hebergement"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Référent">Référent</MenuItem>
                  <MenuItem value="Résponsable soirée">Réspo soirée</MenuItem>
                  <MenuItem value="Accueil bénévole">A. bénévole</MenuItem>
                  <MenuItem value="Bénévole">Bénévole</MenuItem>
                </Select>
              </FormControl>
              <button
                className="pl-2"
                onClick={() => {
                  ModifRole();
                  return setModif(true);
                }}
              >
                <CheckCircleOutlineRoundedIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
