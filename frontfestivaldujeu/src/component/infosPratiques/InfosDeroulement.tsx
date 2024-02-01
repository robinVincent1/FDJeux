import React from "react";
import { Infos } from "./PageInfos";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface InfosDeroulementProps {
  inf: Infos;
  onDelete: () => void;
  isAdmin: boolean;
}

export const InfosDeroulement: React.FC<InfosDeroulementProps> = ({
  inf,
  onDelete,
  isAdmin,
}) => {
  const handleDeleteInfos = async () => {
    const confirmDelete = window.confirm(
      "Etes-vous sur de vouloir supprimer cette information ?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/infos/${inf.idInfos}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 204) {
          // Suppression réussie
          onDelete(); // Appeler la fonction onDelete pour mettre à jour l'état parent
        } else {
          // Gérer d'autres statuts de réponse en conséquence
          console.error(
            `Erreur lors de la suppression de l'information. Statut ${response.status}`
          );
        }
      } catch (error: any) {
        console.error(
          "Erreur lors de la suppression de l'information:",
          error.message
        );
      }
      console.log("Question deleted!");
    }
  };

  return (
    <div className=" p-2 ml-2 mr-2 break-words">
      <h1 className="flex font-bold text-white p-2">
      <div className="pr-4">
        {isAdmin &&
          <IconButton aria-label="delete" color="error" onClick={handleDeleteInfos}>
            <DeleteIcon />
          </IconButton>
        }
      </div>
        {inf.titre}
      </h1>
      <div className="flex justify-center text-white break-words p-">
        {inf.description}
      </div>
    </div>
  );
};
