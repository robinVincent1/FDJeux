import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { NewsType } from "./NewsPage";
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";

type Props = {
  titre: string;
  description: string;
  createur: string;
  favori: boolean;
  id: string;
  onDelete: () => void;
  onUpdate: (updatedNews: NewsType) => void;
};

export const News = ({
  titre,
  description,
  createur,
  favori,
  id,
  onDelete,
  onUpdate,
}: Props) => {
  const [admin, setAdmin] = useState(true);
  const [userConnected, setUserConnected] = useState<User>(robin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:8080/user/${id}`, {
          method: "GET", // Remplacez 'GET' par la méthode que vous souhaitez utiliser
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserConnected(data);
        setAdmin(data.role === "admin");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchData();
  }, []);

  const handleDeleteNews = async (id: string) => {
    const confirmDelete = window.confirm(
      "Etes-vous sur de vouloir supprimer cette information ?"
    );
    if (confirmDelete) {
      console.log(id);
      try {
        const response = await fetch(`http://localhost:8080/news/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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
    <div
      className={`p-4 rounded-xl border shadow ${admin && "hover:shadow-xl"} ${favori && "shadow-2xl"} `}
      onClick={() => {
        if (admin) {
          const updateNews: NewsType = {
            idNews: id,
            createur: createur,
            titre: titre,
            description: description,
            favori: !favori,
          };
          onUpdate(updateNews);
        }
      }}
    >
      <p
        className={`text-[#0A5483] font-bold flex justify-center`}
      >
        {titre}
      </p>
      <p>{description}</p>
      <p className="italic">{createur}</p>
      <div className="">
        {admin ? (
          <div className="">
            <button className="text-[red]" onClick={() => handleDeleteNews(id)}>
              <DeleteIcon />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
