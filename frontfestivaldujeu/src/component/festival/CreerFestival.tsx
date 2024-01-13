import { Button, Input, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from 'papaparse';


export const CreerFestival = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvFile(file);
      console.log(file)
    }
  };
  const [nom, setNom] = useState("");
  const handleTitreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNom(e.target.value);
  };

  const [PlanningId, setPlanningId] = React.useState(-1);

  const [date, setDate] = useState("");
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const nav = useNavigate();

  const creerPlanning = async () => {
    try {
      const response = await fetch("http://localhost:8080/planning_general", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const planning = await response.json();
      setPlanningId(planning.idPlanning);
      return planning.idPlanning;
    } catch (error) {}
  };

  const creerFestival = async () => {
    await creerPlanning();
    if (date !== "" && nom !== "") {
      const nouveauFestival = {
        nom: nom,
        date: date,
        nbReferent: 0,
        nbRespoSoiree: 0,
        nbAccueilBenevole: 0,
        nbBenevole: 0,
        enCours: true,
        idPlanning: PlanningId,
      };
      try {
        const response = await fetch("http://localhost:8080/festival", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(nouveauFestival),
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }

        const data = await response.json();
        console.log("Festival créé avec succès:", data);
        const idFestival = data.idFestival;
        const putIdFestival = await fetch(
          `http://localhost:8080/planning_general/${PlanningId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ idFestival: idFestival }),
          }
        );
        if (csvFile) {
          handleFileUpload(idFestival)
        }
        return data;

      } catch (error: any) {
        console.error("Erreur lors de la création du festival:", error.message);
      }
    }
  };

  const handleFileUpload = (
    idPlanningGeneral: string
  ) => {

    if (csvFile) {
      Papa.parse(csvFile, {
        complete: (result: any) => {
          // result.data contient les données du fichier CSV
          // Commencez à traiter à partir de la troisième ligne
          const dataToProcess = result.data.slice(172);

          // Envoyez chaque ligne au serveur pour traitement
          dataToProcess.forEach((row: any) => {
            // Envoyez une requête au serveur pour chaque ligne
            fetch("http://localhost:8080/planning_general_ligne", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                titre: row[0] + " (" + row[2] + ")",
                idPlanningGeneral: idPlanningGeneral,
                zone: row[4],
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Réponse du serveur:", data);
              })
              .catch((error) => {
                console.error("Erreur lors de la requête au serveur:", error);
              });
          });
        },
      });
    }
  };

  return (
    <div>
      <div className="p-4">
        <Button
          onClick={() => nav("/festival")}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "10%" }}
        >
          Retour
        </Button>
      </div>
      <h1 className="flex justify-center p-4 font-bold text-2xl text-[#0A5483]">
        {" "}
        Création de festival
      </h1>
      <div className="p-4 flex justify-center">
        <TextField
          onChange={handleTitreChange}
          fullWidth
          label="Nom du festival"
          id="fullWidth"
          size="medium"
          sx={{ width: "70%" }}
        />
      </div>

      <div className="p-4 flex justify-center">
        <TextField
          onChange={handleDateChange}
          fullWidth
          label="Date"
          id="fullWidth"
          size="medium"
          sx={{ width: "70%" }}
        />
      </div>
      <div className="flex justify-center p-4">
        <label className="border p-2 rounded bg-[green] text-[white]">
          <input
            type="file"
            accept="text/xlsx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          Importer un fichier CSV
        </label>
      </div>

      <div className="p-4 flex justify-center">
        <Button
          onClick={() => creerFestival()}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "10%" }}
        >
          Créer
        </Button>
      </div>
    </div>
  );
};
