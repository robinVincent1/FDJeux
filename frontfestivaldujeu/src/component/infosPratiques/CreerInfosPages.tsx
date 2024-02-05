import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const CreerInfosPage = () => {
  const createInfo = async (titre: string, description: string) => {
    try {
      const response = await fetch("https://festival-jeu-mtp-api.onrender.com/infos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // Ajoutez d'autres en-têtes nécessaires ici
        },
        body: JSON.stringify({
          titre: titre,
          description: description,
        }),
      });

      if (!response.ok) {
        // Si la réponse n'est pas dans la plage 200, gérer l'erreur
        throw new Error(
          `Erreur lors de la création de l'information: ${response.statusText}`
        );
      }

      // Analyser la réponse JSON
      const createdInfo = await response.json();
      console.log("Information créée avec succès:", createdInfo);

      // Vous pouvez également effectuer d'autres actions ici, par exemple, mettre à jour l'état de votre composant React.
    } catch (error: any) {
      console.error(
        "Erreur lors de la création de l'information:",
        error.message
      );
      // Gérer l'erreur, par exemple, afficher un message à l'utilisateur.
    }
    navigate("/accueil");
  };

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
    createInfo(newTitre, newDes);
  };

  return (
    <div className="p-8">
      <Link
        to="/accueil"
        className="border text-[#3379FF] rounded p-2 border-[#3379FF] hover:text-white hover:bg-[#3379FF]"
      >
        Retour
      </Link>
      <h1 className="flex justify-center p-16 font-bold text-2xl text-[#0A5483] font-serif">
        {" "}
        INFORMATION
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
