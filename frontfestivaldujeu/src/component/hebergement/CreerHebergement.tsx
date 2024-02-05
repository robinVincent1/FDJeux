import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";

export const CreerHebergement = () => {
  const [titre, setTitre] = useState("");
  const [adresse, setAdresse] = useState("");
  const [description, setDescription] = useState("");
  const [communication, setCommunication] = useState("");
  const [userConnected, setUserConnected] = useState<User>(robin);

  const handleComChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommunication(event.target.value);
  };

  const handleTitreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitre(event.target.value);
  };

  const handleAdresseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdresse(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserConnected(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchData();
  }, []);

  const createHeber = async (
    titre: string,
    description: string,
    adresse: string
  ) => {
    try {
      const response = await fetch("https://festival-jeu-mtp-api.onrender.com/hebergement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          createur: userConnected.firstName,
          titre: titre,
          description: description,
          adresse: adresse,
          communication: communication,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Erreur lors de la création de l'information: ${response.statusText}`
        );
      }

      // Analyser la réponse JSON
      const createdHeber = await response.json();
      console.log("Hebergement créée avec succès:", createdHeber);
    } catch (error: any) {
      console.error(
        "Erreur lors de la création de l'hebergement:",
        error.message
      );
    }
    naviguate("/hebergement");
  };

  const handleAjouterClick = () => {
    createHeber(titre, description, adresse);
  };
  const naviguate = useNavigate();

  return (
    <div>
      <div className="p-8">
      <Link
        to="/hebergement"
        className="border text-[#3379FF] rounded p-2 border-[#3379FF] hover:text-white hover:bg-[#3379FF]"
      >
        Retour
      </Link>
      </div>
      <h1 className="flex p-8 justify-center font-bold text-xl">
        Nouvelle Proposotion :
      </h1>
      <div className="pb-4 flex justify-center">
        <TextField
          onChange={handleTitreChange}
          fullWidth
          label="Ajoutez le titre de votre proposition ici !"
          id="fullWidth"
          size="medium"
          sx={{ width: "70%" }}
        />
      </div>
      <div className="pb-4 flex justify-center">
        <TextField
          onChange={handleAdresseChange}
          fullWidth
          label="Ajoutez l'adresse de votre hébergement ici !"
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
          label="Ajoutez la description de votre proposition ici !"
          id="fullWidth"
          size="medium"
          sx={{ width: "70%" }}
        />
      </div>
      <div className="pb-4 flex justify-center">
        <TextField
          onChange={handleComChange}
          fullWidth
          label="Ajoutez votre moyen de communication ici (téléphone, email...) !"
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
