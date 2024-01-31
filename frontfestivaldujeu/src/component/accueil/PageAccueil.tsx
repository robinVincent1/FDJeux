import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const[maj, setMaj] = useState(false);

  const setMajToggle = () => {
    setMaj(!maj);
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
    // Appel API pour récupérer le festival
    fetch("http://localhost:8080/festival/enCours", {
      method: 'GET', // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setFesti(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération du festival :", error)
      );
  }, [navigate, maj]);

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

  useEffect(() => {
    // Cet effet s'exécutera chaque fois que userConnected ou festi sera mis à jour
    const checkInscriptionStatus = async () => {
      setIsInscrit(userConnected.idFestival == festi.idFestival);
    };

    checkInscriptionStatus();
  }, [userConnected]);

  useEffect(() => {
    // Appel API pour récupérer toutes les news
    fetch("http://localhost:8080/news/fav", {
      method: 'GET', // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setListeNewsFav(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des infos :", error)
      );
  }, []);

  useEffect(() => {
    // Appel API pour récupérer toutes les infos
    fetch("http://localhost:8080/infos", {
      method: 'GET', // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    createRepas(1)
    createRepas(2)
    createRepas(3)
    setIsInscrit(true);
    setMajToggle();
  };

  const createRepas = async (repas: number) => {
    const idUser = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:8080/repas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          idUser: idUser,
          idFestival: festi.idFestival,
          repas: repas,
          etat: 0,
        }),
      });

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la création:", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("Créationréussie :", data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la création :", error.message);
    }
  }


  return (
    <div className="bg-grey min-h-screen">
      <h1 className="p-16 text-xl font-bold flex justify-center ">
        <p className="  text-[#0A5483]">Bienvenue sur le site du Festival du Jeu de Montpellier !</p>
      </h1>
      <div className=" flex justify-center break-words p-4 bg-[#0E8DDF]">
        {listeInfos.map((e) => (
          <InfosDeroulement
            inf={e}
            onDelete={() => deleteInfo(e.idInfos)}
            isAdmin={admin}
          />
        ))}
        {admin ? (
          <Link
            to="/admin/creerinfos"
            className="text-white p-4 flex justify-center items-center"
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
          <p className=" p-2 bg-[#62B862] text-white rounded-lg">
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
      <div className="pt-4 grid gap-4 " style={{ gridTemplateColumns: `repeat(${listeNewsFav.length}, minmax(0, 1fr))` }}>
  {listeNewsFav.map((e) => (
    <div className="p-2 ">
      <NewsFav news={e} />
    </div>
  ))}
</div>

    </div>
  );
};
