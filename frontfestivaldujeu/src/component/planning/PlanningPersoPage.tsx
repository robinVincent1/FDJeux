import {PlanningPerso} from './PlanningPerso'
import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Loader from '../layout/Loader';

export const PlanningPersoPage = () => {
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
      const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/festival/enCours`,{
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
      <div>
        <div><Navbar/></div>
      <div>
        <Loader />
      </div>
      </div>
    ) : (
      <div>
      <div><Navbar/></div>
    <div><PlanningPerso userid={parseInt(localStorage.getItem('userId') ?? '') || 0} idPlanning={idPlanning} /></div>
    </div>
  )
    }
    </div>
  )
    
}