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
import Navbar from "../layout/Navbar";
import Loader from "../layout/Loader";

export const PageAccueil = () => {
  const [listeInfos, setListeInfos] = useState<Infos[]>([]);
  const [listeNewsFav, setListeNewsFav] = useState<NewsType[]>([]);
  const [festi, setFesti] = useState<Festival>(test);
  const [userConnected, setUserConnected] = useState<User>(robin);
  const [admin, setAdmin] = useState(false);
  const [isInscrit, setIsInscrit] = useState(false);
  const [list_espace, setListEspace] = useState<any[]>([]);
  const [list_jeu, setListJeu] = useState<any[]>([]);
  const navigate = useNavigate();
  const [maj, setMaj] = useState(false);
  const [majtab, setmajtab] = useState(0);

  const setMajToggle = () => {
    setMaj(!maj);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    // Appel API pour récupérer le festival
    fetch("http://localhost:8080/festival/enCours", {
      method: "GET", // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setFesti(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération du festival :", error)
      );
  }, [navigate, maj, majtab]);

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
      method: "GET", // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setListeNewsFav(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des infos :", error)
      );
  }, []);

  useEffect(() => {
    getAllEspace().then((data) => setListEspace(data));
  }, []);

  useEffect(() => {
    // Appel API pour récupérer toutes les infos
    fetch("http://localhost:8080/infos", {
      method: "GET", // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setListeInfos(data))
      .then(() => setLoad(0))
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setListeInfos((infos) => infos.filter((info) => info.idInfos !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'information :", error);
    }
  };

  const handleJeuEspace = async (planZone: string) => {
    getJeubyEspace(planZone).then((data) => setListJeu(data));
    setmajtab(4);
  };

  const getJeubyEspace = async (planZone: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/csv/getjeu/${planZone}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("data jeu", data);
        return data;
      }
    } catch (error: any) {
      console.error("Erreur lors de la récupération :", error.message);
    }
  };

  const getAllEspace = async () => {
    try {
      const response = await fetch(`http://localhost:8080/csv/getallespace`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("data espace", data);
        return data;
      }
    } catch (error: any) {
      console.error("Erreur lors de la récupération :", error.message);
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    createRepas(1);
    createRepas(2);
    createRepas(3);
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  };

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
        <div className="bg-grey min-h-screen">
          <Navbar />

          <div className="p-8 fondAccueil">
            <div className="flex justify-center p-8 pb-16">
              <img
                className="place-content-center"
                src="https://scontent.fmpl1-1.fna.fbcdn.net/v/t39.30808-6/398170719_831679315627252_5908524801591238179_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=783fdb&_nc_ohc=nc7wPA_BJ9EAX8vwPW4&_nc_ht=scontent.fmpl1-1.fna&oh=00_AfBoUw6CtERWQt5aUI13apciOZRZTha3MQLxqrOfZpDQ-w&oe=65C59D9A"
              />
            </div>

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

            <div className="flex justify-center pt-8">
              <img src="https://www.educol.net/coloriage-jeu-de-societe-dl5516.jpg" />

              <div className="flex ">
                <div className="p-2 ">
                  {list_espace.map((e) => (
                    <div>
                      <Button
                        onClick={() => {
                          handleJeuEspace(e.planZone);
                        }}
                        className="flex justify-center text-lg "
                      >
                        {e.planZone}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="ml-4 flex justify-center">
                  <table className=" ml-8 pt-">
                    <th className="p- text-[#0A5483]  font-serif ">
                      Nom du jeu
                    </th>
                    <th className="p- text-[#0A5483]  font-serif ">
                      Public destiné
                    </th>
                    <th className="p- text-[#0A5483]  font-serif ">
                      Lien de la notice
                    </th>
                    <th className="p- text-[#0A5483] font-serif ">
                      Reçu{" "}
                    </th>

                    {list_jeu.map((e) => (
                      <tr>
                        <td className="p- ">
                          {e.nameGame}
                        </td>
                        <td className="p-">{e.type}</td>
                        <td
                          className="p-  text-xs"
                          style={{ wordBreak: "break-all" }}
                        >
                          {e.notice}
                        </td>
                        <td className="p- ">
                          {e.received}
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
                
              </div>
            </div>
          </div>
          <div className="p-2 flex justify-center">
            {isInscrit ? null : (
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
          <div className="pt-4 grid grid-cols-2 gap-4 ml-8 pb-8">
            <div>
            {listeNewsFav.map((e) => (
              <div className="p-2 ">
                <NewsFav news={e} />
              </div>
            ))}
            </div>
            <div className="flex justify-center">
              <img src="https://us.123rf.com/450wm/alexpokusay/alexpokusay2008/alexpokusay200800088/153768854-journal-dans-les-mains-croquis-illustration-vectorielle-de-gravure-conception-d-impression-de.jpg"></img>
            </div>
          </div>
          <div className="">
              <p className="flex justify-center p-8 font-bold font-serif">
                Nos membres
              </p>
            </div>
              <div className="pb-16">
            <TableauAcc Festi={festi} />
            </div>
        </div>
      )}
    </div>
  );
};
