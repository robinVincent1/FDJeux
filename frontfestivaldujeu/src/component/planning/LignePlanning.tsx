"use client";
import React, { ChangeEvent, useState, useEffect, useCallback } from "react";
import Creneau from "./Creneau";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Button from "@mui/joy/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";

interface LigneProps {
  idPlanningGeneraLigne: number;
  titre: string;
  nb_creneaux: number;
  list_creneaux: (Creneau | null)[];
  idPlanning: number;
  onUpdated?: () => void;
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
}

interface Creneau {
  idCreneau: number;
  JourId: number;
  ouvert: boolean;
  heure_debut: string;
  heure_fin: string;
  titre: string;
  nb_max: number;
  nb_inscrit: number;
  ReferentId: number | -1;
  onUpdated?: () => void;
}

const LignePlanning: React.FC<LigneProps> = ({
  titre: initialTitre,
  idPlanningGeneraLigne,
  nb_creneaux,
  list_creneaux,
  idPlanning,
  onUpdated,
}) => {
  const [titre, setTitre] = useState<string>(initialTitre);
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [idligne, setidligne] = React.useState<number>(idPlanningGeneraLigne);
  const [titreligne, settitreligne] = React.useState<string>(titre);
  const [creneauPlanningUpdated, setCreneauPlanningUpdated] =
    React.useState<boolean>(false);
  const [maj, setmaj] = React.useState<number>(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setInputValue(titre);
  }, [titre]);

  const handletitreligne = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    settitreligne(value);
  };

  const handleCreneauPlanningUpdate = useCallback(() => {
    onUpdated && onUpdated();
    console.log("Creneau updated");
  }, []);

  function onclose() {
    handleClose();
  }

  const deleteligne = useCallback(async () => {
    const response = await fetch(
      `http://localhost:8080/planning_general_ligne/${idligne}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const deletecreneaux = await fetch(
      `http://localhost:8080/creneau/deletebyligne/${idligne}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const deletedcreneaux = await deletecreneaux.json();
    console.log(deletedcreneaux);
    const data = await response.json();
    console.log(data);
    setmaj(maj + 1);

    // Call onUpdated after the deletion
    if (onUpdated) {
      onUpdated();
    }
  }, [idligne, onUpdated]);

  const modifylignetitre = useCallback(async () => {
    const response = await fetch(
      `http://localhost:8080/planning_general_ligne/modifytitre/${idligne}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ titre: titreligne }),
      }
    );
    const data = await response.json();
    console.log(data);
    setTitre(titreligne);

    // Call onUpdated after the modification
    if (onUpdated) {
      onUpdated();
    }
  }, [idligne, titreligne, onUpdated]);

  const generateCreneaux = () => {
    const creneaux: any[] = [];
    {
      Array.isArray(list_creneaux) &&
        list_creneaux.map((creneau) =>
          creneau
            ? creneaux.push(
                <td
                  key={creneau?.idCreneau}
                  className="px-6 py-4 bg-blue-300 border border-slate-300"
                >
                  <Creneau
                    onUpdated={handleCreneauPlanningUpdate}
                    idCreneau={creneau?.idCreneau}
                    ouvert={creneau?.ouvert}
                    heure_debut={creneau?.heure_debut}
                    heure_fin={creneau?.heure_fin}
                    JourId={creneau?.JourId}
                    titre={titreligne}
                    nb_max={creneau?.nb_max}
                    nb_inscrit={creneau?.nb_inscrit}
                    ReferentId={creneau?.ReferentId}
                  />
                </td>
              )
            : creneaux.push(
                <td className="px-6 py-4 bg-blue-300 border border-slate-300 text-blue-900">
                  {" "}
                  Pas de créneau
                </td>
              )
        );

      creneaux.push(<td className="bg-white border-slate-0"></td>);
    }
    return creneaux;
  };

  const [userConnected, setUserConnected] = useState<User>();

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

  return (
    <tr className="bg-blue-500 ">
      <th scope="row" className="bg-blue-500 border-b border-blue-400 ">
        {userConnected &&
          (userConnected.role == "admin" ? (
            <div className="p-2 ">
              <Button className="text-blue-800" onClick={handleOpen}>{titre}</Button>
            </div>
          ) : (
            <Typography>{titre}</Typography>
          ))}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalDialog color="neutral" variant="plain">
            <ModalClose />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {titreligne}
            </Typography>

            <Input
              type="text"
              placeholder="Modifier le nom de la ligne"
              value={titreligne}
              onChange={handletitreligne}
            />
            <div className="flex">
              <Button
                className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20 "
                onClick={() => {
                  modifylignetitre();
                  onclose();
                }}
              >
                Modifié
              </Button>
              <Button
                className="bg-red-600 shadow-lg shadow-indigo-500/20"
                color="danger"
                onClick={() => {
                  deleteligne();
                  onclose();
                }}
              >
                Supprimé
              </Button>
            </div>
          </ModalDialog>
        </Modal>
      </th>
      {generateCreneaux()}
    </tr>
  );
};

export default LignePlanning;
