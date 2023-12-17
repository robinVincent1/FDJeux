import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../output.css";
import { Infos } from "../infosPratiques/PageInfos";
import { InfosDeroulement } from "../infosPratiques/InfosDeroulement";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export const PageAccueil = () => {
  const [listeInfos, setListeInfos] = useState<Infos[]>([]);
  const admin = true;

  useEffect(() => {
    // Appel API pour récupérer toutes les infos
    fetch("http://localhost:8080/infos")
      .then((response) => response.json())
      .then((data) => setListeInfos(data))
      .then((data) => console.log(data))
      .catch((error) => console.error("Erreur lors de la récupération des infos :", error));
  }, []);

  const deleteInfo = async (id: string) => {
    try {
      await fetch(`http://localhost:8080/infos/${id}`, {
        method: 'DELETE',
      });

      // Recharge la page
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'information :', error);
    }
  };

  return (
    <div className=" flex justify-center break-words">
      {listeInfos.map((e) => (
        <InfosDeroulement inf={e} onDelete={() => deleteInfo(e.idInfos)} />
      ))}
      {admin ? (
        <Link to="/creerinfos" className="text-[#3379FF] p-4 flex justify-center items-center">
          <AddCircleRoundedIcon />
        </Link>
      ) : null}
    </div>
  );
};
