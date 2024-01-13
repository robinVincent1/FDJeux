import { Button, TextField } from "@mui/material";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";



export const CreerFestival = () => {
  const [nom, setNom] = useState("");
  const handleTitreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNom(e.target.value);
  };

  const [PlanningId,setPlanningId] = React.useState(-1)

  const [date, setDate] = useState("");
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };


  useEffect(() => {
    creerFestival()
  }, [PlanningId])

  const nav = useNavigate();

  const creerPlanning = async() => {
    try{
      const response = await fetch('http://localhost:8080/planning_general',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    const planning = await response.json()
    setPlanningId(planning.idPlanning)
    return planning.idPlanning
    }catch(error){

    }

  }



  const creerFestival = async () => {
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
        }
        try {
          const response = await fetch('http://localhost:8080/festival', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(nouveauFestival),
          });
      
          if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
          }
      
          const data = await response.json();
          console.log('Festival créé avec succès:', data);
          const idFestival = data.idFestival
          const putIdFestival = await fetch(`http://localhost:8080/planning_general/${PlanningId}`,{
            method:'PUT',
            headers:{
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body : JSON.stringify({idFestival : idFestival})
          })
          return data;
        } catch (error: any) {
          console.error('Erreur lors de la création du festival:', error.message);
        }
    }
  };

  return (
    <div>
      <div className="p-4">
        <Button
          onClick={() => (nav("/festival"))}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "10%" }}
        >
          Retour
        </Button>
      </div>

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

      <div className="p-4 flex justify-center">
        <Button
          onClick={() => (creerPlanning())}
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
