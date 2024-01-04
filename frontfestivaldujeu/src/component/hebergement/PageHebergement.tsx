import { useEffect, useState } from "react";
import { HebergementDeroulement } from "./HebergementDeroulement";
import { Heber } from "./TypeHebergement";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const PageHebergement = () => {
  const [listeHeber, setListeHeber] = useState<Heber[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Appel API pour récupérer toutes les questions avec réponses
    fetch("http://localhost:8080/hebergement", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListeHeber(data);
        console.log(data);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des hebergements :",
          error
        )
      );
  }, []);

  const handleEnvoyerClick = () => {
    navigate("/propositionHebergement");
  };

  // Fonction pour supprimer un hebergement
  const deleteHebergement = async (HebergementId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/hebergement/${HebergementId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Hebergement supprimée avec succès");
        return response.json();
      } else {
        console.error(
          `Erreur lors de la suppression de l'hebergement. Statut ${response.status}`
        );
      }
    } catch (error: any) {
      console.error(
        "Erreur lors de la suppression de l hebergement :",
        error.message
      );
    }
  };

  const handleDeleteHebergement = (id: string) => {
    const confirmDelete = window.confirm(
      "Etes-vous sur de vouloir supprimer cette proposition ?"
    );
    if (confirmDelete) {
      deleteHebergement(id)
      .catch((error) => {
        console.error('Erreur lors de la suppression de l hebergement :', error.message);
      });
      setListeHeber((hebergements) => hebergements.filter((heber) => heber.idHebergement !== id))
    }
  };

  return (
    <div>
      <div className="flex justify-center p-8">
        <Button
          onClick={handleEnvoyerClick}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "100%" }}
        >
          Ajouter une proposition
        </Button>
      </div>
      <div className="flex justify-center"></div>
      {listeHeber.map((e) => (
        <HebergementDeroulement heber={e} deleteH={() => handleDeleteHebergement(e.idHebergement)}/>
      ))}
    </div>
  );
};
