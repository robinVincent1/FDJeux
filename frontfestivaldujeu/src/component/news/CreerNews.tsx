import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";

export const CreerNews = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const naviguate = useNavigate();

  const handleTitreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitre(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const [userConnected, setUserConnected] = useState<User>(robin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:8080/user/${id}`, {
          method: 'GET', // Remplacez 'GET' par la méthode que vous souhaitez utiliser
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
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

  const createNews = async (titre: string, description: string, createur: string) => {
    try {
      const response = await fetch('http://localhost:8080/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          createur: createur,
          titre: titre,
          description: description,
          favori: false,
        }),
      });
      if (!response.ok) {
        // Si la réponse n'est pas dans la plage 200, gérer l'erreur
        throw new Error(`Erreur lors de la création de l'information: ${response.statusText}`);
      }
  
      // Analyser la réponse JSON
      const createdNews = await response.json();
      console.log('Information créée avec succès:', createdNews);
      naviguate("/news")
  
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'information:', error.message);
      // Gérer l'erreur, par exemple, afficher un message à l'utilisateur.
    }
  };
  

  const handleAjouterClick = () => {
    createNews(titre, description, userConnected.firstName)
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
