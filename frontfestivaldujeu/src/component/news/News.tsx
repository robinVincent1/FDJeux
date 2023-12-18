import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

type Props = {
    titre: string,
    description: string,
    createur: string,
    favori: boolean,
    id: string,
    onDelete: () => void,
}

export const News = ({ titre, description, createur, favori, id, onDelete }: Props) => {
    const [admin, setAdmin] = useState(true);
    const [fav, setFav] = useState(favori);

    const handleDeleteNews = async (id: string) => {
        const confirmDelete = window.confirm(
          "Etes-vous sur de vouloir supprimer cette information ?"
        );
        if (confirmDelete) {
            console.log(id)
            try {
                const response = await fetch(`http://localhost:8080/news/${id}`, {
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
        <div className=" p-4 rounded  shadow-2xl">
            <p className="font-bold ">{titre}</p>
            <p>{description}</p>
            <p className="italic">{createur}</p>
            <div className="">
            {admin ? (
                <div className="">
                    <button onClick={() => handleDeleteNews(id)}>
                        <DeleteIcon />
                    </button>
                    <button className={`text-${fav ? 'red' : 'black'}-500`}
                    onClick={() => {
                        setFav(!fav);
                    }}
                    >
                        <StarIcon />
                    </button>
                </div>
            ) : null}
            </div>
        </div>
    );
};
