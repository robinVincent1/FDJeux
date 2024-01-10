import React, {useEffect, ChangeEvent, useState } from 'react'


interface Horaire {
  id: number;
  jourId: number;
  heure_debut: string;
  heure_fin: string;
}

interface Jour {
  id: number;
  nom: string;
  list_horaire:  Horaire[];
}

interface Creneau{
  idCreneau: number;
  LigneId: number;
  JourId:number;
  HoraireId:number;
  ouvert:boolean,
  titre:string,
  nb_max:number,
  nb_inscrit:number,
  referent : User,
  heure_debut: string;
  heure_fin: string;
  ReferentId: number;
}

interface User{
  idUser:number,
  email:string,
  active:boolean,
  role: string,
  firstName:string,
  lastName: string,
  pseudo:string,
  postalAdress:string,
  propo:string,
  association:string,
  telephone:string,
  flexible:boolean
}

interface PlanningProps {
  userid: number;
}

export const PlanningPerso : React.FC<PlanningProps> = ({
  userid
}) => {

  const [list_jours, setListJours] = useState<Jour[]>([]);
  const [nbColonne, setNbColonne] = useState<number>(0);
  const [list_idcreneaux, setListIdCreneaux] = useState<{idCreneauBenevole: number, idUser: number, idCreneau:number, }[]>([]);
  const [list_creneaux, setListCreneaux] = useState<Creneau[]>([]);
  const [iduser, setiduser] = useState<number>(userid);

  async function getcreneauxbyId (idCreneau : number){
    try{
      const response = await fetch(`http://localhost:8080/creneau/getbyid/${idCreneau}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      const creneauData: Creneau = await response.json();
      return creneauData
    }catch(error){
      console.error('Erreur lors de la récupération des creneaux', error);
    }
  }

  async function getreferent(ReferentId:number){
    try{
      const response = await fetch(`http://localhost:8080/user/${ReferentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      const userData: User = await response.json();
      return userData
    }catch(error){
      console.error('Erreur lors de la récupération des creneaux', error);
    }
  }

  async function fillListCreneaux(){
    console.log("list_idcreneaux",list_idcreneaux)
    const newlistcreneaux: Creneau[] = [];
    for (let i = 0; i < list_idcreneaux.length; i++) {
      const idcreneau = list_idcreneaux[i].idCreneau;
      try {
        const creneau = await getcreneauxbyId(idcreneau);
        if (creneau) {
          const referent = getreferent(creneau.ReferentId)
          creneau.referent = await referent || {idUser:0,email:"",active:false,role:"",firstName:"",lastName:"",pseudo:"",postalAdress:"",propo:"",association:"",telephone:"",flexible:false};
          newlistcreneaux.push(creneau);
        }
      } catch (error) {
        console.error('Error while fetching and converting creneau:', error);
      }
    }
    return(newlistcreneaux);
  }

  async function gethorairebyId(jourid : number){
    try{
      const response = await fetch(`http://localhost:8080/horaire/${jourid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      const horaireData: Horaire[] = await response.json();
      return horaireData
    }catch(error){
      console.error('Erreur lors de la récupération des horaires', error);
    }
  }

  async function getidcreneaubyuserid (userid : number){
    try{
      const response = await fetch(`http://localhost:8080/creneau_benevole/getcreneaux/${userid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      const creneauData:{idCreneauBenevole: number, idUser: number, idCreneau:number, }[] = await response.json();
      return(creneauData)
    }catch(error){
      console.error('Erreur lors de la récupération des creneaux', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setNbColonne(0);
      try {
        const response = await fetch('http://localhost:8080/jours', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
  
        const joursData: Jour[] = await response.json();
  
        const newlistjour: Jour[] = [];
        for (let i = 0; i < joursData.length; i++) {
          const jour = joursData[i];
          try {
            const list_horaire = await gethorairebyId(jour.id);
            newlistjour.push({ ...jour, list_horaire: list_horaire || [] });
          } catch (error) {
            console.error('Error while fetching and converting list_horaire:', error);
            newlistjour.push(jour);
          }
        }
  
        setListJours(newlistjour);
      } catch (error) {
        console.error('Erreur lors de la récupération des jours', error);
      } 
    };
  
    fetchData();
    getidcreneaubyuserid(iduser).then((creneauData) => setListIdCreneaux(creneauData || []))
  }, []);

  useEffect(() => {
    fillListCreneaux().then((creneauData) => setListCreneaux(creneauData || []));
  }, [list_idcreneaux]);


  return (
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <col/>
  <colgroup span={list_jours.length}></colgroup>
  <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
  <tr>
  <td rowSpan={list_jours.length+1}></td>
    {list_jours.map((jour)=> (
            <th colSpan={Array.isArray(jour.list_horaire) ? jour.list_horaire.length : 0} scope="colgroup" className="px-6 py-3 bg-blue-500">
              {jour.nom}
            </th>
      ))}
      <th>
      </th>
  </tr>
  <tr>
  {list_jours.map((jour, jourIndex) => (
    <React.Fragment key={jourIndex}>
      {jour.list_horaire && jour.list_horaire.length > 0 ? (
        jour.list_horaire.map((horaire, horaireIndex) => (
          <th key={horaireIndex} scope="col" className="px-6 py-3 bg-blue-500">
            <div>{horaire.heure_debut.split(':')[2]}h-{horaire.heure_fin.split(':')[2]}h</div>
            {list_creneaux.map((creneau, creneauIndex) => (
              creneau.HoraireId === horaire.id &&
              <td key={creneauIndex}>
                {creneau.titre}  Référent :  {creneau.referent.pseudo} {creneau.referent.telephone}
              </td>
            ))}
          </th>
        ))
      ) : (
        <th scope="col" className="px-6 py-3 bg-red-500">
          <div>Pas d'horaire</div>
        </th>
      )}
    </React.Fragment>
  ))}
</tr>
  </thead>
</table>
    </div>
  )
}
