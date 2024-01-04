import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Tableau from "./tableau";
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";

export type Festival = {
  idFestival: string;
  nom: string;
  date: string;
  nbReferent: number;
  nbRespoSoiree: number;
  nbAccueilBenevole: number;
  nbBenevole: number;
  enCours: boolean;
  idPlanning: string;
};

export const test: Festival = {
  idFestival: "1",
  nom: "festi1",
  date: "31/04/2024",
  nbReferent: 5,
  nbRespoSoiree: 3,
  nbAccueilBenevole: 8,
  nbBenevole: 1,
  enCours: true,
  idPlanning: "",
};

export const PageFestival = () => {
  const nav = useNavigate();
  const [liste, setListe] = useState<Festival[]>([]);
  const [maj, setMaj] = useState(false);
  const [userConnected, setUserConnected] = useState<User>(robin);

  const MAJ = () => {
    setMaj(!maj);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:8080/user/${id}`);
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
  }, [userConnected]);

  useEffect(() => {
    // Appel API pour récupérer tous les festivals
    fetch("http://localhost:8080/festival", {
      method: 'GET', // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setListe(data))
      .then((data) => console.log(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des festivals :", error)
      );
  }, [maj]);

  return (
    <div>
      <div className="pt-16 p-4">
        <p className="p-8 font-bold flex justify-center text-[#0A5483] text-lg">
          Voici la liste des festivals :
        </p>
        {liste.length > 0 ? (
          <Tableau listeFesti={liste} maj={MAJ} u={userConnected} />
        ) : (
          <p>Aucun festival disponible.</p>
        )}
      </div>

      {userConnected.role == "admin" && (
        <div className="flex justify-center p-8">
          <Button
            onClick={() => {
              nav("/admin/CreerFestival");
            }}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ width: "20%" }}
          >
            Créer un festival
          </Button>
        </div>
      )}
    </div>
  );
};
