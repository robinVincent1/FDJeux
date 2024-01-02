import React from "react";
import { Infos } from "./PageInfos";
import { Button } from "@mui/material";

interface InfosDeroulementProps {
    inf: Infos;
    onDelete: () => void;
    isAdmin: boolean
  }
  
  export const InfosDeroulement: React.FC<InfosDeroulementProps> = ({ inf, onDelete, isAdmin }) => {
    
    const handleDeleteInfos = async () => {
        const confirmDelete = window.confirm(
          "Etes-vous sur de vouloir supprimer cette information ?"
        );
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/infos/${inf.idInfos}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    // Ajoutez les en-têtes nécessaires, par exemple un token d'authentification si requis
                  },
                });
          
                if (response.status === 204) {
                  // Suppression réussie
                  onDelete(); // Appeler la fonction onDelete pour mettre à jour l'état parent
                } else {
                  // Gérer d'autres statuts de réponse en conséquence
                  console.error(`Erreur lors de la suppression de l'information. Statut ${response.status}`);
                }
              } catch (error: any) {
                console.error("Erreur lors de la suppression de l'information:", error.message);
              }
          console.log("Question deleted!");
        }
      };

    return (
        <div className=" p-2 ml-2 mr-2 break-words">
            <h1 className="flex font-bold text-white break-words p-2">
                {inf.titre}
            </h1>
            <div className="flex justify-center text-white break-words ">
                {inf.description}
            </div>
            <div className="flex justify-center">
            {isAdmin ? (
                <Button
                    onClick={handleDeleteInfos}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ width: "90%" }}
                >
                    Supprimer
                </Button>
            ) : null}
            </div>
        </div>
    );
};
