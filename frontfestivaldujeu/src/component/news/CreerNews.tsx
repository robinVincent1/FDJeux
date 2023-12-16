import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

export const CreerNews = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  const handleTitreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitre(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAjouterClick = () => {
    console.log("Titre:", titre);
    console.log("Description:", description);
  };

  return (
    <div>
      <div className="pb-4 flex justify-center">
        <TextField
          onChange={handleTitreChange}
          fullWidth
          label="Ajoutez le titre ici !"
          id="fullWidth"
          size="medium"
          sx={{ width: "70%" }}
        />
      </div>
      <div className="pb-4 flex justify-center">
        <TextField
          onChange={handleDescriptionChange}
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
          onClick={handleAjouterClick}
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
