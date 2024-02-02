import React, { useState, useEffect } from 'react';
import PlanningGeneral from './PlanningGeneral'
import Navbar from '../layout/Navbar';


export const PlanningGeneralPage = () => {

  const [idPlanning,setIdPlanning] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getidPlanning().then(result => {setIdPlanning(result as number); })
  }, [])

  useEffect(() => {
    if (idPlanning !== -1) {
      setLoading(false);
    }
  }, [idPlanning])
  
  async function getidPlanning(){
    try{
      const response = await fetch(`http://localhost:8080/festival/enCours`,{
          method : 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })

        const festival : {idPlanning:string} = await response.json();
        console.log('festival idPlanning',festival.idPlanning)
        const idPlanning = parseInt(festival.idPlanning)
        return idPlanning
    }catch(error){
      console.log(error)
    }
  }



  return (
    <div>
    {loading ? (
      <p>Chargement en cours...</p>
    ) : (
      <div>
        <div><Navbar/></div>
    <div><PlanningGeneral PlanningId={idPlanning} /></div>
    </div>
    )
    }
    </div>
  )
}
