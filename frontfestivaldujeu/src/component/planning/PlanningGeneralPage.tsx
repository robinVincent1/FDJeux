import React, { useState, useEffect } from 'react';
import PlanningGeneral from './PlanningGeneral'

export const PlanningGeneralPage = () => {
  const [listJours, setListJours] = useState([]);

  useEffect(() => {
    // Effectuer la requête Fetch pour récupérer les jours depuis votre API
    fetch('http://localhost:8080/jours/')
      .then(response => response.json())
      .then(data => setListJours(data))
      .catch(error => console.error('Erreur lors de la récupération des jours :', error));
  }, []);



  return (
    <div><PlanningGeneral list_jours={listJours} list_ligne={[]}/></div>
  )
}
