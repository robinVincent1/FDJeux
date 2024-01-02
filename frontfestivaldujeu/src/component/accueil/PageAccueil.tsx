import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../output.css";
import { Infos } from "../infosPratiques/PageInfos";
import { InfosDeroulement } from "../infosPratiques/InfosDeroulement";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { NewsType } from "../news/NewsPage";
import { NewsFav } from "./NewsFav";
import { Festival, test } from "../festival/PageFestival";
import TableauAcc from "./TableauAcc";
import { Button } from "@mui/material";
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";

export const PageAccueil = () => {
  const [listeInfos, setListeInfos] = useState<Infos[]>([]);
  const [listeNewsFav, setListeNewsFav] = useState<NewsType[]>([]);
  const [festi, setFesti] = useState<Festival>(test);
  const [userConnected, setUserConnected] = useState<User>(robin);
  const [admin, setAdmin] = useState(false);
  const [isInscrit, setIsInscrit] = useState(false);

  useEffect(() => {
    // Appel API pour récupérer le festival
    fetch("http://localhost:8080/festival/enCours")
      .then((response) => response.json())
      .then((data) => setFesti(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération du festival :", error)
      );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:8080/user/${id}`);
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
  }, [userConnected]);

  useEffect(() => {
    // Cet effet s'exécutera chaque fois que userConnected ou festi sera mis à jour
    const checkInscriptionStatus = async () => {
      setIsInscrit(userConnected.idFestival == festi.idFestival);
    };

    checkInscriptionStatus();
  }, [userConnected, festi]);

  useEffect(() => {
    // Appel API pour récupérer toutes les news
    fetch("http://localhost:8080/news/fav")
      .then((response) => response.json())
      .then((data) => setListeNewsFav(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des infos :", error)
      );
  }, []);

  useEffect(() => {
    // Appel API pour récupérer toutes les infos
    fetch("http://localhost:8080/infos")
      .then((response) => response.json())
      .then((data) => setListeInfos(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des infos :", error)
      );
  }, []);

  const deleteInfo = async (id: string) => {
    try {
      await fetch(`http://localhost:8080/infos/${id}`, {
        method: "DELETE",
      });

      setListeInfos((infos) => infos.filter((info) => info.idInfos !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'information :", error);
    }
  };

  const InscriptionFesti = async (festivalId: string, flexible: boolean) => {
    const id = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:8080/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          festivalId: festivalId,
          flexible: flexible,
        }),
      });

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la modification :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("Modification réussie :", data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la modification :", error.message);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/festival/${festi.idFestival}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: userConnected.role,
            id: festi.idFestival,
          }),
        }
      );

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la modification :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("Modification réussie :", data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la modification :", error.message);
    }
    setIsInscrit(true);
  };

  return (
    <div className="bg-grey min-h-screen">
      <h1 className="p-4 text-xl font-bold flex justify-center">
        Bienvenue sur le site du Festival du Jeu de Montpellier !
      </h1>
      <div className=" flex justify-center break-words pt-8">
        {listeInfos.map((e) => (
          <InfosDeroulement
            inf={e}
            onDelete={() => deleteInfo(e.idInfos)}
            isAdmin={admin}
          />
        ))}
        {admin ? (
          <Link
            to="/creerinfos"
            className="text-[#3379FF] p-4 flex justify-center items-center"
          >
            <AddCircleRoundedIcon />
          </Link>
        ) : null}
      </div>
      <div className="p-8">
        <TableauAcc Festi={festi} />
      </div>
      <div className="p-2 flex justify-center">
        {isInscrit ? (
          <p>
            Vous êtes inscrit à ce festival !
          </p>
        ) : (
          <div className="flex">
            <div className="p-2 flex justify-center">
              <Button
                onClick={() => {
                  InscriptionFesti(test.idFestival, false);
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ width: "100%" }}
              >
                S'inscrire
              </Button>
            </div>
            <div className="p-2 flex justify-center">
              <Button
                onClick={() => {
                  InscriptionFesti(test.idFestival, true);
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ width: "100%" }}
              >
                S'inscrire (flexible)
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="pt-4">
        {listeNewsFav.map((e) => (
          <div className="p-2">
            <NewsFav news={e} />
          </div>
        ))}
      </div>
    </div>
  );
};
