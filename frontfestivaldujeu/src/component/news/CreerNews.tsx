import React, { useState } from "react";
import { TextField } from "@mui/material";

export const CreerNews = () => {

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  const handleAjouterClick = () => {
    console.log("Titre:", titre);
    console.log("Description:", description);
  };

  return (
    <div>
      <div className="flex justify-center p-4">
        <TextField
          id="filled-multiline-flexible"
          label="Titre"
          multiline
          maxRows={4}
          sx={{ width: "60%", margin: "0px" }}
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
      </div>
      <div className="flex justify-center pt-8">
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue=""
          sx={{ width: "80%", height: "200px", margin: "10px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="hover:bg-black border-black border hover:text-white p-2 rounded"
          onClick={handleAjouterClick}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};
