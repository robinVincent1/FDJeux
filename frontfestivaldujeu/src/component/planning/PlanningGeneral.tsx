import React, { useEffect, ChangeEvent, useState } from "react";
import LignePlanning from "./LignePlanning";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Button from "@mui/joy/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Form } from "react-router-dom";
import { Typography } from "@mui/material";
import Loader from "../layout/Loader";
import { FlashAutoTwoTone } from "@mui/icons-material";
import { get } from "http";
import { robin } from "../profil/ProfilPage";

interface Horaire {
  id: number;
  jourId: number;
  heure_debut: string;
  heure_fin: string;
}

interface Jour {
  id: number;
  nom: string;
  list_horaire: Horaire[];
}

interface Creneau {
  idCreneau: number;
  LigneId: number;
  JourId: number;
  HoraireId: number;
  ouvert: boolean;
  titre: string;
  nb_max: number;
  nb_inscrit: number;
  referent: string;
  heure_debut: string;
  heure_fin: string;
  ReferentId: number;
}

interface Ligne {
  idPlanningGeneralLigne: number;
  PlanningGeneralId: number;
  titre: string;
  list_creneaux: (Creneau | null)[];
}

interface PlanningGeneralProps {
  PlanningId: number;
}

interface User {
  idUser: number;
  email: string;
  active: boolean;
  role: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  postalAdress: string;
  propo: string;
  association: string;
  telephone: string;
  flexible: boolean;
  isPresent: number;
}

let week = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const PlanningGeneral: React.FC<PlanningGeneralProps> = ({ PlanningId }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedValue_ModifyJour, setSelectedValue_ModifyJour] =
    useState<string>("");
  const [inputValueHoraire_Debut, setInputValueHoraire_Debut] =
    useState<string>("");
  const [inputValueHoraire_Fin, setInputValueHoraire_Fin] =
    useState<string>("");
  const [inputValueModifyHoraire_Debut, setInputValueModifyHoraire_Debut] =
    useState<string>("");
  const [inputValueModifyHoraire_Fin, setInputValueModifyHoraire_Fin] =
    useState<string>("");
  const [openModals, setOpenModals] = useState<{ [key: number]: boolean }>({});
  const [openModals_Presence, setOpenModals_Presence] = useState<{
    [key: number]: boolean;
  }>({});
  const [openModals_ModifyJour, setOpenModals_ModifyJour] = useState<{
    [key: number]: boolean;
  }>({});
  const [openModals_ModifyHoraire, setOpenModals_ModifyHoraire] = useState<{
    [key: number]: boolean;
  }>({});
  const [nbColonne, setNbColonne] = useState<number>(0);
  const [openModal_Ligne, setOpenModal_Ligne] = React.useState(false);
  const [openModal_Jour, setOpenModal_Jour] = React.useState(false);
  const [list_jours, setListJours] = useState<Jour[]>([]);
  const [list_lignewithoutcreneaux, setListLignewithoutcreneaux] = useState<
    Ligne[]
  >([]);
  const [list_ligne, setListLigne] = useState<Ligne[]>([]);
  const [loading, setLoading] = useState(true);
  const [listUserPresent, setListUserPresent] = useState<User[]>([]);
  const [maj, setmaj] = useState<number>(0);
  const [lignePlanningUpdated, setLignePlanningUpdated] = useState(false);
  const [hasAddedCreneaux, setHasAddedCreneaux] = useState(false);

  const handleLignePlanningUpdate = () => {
    setmaj(maj + 1); 
  };

  const handleChange_ModifyJour = (event: SelectChangeEvent) => {
    setSelectedValue_ModifyJour(event.target.value as string);
  };

  const handleOpenModal_Jour = () => setOpenModal_Jour(true);
  const handleCloseModal_Jour = () => setOpenModal_Jour(false);

  const handleOpenModal_Ligne = () => setOpenModal_Ligne(true);
  const handleCloseModal_Ligne = () => setOpenModal_Ligne(false);

  async function handleOpenModal_Presence(jourId: number) {
    setListUserPresent([]);
    await getListPresence(jourId);
    setOpenModals_Presence((prevOpenModals) => ({
      ...prevOpenModals,
      [jourId]: true,
    }));
  }

  const handleCloseModal_Presence = (jourId: number) => {
    setOpenModals_Presence((prevOpenModals) => ({
      ...prevOpenModals,
      [jourId]: false,
    }));
  };

  const handleOpenModal_ModifyHoraire = (horaireId: number) => {
    setOpenModals_ModifyHoraire((prevOpenModals) => ({
      ...prevOpenModals,
      [horaireId]: true,
    }));
  };

  const handleCloseModal_ModifyHoraire = (horaireId: number) => {
    setOpenModals_ModifyHoraire((prevOpenModals) => ({
      ...prevOpenModals,
      [horaireId]: false,
    }));
    setmaj(maj + 1);
  };

  const handleOpenModal_ModifyJour = (jourId: number) => {
    if (userConnected != undefined) {
      if (userConnected.role == "admin") {
        setOpenModals_ModifyJour((prevOpenModals) => ({
          ...prevOpenModals,
          [jourId]: true,
        }))
      };
    }
  };

  const handleCloseModal_ModifyJour = (jourId: number) => {
    setOpenModals_ModifyJour((prevOpenModals) => ({
      ...prevOpenModals,
      [jourId]: false,
    }));
  };

  const handleOpenModal_Horaire = (jourId: number) => {
    if (userConnected != undefined) {
      if (userConnected.role == "admin") {
        setOpenModals((prevOpenModals) => ({ ...prevOpenModals, [jourId]: true }));
      };
    }
  };

  const handleCloseModal_Horaire = (jourId: number) => {
    setOpenModals((prevOpenModals) => ({ ...prevOpenModals, [jourId]: false }));
  };

  const handleInputModifyHoraire_Debut = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInputValueModifyHoraire_Debut(value);
  };

  const handleInputModifyHoraire_Fin = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInputValueModifyHoraire_Fin(value);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleInputHoraire_Debut = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValueHoraire_Debut(value);
  };

  const handleInputHoraire_Fin = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValueHoraire_Fin(value);
  };
  async function getListPresence(jourId: number) {
    const listcreneau = await getcreneaubyJourId(jourId);
    listcreneau?.forEach(async (creneau) => {
      const listUserId = await getUserIdByCreneauId(creneau.idCreneau);
      listUserId?.forEach(async (user) => {
        const userPresent = await getUserById(user.idUser);
        if (userPresent) {
          userPresent.isPresent = user.isPresent;
          setListUserPresent((prevListUserPresent) => [
            ...prevListUserPresent,
            userPresent,
          ]);
        }
      });
    });
  }

  async function ChangePresence(jour: Jour, user: User, isPresent: number) {
    const list_creneaux = await getcreneaubyJourId(jour.id);
    list_creneaux?.forEach(async (creneau) => {
      try {
        const response = await fetch(
          "https://festival-jeu-mtp-api.onrender.com/creneau_benevole/isPresent",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              idCreneau: creneau.idCreneau,
              idUser: user.idUser,
              isPresent: isPresent,
            }),
          }
        );
      } catch (error) {
        console.error("Erreur lors de l'ajout de la ligne", error);
      }
    });
    setmaj(maj + 1);
  }

  async function modifyjour(jourId: number) {
    try {
      const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/jours/${jourId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nom: selectedValue_ModifyJour,
        }),
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ligne", error);
    }
    setmaj(maj + 1);
  }

  async function deletejour(jourId: number) {
    try {
      const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/jours/${jourId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response2 = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/horaire/deletebyjour/${jourId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response3 = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/creneau/deletebyjour/${jourId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ligne", error);
    }
    setmaj(maj + 1);
  }

  async function deletehoraire(horaireId: number) {
    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/horaire/${horaireId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response2 = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/creneau/deletebyhoraire/${horaireId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ligne", error);
    }
    setmaj(maj + 1);
  }

  async function modifyhoraire(horaireId: number) {
    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/horaire/${horaireId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            heure_debut: inputValueModifyHoraire_Debut,
            heure_fin: inputValueModifyHoraire_Fin,
          }),
        }
      );
      const reponse2 = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/creneau/modifyhoraire/${horaireId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            heure_debut: inputValueModifyHoraire_Debut,
            heure_fin: inputValueModifyHoraire_Fin,
          }),
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ligne", error);
    }
    handleCloseModal_ModifyHoraire(horaireId);
    setmaj(maj + 1);
  }

  async function getUserById(idUser: number) {
    try {
      const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/user/${idUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        // Si la réponse n'est pas OK, renvoyer une valeur appropriée
        console.error(
          "Erreur lors de la récupération des creneaux. Statut:",
          response.status
        );
        return undefined;
      }

      const user: User = await response.json();
      return user;
    } catch (error) {
      console.error("Erreur lors de la récupération des creneaux", error);
      // Gérer l'erreur ici, si nécessaire
      return undefined;
    }
  }

  async function getUserIdByCreneauId(idCreneau: number) {
    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/creneau_benevole/getbenevoles/${idCreneau}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        // Si la réponse n'est pas OK, renvoyer une valeur appropriée
        console.error(
          "Erreur lors de la récupération des creneaux. Statut:",
          response.status
        );
        return undefined;
      }

      const ListUserId: User[] = await response.json();
      return ListUserId;
    } catch (error) {
      console.error("Erreur lors de la récupération des creneaux", error);
      // Gérer l'erreur ici, si nécessaire
      return undefined;
    }
  }

  async function getcreneaubyJourId(jourId: number) {
    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/creneau/getbyjour/${jourId}/${PlanningId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        // Si la réponse n'est pas OK, renvoyer une valeur appropriée
        console.error(
          "Erreur lors de la récupération des creneaux. Statut:",
          response.status
        );
        return undefined;
      }

      const creneauData: Creneau[] = await response.json();
      console.log("creneauData", creneauData);
      return creneauData;
    } catch (error) {
      console.error("Erreur lors de la récupération des creneaux", error);
      // Gérer l'erreur ici, si nécessaire
      return undefined;
    }
  }

  async function createcreneau(
    jourid: number,
    horaireid: number,
    LigneId: number,
    titre: string,
    heure_debut: string,
    heure_fin: string
  ) {
    try {
      const response = await fetch("https://festival-jeu-mtp-api.onrender.com/creneau", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          LigneId: LigneId,
          JourId: jourid,
          HoraireId: horaireid,
          idPlanning: PlanningId,
          ouvert: false,
          titre: titre,
          heure_debut,
          heure_fin,
          nb_max: 10,
          nb_inscrit: 0,
          ReferentId: -1,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du creneau 1");
      }

      const creneauData: Creneau = await response.json();
      return creneauData;
    } catch (error) {
      console.error("Erreur lors de l'ajout du creneau 2", error);
      throw error;
    }
  }

  async function getcreneaubyId(
    JourId: number,
    HoraireId: number,
    LigneId: number,
    idPlanning: number
  ) {
    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/creneau/${JourId}/${HoraireId}/${LigneId}/${idPlanning}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        // Si la réponse n'est pas OK, renvoyer une valeur appropriée
        console.error(
          "Erreur lors de la récupération des creneaux. Statut:",
          response.status
        );
        return undefined;
      }

      const creneauData: Creneau = await response.json();
      return creneauData;
    } catch (error) {
      console.error("Erreur lors de la récupération des creneaux", error);
      // Gérer l'erreur ici, si nécessaire
      return undefined;
    }
  }

  async function addcreneautolistligne(): Promise<Ligne[]> {
    const newlistligne: Ligne[] = [...list_lignewithoutcreneaux];
    newlistligne.forEach((ligne) => {
      ligne.list_creneaux = [];
    });
    for (let i = 0; i < list_ligne.length; i++) {
      for (let j = 0; j < list_jours.length; j++) {
        if (list_jours[j].list_horaire.length === 0) {
          newlistligne[i].list_creneaux.push(null);
        }
        for (let k = 0; k < list_jours[j].list_horaire.length; k++) {
          const horaire = list_jours[j].list_horaire[k];
          const creneauData = await getcreneaubyId(
            list_jours[j].id,
            horaire.id,
            list_ligne[i].idPlanningGeneralLigne,
            PlanningId
          );
          if (creneauData && newlistligne[i] && newlistligne[i].list_creneaux) {
            newlistligne[i].list_creneaux.push(creneauData);
          }
          if (creneauData === undefined) {
            await createcreneau(
              list_jours[j].id,
              horaire.id,
              list_ligne[i].idPlanningGeneralLigne,
              list_ligne[i].titre,
              horaire.heure_debut,
              horaire.heure_fin
            );
            const newcreneau = await getcreneaubyId(
              list_jours[j].id,
              horaire.id,
              list_ligne[i].idPlanningGeneralLigne,
              PlanningId
            );
            if (
              newcreneau &&
              newlistligne[i] &&
              newlistligne[i].list_creneaux
            ) {
              newlistligne[i].list_creneaux.push(newcreneau);
            }
          }
        }
      }
    }
    return newlistligne;
  }

  async function addligne() {
    try {
      const response = await fetch(
        "https://festival-jeu-mtp-api.onrender.com/planning_general_ligne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            titre: inputValue,
            idPlanningGeneral: PlanningId,
          }),
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ligne", error);
    }
    setmaj(maj + 1);
  }

  async function getligne() {
    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/planning_general_ligne/${PlanningId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const ligneData: Ligne[] = await response.json();
      return ligneData;
    } catch (error) {
      console.error("Erreur lors de la récupération des lignes", error);
    }
  }

  async function gethorairebyId(jourid: number, idPlanning: number) {
    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/horaire/${jourid}/${idPlanning}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const horaireData: Horaire[] = await response.json();
      return horaireData;
    } catch (error) {
      console.error("Erreur lors de la récupération des horaires", error);
    }
  }

  async function addtolisthoraire(jourid: number) {
    try {
      const response = await fetch("https://festival-jeu-mtp-api.onrender.com/horaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          heure_debut: parseInt(inputValueHoraire_Debut),
          heure_fin: parseInt(inputValueHoraire_Fin),
          jourId: jourid,
          idPlanning: PlanningId,
        }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'horaire");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'horaire", error);
    }
    setInputValueHoraire_Debut("");
    setInputValueHoraire_Fin("");
    handleCloseModal_Horaire(jourid);
    setmaj(maj + 1);
  }

  async function addtolistjour() {
    try {
      const response = await fetch("https://festival-jeu-mtp-api.onrender.com/jours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nom: selectedValue,
          idPlanning: PlanningId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du jour");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du jour", error);
    }
    setmaj(maj + 1);
  }

  function changeisPresent(isPresent: number) {
    if (isPresent === 0) {
      return 1;
    }
    return 0;
  }

  function presentornot(isPresent: number) {
    if (isPresent === 0) {
      return false;
    }
    return true;
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };

  const fetchData = async () => {
    setNbColonne(0);
    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/jours/${PlanningId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const joursData: Jour[] = await response.json();

      const newlistjour: Jour[] = [];
      for (let i = 0; i < joursData.length; i++) {
        const jour = joursData[i];
        try {
          const list_horaire = await gethorairebyId(jour.id, PlanningId);
          newlistjour.push({ ...jour, list_horaire: list_horaire || [] });
        } catch (error) {
          console.error(
            "Error while fetching and converting list_horaire:",
            error
          );
          newlistjour.push(jour);
        }
      }
      return newlistjour;
    } catch (error) {
      console.error("Erreur lors de la récupération des jours", error);
    }
  };

  // ...

  useEffect(() => {
    fetchData().then((result) => {
      setListJours(result as Jour[]);
    });
  }, [maj]);

  useEffect(() => {
    getligne().then((result) => {
      setListLignewithoutcreneaux(result as Ligne[]);
    });
  }, [list_jours]);

  useEffect(() => {
    addcreneautolistligne().then((result) => {
      setListLigne(result as Ligne[]);
    });
  }, [list_lignewithoutcreneaux]);

  useEffect(() => {
    setLoading(false);
  }, [list_ligne]);

  const [userConnected, setUserConnected] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/user/${id}`, {
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

  return (
    <div className="overflow-x-auto  sm:rounded-lg ml-4">
      <p className="flex justify-center p-16 font-bold text-2xl text-[#0A5483] font-serif">
        Planning général
      </p>
      {loading ? (
        // Afficher un indicateur de chargement ou un message pendant le chargement
        <Loader />
      ) : (
        <div className="pt-6">
          <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
            <col />
            <colgroup span={list_jours.length}></colgroup>
            <thead className="text-xs text-white uppercase bg-blue-400  dark:text-white">
              <tr>
                <td className="bg-blue-500" rowSpan={list_jours.length}></td>
                {list_jours.map((jour) => (
                  <th
                    colSpan={
                      Array.isArray(jour.list_horaire)
                        ? jour.list_horaire.length
                        : 0
                    }
                    scope="colgroup"
                    className="px-6 py-3 bg-blue-500 border-r border-slate-300 "
                  >
                    <div className="flex items-stretch">
                    {userConnected && ( userConnected.role == "admin" ? (
                      <Button
                        
                        onClick={() => {
                          setSelectedValue_ModifyJour(jour.nom);
                          handleOpenModal_ModifyJour(jour.id);
                        }}
                      >
                        {jour.nom}
                      </Button>
                    ) : (

                      <Typography>{jour.nom}</Typography>
                    ))}
                      <Modal
                        open={openModals_ModifyJour[jour.id] || false}
                        onClose={() => handleCloseModal_ModifyJour(jour.id)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <ModalDialog>
                          <Typography variant="h6" id="modal-modal-title">
                            Modifier le jour
                          </Typography>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Jour
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectedValue_ModifyJour}
                              label="Jour"
                              onChange={handleChange_ModifyJour}
                            >
                              {week.map((jour, index) => (
                                <MenuItem key={index} value={jour}>
                                  {jour}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <div className="flexible">
                            <Button
                              onClick={() => {
                                modifyjour(jour.id);
                                handleCloseModal_ModifyJour(jour.id);
                              }}
                            >
                              Modifier
                            </Button>
                            <Button
                              onClick={() => {
                                deletejour(jour.id);
                                handleCloseModal_ModifyJour(jour.id);
                              }}
                              color="danger"
                            >
                              Supprimer
                            </Button>
                          </div>
                        </ModalDialog>
                      </Modal>

                      <div className="ml-2 mr-2">
                      {userConnected && (userConnected.role == "admin"  || userConnected.role=="accueil bénévole") && (
                        <Button
                          
                          onClick={() => handleOpenModal_Presence(jour.id)}
                          color="success"
                        >
                          Présence
                        </Button>
                      )}
                      
                        <Modal
                          open={openModals_Presence[jour.id] || false}
                          onClose={() => handleCloseModal_Presence(jour.id)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <ModalDialog color="neutral" variant="plain">
                            Ajouter une présence
                            {listUserPresent.map((user) => (
                              <div>
                                <div
                                  style={{
                                    color: user.isPresent ? "green" : "red",
                                  }}
                                  key={user.idUser}
                                >
                                  {user.pseudo}
                                </div>
                                {userConnected &&
                                  (userConnected.role == "admin" ||
                                    userConnected.role ==
                                      "accueil bénévole") && (
                                    <FormGroup>
                                      <FormControlLabel
                                        control={
                                          <Switch
                                            color="success"
                                            checked={presentornot(
                                              user.isPresent
                                            )}
                                            onChange={() => {
                                              ChangePresence(
                                                jour,
                                                user,
                                                changeisPresent(user.isPresent)
                                              );
                                              user.isPresent = changeisPresent(
                                                user.isPresent
                                              );
                                              setListUserPresent([
                                                ...listUserPresent,
                                              ]);
                                            }}
                                          />
                                        }
                                        label="Présent"
                                      />
                                    </FormGroup>
                                  )}
                              </div>
                            ))}
                          </ModalDialog>
                        </Modal>
                      </div>
                      <div>
                        {userConnected && userConnected.role == "admin" && (
                          <Button
                          variant='outlined'
                            onClick={() => handleOpenModal_Horaire(jour.id)}
                            color="danger"
                          >
                            +
                          </Button>
                        )}  
                        <Modal
                          open={openModals[jour.id] || false}
                          onClose={() => handleCloseModal_Horaire(jour.id)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <ModalDialog color="neutral" variant="plain">
                            Ajouter une horaire
                            <Input
                              className="w-1/2"
                              type="text"
                              placeholder="Heure de début"
                              value={inputValueHoraire_Debut}
                              onChange={handleInputHoraire_Debut}
                            />
                            <Input
                              className="w-1/2"
                              type="text"
                              placeholder="Heure de fin"
                              value={inputValueHoraire_Fin}
                              onChange={handleInputHoraire_Fin}
                            />
                            <Button
                              className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                              onClick={() => addtolisthoraire(jour.id)}
                            >
                              Ajouter
                            </Button>
                          </ModalDialog>
                        </Modal>
                      </div>
                    </div>
                  </th>
                ))}
                <th className="bg-white p-4">
                  {userConnected && userConnected.role == "admin" && (
                    <Button
                      onClick={handleOpenModal_Jour}
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      →
                    </Button>
                  )}
                  <Modal
                    open={openModal_Jour}
                    onClose={handleCloseModal_Jour}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <ModalDialog color="neutral" variant="plain">
                      Ajouter un jour
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Jour
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedValue}
                          label="Jour"
                          onChange={handleChange}
                        >
                          {week.map((jour, index) => (
                            <MenuItem key={index} value={jour}>
                              {jour}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button
                        className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                        onClick={() => {
                          addtolistjour();
                          handleCloseModal_Jour();
                        }}
                      >
                        Ajouter
                      </Button>
                    </ModalDialog>
                  </Modal>
                </th>
              </tr>
              <tr>
                {list_jours.map((jour) => (
                  <>
                    {jour.list_horaire && jour.list_horaire.length > 0 ? (
                      jour.list_horaire.map((horaire) => (
                        <th
                          scope="col"
                          className="px-6 py-3  border border-slate-300"
                        >
                           {userConnected && ( userConnected.role == "admin" ? (
                          <Button
                            variant='outlined'
                            onClick={() => {
                              setInputValueModifyHoraire_Debut(
                                horaire.heure_debut
                              );
                              setInputValueModifyHoraire_Fin(horaire.heure_fin);
                              handleOpenModal_ModifyHoraire(horaire.id);
                            }}
                          >
                            {horaire.heure_debut}h-{horaire.heure_fin}h
                          </Button>
                           ):(
                            <div>
                              {horaire.heure_debut}h-{horaire.heure_fin}h
                            </div>
                           )
                           )}
                          <Modal
                            open={openModals_ModifyHoraire[horaire.id] || false}
                            onClose={() =>
                              handleCloseModal_ModifyHoraire(horaire.id)
                            }
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <ModalDialog>
                              Modifier l'horaire
                              <Input
                                className="w-1/2"
                                type="text"
                                placeholder="Heure de début"
                                value={inputValueModifyHoraire_Debut}
                                onChange={handleInputModifyHoraire_Debut}
                              />
                              <Input
                                className="w-1/2"
                                type="text"
                                placeholder="Heure de fin"
                                value={inputValueModifyHoraire_Fin}
                                onChange={handleInputModifyHoraire_Fin}
                              />
                              <div className="flex">
                                <div className="mr-2">
                                <Button
                                  onClick={() => {
                                    modifyhoraire(horaire.id);
                                  }}
                                >
                                  Modifier
                                </Button>
                                </div>
                                <div>
                                <Button
                                  color="danger"
                                  onClick={() => {
                                    deletehoraire(horaire.id);
                                    handleCloseModal_Horaire(horaire.id);
                                  }}
                                >
                                  Supprimer
                                </Button>
                                </div>
                              </div>
                            </ModalDialog>
                          </Modal>
                        </th>
                      ))
                    ) : (
                      <th
                        scope="col"
                        className="px-6 py-3  border border-slate-300 text-blue-600"
                      >
                        Pas d'horaire
                      </th>
                    )}
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(list_ligne) &&
                list_ligne.map(
                  (ligne) =>
                    "titre" in ligne && (
                      <LignePlanning
                        onUpdated={handleLignePlanningUpdate}
                        titre={ligne.titre}
                        nb_creneaux={nbColonne}
                        list_creneaux={ligne.list_creneaux as Creneau[]}
                        idPlanningGeneraLigne={ligne.idPlanningGeneralLigne}
                        idPlanning={PlanningId}
                      />
                    )
                )}
                <div className="p-4">
              {userConnected && userConnected.role == "admin" && (
                <Button
                  onClick={handleOpenModal_Ligne}
                  className="  text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  ↓
                </Button>
              )}
              </div>
              <Modal
                open={openModal_Ligne}
                onClose={handleCloseModal_Ligne}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalDialog color="neutral" variant="plain">
                  Ajouter une ligne
                  <Input
                    type="text"
                    placeholder="Nom de la ligne"
                    value={inputValue}
                    onChange={handleInput}
                  />
                  <Button
                    className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                    onClick={() => {
                      addligne();
                      handleCloseModal_Ligne();
                    }}
                  >
                    Ajouter
                  </Button>
                </ModalDialog>
              </Modal>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlanningGeneral;