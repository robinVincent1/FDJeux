import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { NewsType } from "./NewsPage";

type Props = {
    titre: string,
    description: string,
    createur: string,
    favori: boolean,
    id: string,
    onDelete: () => void,
    onUpdate: (updatedNews: NewsType) => void,
}

export const News = ({ titre, description, createur, favori, id, onDelete, onUpdate }: Props) => {
    const [admin, setAdmin] = useState(true);
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
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
            <p className="font-bold text-[#0A5483]">{titre}</p>
            <p>{description}</p>
            <p className="italic">{createur}</p>
            <div className="">
            {admin ? (
                <div className="">
                    <button onClick={() => handleDeleteNews(id)}>
                        <DeleteIcon />
                    </button>
                    <button className={`text-${favori ? '[red]' : 'black'}`}
                    onClick={() => {
                        const updateNews : NewsType = {
                          idNews: id,
                          createur: createur,
                          titre: titre,
                          description: description,
                          favori: !favori,
                        };
                        onUpdate(updateNews);
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
