import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Festival, test } from "../festival/PageFestival";

export type Repas = {
  idRepas: string;
  idFestival: string;
  idUser: string;
  repas: number;
  etat: number;
  User: User;
};

const testR: Repas = {
  idRepas: "1",
  idFestival: "1",
  idUser: "",
  repas: 0,
  etat: 1,
  User: robin,
};

export const PageRepas = () => {
  const [userConnected, setUserConnected] = useState<User>(robin);

  const createInitialRepas = (): Repas => {
    return {
      idRepas: "1",
      idFestival: "1",
      idUser: "",
      repas: 0,
      etat: 1,
      User: robin,
    };
  };

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
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };
    fetchData();
  }, []);
  

  const [repasSM, setRepasSM] = useState<Repas>(createInitialRepas);
  const [repasSS, setRepasSS] = useState<Repas>(createInitialRepas);
  const [repasDM, setRepasDM] = useState<Repas>(createInitialRepas);
  const [maj, setMaj] = useState(false);

  const updateMaj = () => {
    setMaj(prevMaj => !prevMaj);
  };

  const changeSM = (etat: number) => {
    setRepasSM({ ...repasSM, etat: etat });
  };
  const changeSS = (etat: number) => {
    setRepasSS({ ...repasSS, etat: etat });
  };
  const changeDM = (etat: number) => {
    setRepasDM({ ...repasDM, etat: etat });
  };

  const [listeRepasDemandeSM, setListeRepasDemandeSM] = useState<Repas[]>([]);
  const [listeRepasDemandeSS, setListeRepasDemandeSS] = useState<Repas[]>([]);
  const [listeRepasDemandeDM, setListeRepasDemandeDM] = useState<Repas[]>([]);

  const [festi, setFesti] = useState<Festival>(test);

  useEffect(() => {
    const token = localStorage.getItem('token');
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
  }, []);

  useEffect(() => {
    const idUser = localStorage.getItem('userId');
    // Appel API pour récupérer le repas
    fetch(`http://localhost:8080/repas/${idUser}/${festi.idFestival}/${1}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setRepasSM(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des repas :", error)
      );
  }, [maj]);

  useEffect(() => {
    const idUser = localStorage.getItem('userId');
    // Appel API pour récupérer le repas
    fetch(`http://localhost:8080/repas/${idUser}/${festi.idFestival}/${2}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setRepasSS(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des repas :", error)
      );
  }, [maj]);

  useEffect(() => {
    const idUser = localStorage.getItem('userId');
    // Appel API pour récupérer le repas
    fetch(`http://localhost:8080/repas/${idUser}/${festi.idFestival}/${3}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setRepasDM(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des repas :", error)
      );
  }, [maj]);

  useEffect(() => {
    const idUser = localStorage.getItem('userId');
    // Appel API pour récupérer le repas
    fetch(`http://localhost:8080/repas/${1}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setListeRepasDemandeSM(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des repas :", error)
      );
  }, [maj]);

  useEffect(() => {
    const idUser = localStorage.getItem('userId');
    // Appel API pour récupérer le repas
    fetch(`http://localhost:8080/repas/${2}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setListeRepasDemandeSS(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des repas :", error)
      );
  }, [maj]);

  useEffect(() => {
    const idUser = localStorage.getItem('userId');
    // Appel API pour récupérer le repas
    fetch(`http://localhost:8080/repas/${3}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setListeRepasDemandeDM(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des repas :", error)
      );
  }, [maj]);


  const ModifEtat = async (etat: number, idRepas: string) => {
    try {
      const response = await fetch(`http://localhost:8080/repas/${idRepas}`, {
        method: "PUT",
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          etat: etat,
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
    updateMaj();
  };

  return (
    <div>
      <h1 className="flex justify-center p-16 font-bold text-2xl text-[#0A5483]">
        {" "}
        REPAS
      </h1>
      <div className="flex justify-center bg-[#0E8DDF]">
        <div className="p-8">
          <h1 className="font-bold flex justify-center p-2 text-white">
            Samedi Midi
          </h1>
          {repasSM.etat == 1 ? (
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  changeSM(0);
                  ModifEtat(0, repasSM.idRepas);
                }}
                color="error"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ width: "100%" }}
              >
                Annuler
              </Button>
            </div>
          ) : (
            <div>
              {repasSM.etat == 0 ? (
                <div className="flex justify-center">
                  <Button
                    color="success"
                    onClick={() => {
                      changeSM(1);
                      ModifEtat(1, repasSM.idRepas);
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
                    Demander
                  </Button>
                </div>
              ) : (
                <div>
                  {repasSM.etat == 2 ? (
                    <div className="italic justify-center flex text-white">
                      Votre repas est prêt !
                      <strong className="ml-2 text-[red]">
                        <NotificationsActiveIcon />
                      </strong>
                    </div>
                  ) : (
                    <div className="italic justify-center flex text-white">
                      Repas déjà pris !
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-8">
          <h1 className="font-bold flex justify-center p-2 text-white">
            Samedi Soir
          </h1>
          {repasSS.etat == 1 ? (
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  changeSS(0);
                  ModifEtat(0, repasSS.idRepas);
                }}
                color="error"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ width: "100%" }}
              >
                Annuler
              </Button>
            </div>
          ) : (
            <div>
              {repasSS.etat == 0 ? (
                <div className="flex justify-center">
                  <Button
                    color="success"
                    onClick={() => {
                      changeSS(1);
                      ModifEtat(1, repasSS.idRepas);
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
                    Demander
                  </Button>
                </div>
              ) : (
                <div>
                  {repasSS.etat == 2 ? (
                    <div className="italic justify-center flex text-white">
                      Votre repas est prêt !
                      <strong className="ml-2 text-[red]">
                        <NotificationsActiveIcon />
                      </strong>
                    </div>
                  ) : (
                    <div className="italic justify-center flex text-white">
                      Repas déjà pris !
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-8">
          <h1 className="font-bold flex justify-center p-2 text-white">
            Dimanche Midi
          </h1>
          {repasDM.etat == 1 ? (
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  changeDM(0);
                  ModifEtat(0, repasDM.idRepas);
                }}
                color="error"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ width: "100%" }}
              >
                Annuler
              </Button>
            </div>
          ) : (
            <div>
              {repasDM.etat == 0 ? (
                <div className="flex justify-center">
                  <Button
                    color="success"
                    onClick={() => {
                      changeDM(1);
                      ModifEtat(1, repasDM.idRepas);
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
                    Demander
                  </Button>
                </div>
              ) : (
                <div>
                  {repasDM.etat == 2 ? (
                    <div className="italic justify-center flex text-white">
                      Votre repas est prêt !
                      <strong className="ml-2 text-[red]">
                        <NotificationsActiveIcon />
                      </strong>
                    </div>
                  ) : (
                    <div className="italic justify-center flex text-white">
                      Repas déjà pris !
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {(userConnected.role == "admin" ||
        userConnected.role == "Résponsable soirée") && (
        <div className="grid grid-cols-3 pt-8">
          <div>
            <h2 className="font-bold flex justify-center text-lg">
              Repas Samedi Midi
            </h2>
            {listeRepasDemandeSM.length > 0 &&
              listeRepasDemandeSM.map((d) => (
                <div className="p-4  flex">
                  <div>
                    <p className="font-bold">
                      {d.User.firstName} {d.User.lastName}
                    </p>
                    <p className="italic">{d.User.telephone}</p>
                  </div>

                  <div className="ml-4 flex justify-center">
                    <Button
                      color="success"
                      onClick={() => {
                        changeSM(3);
                        ModifEtat(3, d.idRepas);
                      }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ width: "100%" }}
                    >
                      Repas récupéré
                    </Button>
                  </div>

                  <div className="ml-4 flex justify-center">
                    <Button
                      color="success"
                      onClick={() => {
                        changeSM(2);
                        ModifEtat(2, d.idRepas);
                      }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ width: "100%" }}
                    >
                      Repas Prêt
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          <div>
            <h2 className="font-bold flex justify-center text-lg">
              Repas Samedi Soir
            </h2>
            {listeRepasDemandeSS.length > 0 &&
              listeRepasDemandeSS.map((d) => (
                <div className="p-4  flex">
                  <div>
                    <p className="font-bold">
                      {d.User.firstName} {d.User.lastName}
                    </p>
                    <p className="italic">{d.User.telephone}</p>
                  </div>

                  <div className="ml-4 flex justify-center">
                    <Button
                      color="success"
                      onClick={() => {
                        changeSS(3);
                        ModifEtat(3, d.idRepas);
                      }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ width: "100%" }}
                    >
                      Repas récupéré
                    </Button>
                  </div>

                  <div className="ml-4 flex justify-center">
                    <Button
                      color="success"
                      onClick={() => {
                        changeSS(2);
                        ModifEtat(2, d.idRepas);
                      }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ width: "100%" }}
                    >
                      Repas Prêt
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          <div>
            <h2 className="font-bold flex justify-center text-lg">
              Repas Dimanche Midi
            </h2>
            {listeRepasDemandeDM.length > 0 &&
              listeRepasDemandeDM.map((d) => (
                <div className="p-4  flex">
                  <div>
                    <p className="font-bold">
                      {d.User.firstName} {d.User.lastName}
                    </p>
                    <p className="italic">{d.User.telephone}</p>
                  </div>

                  <div className="ml-4 flex justify-center">
                    <Button
                      color="success"
                      onClick={() => {
                        changeDM(3);
                        ModifEtat(3, d.idRepas);
                      }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ width: "100%" }}
                    >
                      Repas récupéré
                    </Button>
                  </div>

                  <div className="ml-4 flex justify-center">
                    <Button
                      color="success"
                      onClick={() => {
                        changeDM(2);
                        ModifEtat(2, d.idRepas);
                      }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ width: "100%" }}
                    >
                      Repas Prêt
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
