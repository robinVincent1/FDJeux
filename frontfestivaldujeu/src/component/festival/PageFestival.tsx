import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Tableau from "./tableau";


export type Festival = {
  idFestival: string;
  nom: string;
  date: string;
  nbReferent: number;
  nbRespoSoiree: number;
  nbAccueilBenevole: number;
  nbBenevole: number;
  enCours: boolean;
  idPlanning: string,
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

  useEffect(() => {
    // Appel API pour récupérer tous les festivals
    fetch("http://localhost:8080/festival")
      .then((response) => response.json())
      .then((data) => setListe(data))
      .then((data) => console.log(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des festivals :", error)
      );
  }, []);

  return (
    <div>
      <div className="pt-16 p-4">
        <p className="p-8 font-bold flex justify-center text-[#0A5483]">Voici la liste des festivals :</p>
        {liste.length > 0 ? (
          <Tableau listeFesti={liste} />
        ) : (
          <p>Aucun festival disponible.</p>
        )}
      </div>

      <div className="flex justify-center p-8">
        <Button
          onClick={() => {
            nav("/CreerFestival");
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
  );
};
