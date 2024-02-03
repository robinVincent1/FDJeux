import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Tableau from "./tableau";
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";
import Navbar from "../layout/Navbar";
import Loader from "../layout/Loader";

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
        const response = await fetch(`http://localhost:8080/user/${id}`, {
          method: "GET", // Remplacez 'GET' par la méthode que vous souhaitez utiliser
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

  useEffect(() => {
    // Appel API pour récupérer tous les festivals
    fetch("http://localhost:8080/festival", {
      method: "GET", // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setListe(data))
      .then((data) => console.log(data))
      .then(() => setLoad(0))
      .catch((error) =>
        console.error("Erreur lors de la récupération des festivals :", error)
      );
  }, [maj]);

  const [loading, setLoading] = useState<boolean>(true);
  const [load, setLoad] = useState(-1);

  useEffect(() => {
    if (load !== -1) {
      setLoading(false);
    }
  }, [load]);

  return (
    <div>
      {loading ? (
        <div>
          <div>
            <Navbar />
          </div>
          <div>
            <Loader />
          </div>
        </div>
      ) : (
        <div>
          <Navbar />
          <h1 className="flex justify-center p-16 font-bold text-2xl text-[#0A5483] font-serif">
            {" "}
            FESTIVALS
          </h1>
          <div className="pt-16 p-4">
            {liste.length > 0 ? (
              <Tableau listeFesti={liste} maj={MAJ} u={userConnected} />
            ) : (
              <p>Aucun festival disponible.</p>
            )}
          </div>

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
        </div>
      )}
    </div>
  );
};
