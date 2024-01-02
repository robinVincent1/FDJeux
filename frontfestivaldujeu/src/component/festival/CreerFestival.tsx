import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Festival } from "./PageFestival";

export const CreerFestival = () => {
  const [nom, setNom] = useState("");
  const handleTitreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNom(e.target.value);
  };

  const [date, setDate] = useState("");
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const nav = useNavigate();

  const creerFestival = async () => {
    if (date !== "" && nom !== "") {
        const nouveauFestival = {
            nom: nom,
            date: date,
            nbReferent: 0,
            nbRespoSoiree: 0,
            nbAccueilBenevole: 0,
            nbBenevole: 0,
            enCours: true,
            idPlanning: "",
        }
        try {
          const response = await fetch('http://localhost:8080/festival', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nouveauFestival),
          });
      
          if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
          }
      
          const data = await response.json();
          console.log('Festival créé avec succès:', data);
          return data;
        } catch (error: any) {
          console.error('Erreur lors de la création du festival:', error.message);
        }
    }
  };

  return (
    <div>
      <div className="p-4">
        <Button
          onClick={() => (nav("/festival"))}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "10%" }}
        >
          Retour
        </Button>
      </div>

      <div className="p-4 flex justify-center">
        <TextField
          onChange={handleTitreChange}
          fullWidth
          label="Nom du festival"
          id="fullWidth"
          size="medium"
          sx={{ width: "70%" }}
        />
      </div>

      <div className="p-4 flex justify-center">
        <TextField
          onChange={handleDateChange}
          fullWidth
          label="Date"
          id="fullWidth"
          size="medium"
          sx={{ width: "70%" }}
        />
      </div>

      <div className="p-4">
        <Button
          onClick={() => (creerFestival())}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "10%" }}
        >
          Créer
        </Button>
      </div>
    </div>
  );
};
