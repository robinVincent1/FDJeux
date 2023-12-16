import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreerInfosPage = () => {
  const navigate = useNavigate(); // Utilisation de useNavigate pour gérer la redirection

  const [newTitre, setNewTitre] = useState("");
  const handTit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitre(event.target.value);
  };

  const [newDes, setNewDes] = useState("");
  const handDes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDes(event.target.value);
  };

  const send = () => {
    // Envoyer à la BD si nécessaire

    // Rediriger vers la page "/accueil"
    navigate("/accueil");
  };

  return (
    <div className="p-8">
        <h1 className="font-bold flex justify-center text-xl p-8">
            Création Information 
        </h1>
      <div className="pb-4 flex justify-center">
        <TextField
          onChange={handTit}
          fullWidth
          label="Ajoutez le titre ici !"
          id="fullWidth"
          size="medium"
          sx={{ width: "70%" }}
        />
      </div>
      <div className="pb-4 flex justify-center">
        <TextField
          onChange={handDes}
          fullWidth
          multiline
          rows={4}
          label="Ajoutez la description ici !"
          id="fullWidth"
          size="medium"
          sx={{ width: "70%" }}
        />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={send}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "10%" }}
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
};
