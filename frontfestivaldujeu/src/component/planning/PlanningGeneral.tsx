import React, {useEffect, ChangeEvent, useState } from 'react'
import LignePlanning from './LignePlanning'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Form } from 'react-router-dom';

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
  referent : string,
  heure_debut: string;
  heure_fin: string;
  ReferentId: number;
}

interface Ligne {
  idPlanningGeneralLigne : number;
  PlanningGeneralId: number;
  titre: string;
  list_creneaux : Creneau[];
}

interface PlanningGeneralProps {
  PlanningId: number;
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
  flexible:boolean,
  isPresent:number,
}



let week =["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]

const PlanningGeneral : React.FC<PlanningGeneralProps> = ({
  PlanningId
}) => {

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedValue_ModifyJour, setSelectedValue_ModifyJour] = useState<string>('');
  const [inputValueHoraire_Debut, setInputValueHoraire_Debut] = useState<string>('');
  const [inputValueHoraire_Fin, setInputValueHoraire_Fin] = useState<string>('');
  const [inputValueModifyHoraire_Debut, setInputValueModifyHoraire_Debut] = useState<string>('');
  const [inputValueModifyHoraire_Fin, setInputValueModifyHoraire_Fin] = useState<string>('');
  const [openModals, setOpenModals] = useState<{ [key: number]: boolean }>({});
  const [openModals_Presence, setOpenModals_Presence] = useState<{ [key: number]: boolean }>({});
  const [openModals_ModifyJour, setOpenModals_ModifyJour] = useState<{ [key: number]: boolean }>({});
  const [openModals_ModifyHoraire, setOpenModals_ModifyHoraire] = useState<{ [key: number]: boolean }>({});
  const [nbColonne, setNbColonne] = useState<number>(0);
  const [openModal_Ligne, setOpenModal_Ligne] = React.useState(false);
  const [openModal_Jour, setOpenModal_Jour] = React.useState(false);
  const [list_jours, setListJours] = useState<Jour[]>([]);
  const [list_ligne, setListLigne] = useState<Ligne[]>([]);
  const [loading, setLoading] = useState(true);
  const [listUserPresent,setListUserPresent] = useState<User[]>([]);
  const [maj,setmaj] = useState<number>(0);







  const handleChange_ModifyJour = (event: SelectChangeEvent) => {
    setSelectedValue_ModifyJour(event.target.value as string);
  };


  const handleOpenModal_Jour = () => setOpenModal_Jour(true);
  const handleCloseModal_Jour = () => setOpenModal_Jour(false);

  const handleOpenModal_Ligne = () => setOpenModal_Ligne(true);
  const handleCloseModal_Ligne = () => setOpenModal_Ligne(false);

  async function handleOpenModal_Presence (jourId: number){
    setListUserPresent([]);
    await getListPresence(jourId);
    setOpenModals_Presence((prevOpenModals) => ({ ...prevOpenModals, [jourId]: true }));
  }

  const handleCloseModal_Presence = (jourId: number) => {
    setOpenModals_Presence((prevOpenModals) => ({ ...prevOpenModals, [jourId]: false }));
  }

  const handleOpenModal_ModifyHoraire = (horaireId: number) => {
    setOpenModals_ModifyHoraire((prevOpenModals) => ({ ...prevOpenModals, [horaireId]: true }));
  };

  const handleCloseModal_ModifyHoraire = (horaireId: number) => {
    setOpenModals_ModifyHoraire((prevOpenModals) => ({ ...prevOpenModals, [horaireId]: false }));
    setmaj(5)
  };

  const handleOpenModal_ModifyJour = (jourId: number) => {
    setOpenModals_ModifyJour((prevOpenModals) => ({ ...prevOpenModals, [jourId]: true }));
  };

  const handleCloseModal_ModifyJour = (jourId: number) => {
    setOpenModals_ModifyJour((prevOpenModals) => ({ ...prevOpenModals, [jourId]: false }));
  };

  const handleOpenModal_Horaire = (jourId: number) => {
    setOpenModals((prevOpenModals) => ({ ...prevOpenModals, [jourId]: true }));
  };

  const handleCloseModal_Horaire = (jourId: number) => {
    setOpenModals((prevOpenModals) => ({ ...prevOpenModals, [jourId]: false }));
  };

  const handleInputModifyHoraire_Debut = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValueModifyHoraire_Debut(value);
  }

  const handleInputModifyHoraire_Fin = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValueModifyHoraire_Fin(value);
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  }

  const handleInputHoraire_Debut = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValueHoraire_Debut(value);
  }

  const handleInputHoraire_Fin = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValueHoraire_Fin(value);
  }
  async function getListPresence(jourId: number) {
    const listcreneau = await getcreneaubyJourId(jourId);
    listcreneau?.forEach(async creneau => {
      const listUserId = await getUserIdByCreneauId(creneau.idCreneau);
      listUserId?.forEach(async user => {
        const userPresent = await getUserById(user.idUser);
        if (userPresent) {
          userPresent.isPresent = user.isPresent;
          setListUserPresent((prevListUserPresent) => [...prevListUserPresent, userPresent]);
        }
      });
    });
  }

  async function ChangePresence(jour: Jour, user: User,isPresent:number){
   const list_creneaux = await getcreneaubyJourId(jour.id)
   list_creneaux?.forEach(async creneau => {
    try{
      const response = await fetch('http://localhost:8080/creneau_benevole/isPresent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        idCreneau: creneau.idCreneau,
        idUser: user.idUser,
        isPresent: isPresent,
      }),
    }
      )
  }
  catch (error) {
    console.error('Erreur lors de l\'ajout de la ligne', error);
  }
  }
   )
  }

  async function modifyjour(jourId: number){
    try{
      const response = await fetch(`http://localhost:8080/jours/${jourId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        nom: selectedValue_ModifyJour,
      }),
    }
      )
  }
  catch (error) {
    console.error('Erreur lors de l\'ajout de la ligne', error);
  }
  setmaj(3)
  }

  async function deletejour(jourId: number){
    try{
      const response = await fetch(`http://localhost:8080/jours/${jourId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }
      )
      const response2 = await fetch(`http://localhost:8080/horaire/deletebyjour/${jourId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
        )
      const response3 = await fetch(`http://localhost:8080/creneau/deletebyjour/${jourId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
        )
  }
  catch (error) {
    console.error('Erreur lors de l\'ajout de la ligne', error);
  }
  setmaj(4)
  }

  async function deletehoraire(horaireId: number){
    try{
      const response = await fetch(`http://localhost:8080/horaire/${horaireId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }
      )
      const response2 = await fetch(`http://localhost:8080/creneau/deletebyhoraire/${horaireId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
        )
  }
  catch (error) {
    console.error('Erreur lors de l\'ajout de la ligne', error);
  }
  setmaj(6)
  }

  async function modifyhoraire(horaireId: number){
    try{
      const response = await fetch(`http://localhost:8080/horaire/${horaireId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        heure_debut: inputValueModifyHoraire_Debut,
        heure_fin: inputValueModifyHoraire_Fin,
      }),
    }
      )
      const reponse2 = await fetch(`http://localhost:8080/creneau/modifyhoraire/${horaireId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          heure_debut: inputValueModifyHoraire_Debut,
          heure_fin: inputValueModifyHoraire_Fin,
        }),
      }
        )
  }
  catch (error) {
    console.error('Erreur lors de l\'ajout de la ligne', error);
  }
  handleCloseModal_ModifyHoraire(horaireId);
  setmaj(2)
  }

  async function getUserById(idUser: number){
    try {
      const response = await fetch(`http://localhost:8080/user/${idUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        // Si la réponse n'est pas OK, renvoyer une valeur appropriée
        console.error('Erreur lors de la récupération des creneaux. Statut:', response.status);
        return undefined;
      }
  
      const user : User = await response.json();
      return user;
    } catch (error) {
      console.error('Erreur lors de la récupération des creneaux', error);
      // Gérer l'erreur ici, si nécessaire
      return undefined;
    }
  }

  async function getUserIdByCreneauId(idCreneau: number){
    try {
      const response = await fetch(`http://localhost:8080/creneau_benevole/getbenevoles/${idCreneau}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        // Si la réponse n'est pas OK, renvoyer une valeur appropriée
        console.error('Erreur lors de la récupération des creneaux. Statut:', response.status);
        return undefined;
      }
  
      const ListUserId : User[] = await response.json();
      return ListUserId;
    } catch (error) {
      console.error('Erreur lors de la récupération des creneaux', error);
      // Gérer l'erreur ici, si nécessaire
      return undefined;
    }
  }

  async function getcreneaubyJourId(jourId: number){
    try {
      const response = await fetch(`http://localhost:8080/creneau/${jourId}/${PlanningId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        // Si la réponse n'est pas OK, renvoyer une valeur appropriée
        console.error('Erreur lors de la récupération des creneaux. Statut:', response.status);
        return undefined;
      }
  
      const creneauData : Creneau[] = await response.json();
      console.log('creneauData',creneauData)
      return creneauData;
    } catch (error) {
      console.error('Erreur lors de la récupération des creneaux', error);
      // Gérer l'erreur ici, si nécessaire
      return undefined;
    }
  }
  
  async function createcreneau(jourid: number, horaireid: number, LigneId: number, titre: string,heure_debut:string,heure_fin:string) {
    try {
      const response = await fetch('http://localhost:8080/creneau', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          LigneId: LigneId,
          JourId: jourid,
          HoraireId: horaireid,
          idPlanning : PlanningId,
          ouvert: false,
          titre: titre,
          heure_debut,
          heure_fin,
          nb_max: 10,
          nb_inscrit: 0,
          ReferentId: -1
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du creneau 1');
      }
  
      const creneauData: Creneau = await response.json();
      return creneauData;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du creneau 2', error);
      throw error;
    }
  }
  

  async function getcreneaubyId(JourId: number, HoraireId: number, LigneId: number,idPlanning:number){
    try {
      const response = await fetch(`http://localhost:8080/creneau/${JourId}/${HoraireId}/${LigneId}/${idPlanning}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        // Si la réponse n'est pas OK, renvoyer une valeur appropriée
        console.error('Erreur lors de la récupération des creneaux. Statut:', response.status);
        return undefined;
      }
  
      const creneauData : Creneau = await response.json();
      return creneauData;
    } catch (error) {
      console.error('Erreur lors de la récupération des creneaux', error);
      // Gérer l'erreur ici, si nécessaire
      return undefined;
    }
  }
  

  async function addcreneautolistligne (){
    const newlistligne : Ligne[] = [...list_ligne];
    newlistligne.forEach(ligne => {
      ligne.list_creneaux = [];
    });
    for(let i = 0; i < list_ligne.length; i++){
      for(let j=0; j < list_jours.length; j++){
        for(let k=0; k < list_jours[j].list_horaire.length; k++){
          const creneauData = await getcreneaubyId(list_jours[j].id, list_jours[j].list_horaire[k].id, list_ligne[i].idPlanningGeneralLigne,PlanningId);
          if (creneauData == undefined ) {
            await createcreneau(list_jours[j].id,list_jours[j].list_horaire[k].id,list_ligne[i].idPlanningGeneralLigne,list_ligne[i].titre,list_jours[j].list_horaire[k].heure_debut,list_jours[j].list_horaire[k].heure_fin);

          }
          if (creneauData) {
            newlistligne[i].list_creneaux.push(creneauData)
          }
        }
    }
  }
  setListLigne(newlistligne)
}





  async function addligne (){
      try{
        const response = await fetch('http://localhost:8080/planning_general_ligne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          titre: inputValue,
          idPlanningGeneral: PlanningId,
        }),
      });
      }
      catch (error) {
    console.error('Erreur lors de l\'ajout de la ligne', error);
    }
    setmaj(3)
  }

  async function getligne (){
    try{
      console.log()
      const response = await fetch(`http://localhost:8080/planning_general_ligne/${PlanningId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      const ligneData: Ligne[] = await response.json();
      setListLigne(ligneData) 
    }catch(error){
      console.error('Erreur lors de la récupération des lignes', error);
    }
  }

  

  async function gethorairebyId(jourid : number,idPlanning : number){
    try{
      const response = await fetch(`http://localhost:8080/horaire/${jourid}/${idPlanning}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      const horaireData: Horaire[] = await response.json();
      return horaireData
    }catch(error){
      console.error('Erreur lors de la récupération des horaires', error);
    }
  }

  
  async function addtolisthoraire (jourid : number){
    try{
      const response = await fetch('http://localhost:8080/horaire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        heure_debut: parseInt(inputValueHoraire_Debut),
        heure_fin: parseInt(inputValueHoraire_Fin),
        jourId : jourid,
        idPlanning : PlanningId,
      }),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout de l\'horaire');
    }
    }catch (error) {
  console.error('Erreur lors de l\'ajout de l\'horaire', error);
  }
  setInputValueHoraire_Debut('');
  setInputValueHoraire_Fin('');
  handleCloseModal_Horaire(jourid);
  setmaj(2)

  }

  async function addtolistjour (){
    try{
      const response = await fetch('http://localhost:8080/jours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        nom: selectedValue,
        idPlanning: PlanningId,
      
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout du jour');
    }
    }catch (error) {
  console.error('Erreur lors de l\'ajout du jour', error);
  }
  setmaj(1)
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



 // ...

useEffect(() => {
  const fetchData = async () => {
    setNbColonne(0);
    try {
      const response = await fetch(`http://localhost:8080/jours/${PlanningId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const joursData: Jour[] = await response.json();

      const newlistjour: Jour[] = [];
      for (let i = 0; i < joursData.length; i++) {
        const jour = joursData[i];
        try {
          const list_horaire = await gethorairebyId(jour.id,PlanningId);
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
  getligne();
}, [maj]);

const [hasAddedCreneaux, setHasAddedCreneaux] = useState(false);

useEffect(() => {
  if (list_ligne.length > 0 && !hasAddedCreneaux && list_jours.length > 0) {
    addcreneautolistligne();
    setHasAddedCreneaux(true);
    setLoading(false);
  }
  else{
    setLoading(false)
  }
}, [list_ligne, hasAddedCreneaux,list_jours]);





  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {loading ? (
      // Afficher un indicateur de chargement ou un message pendant le chargement
      <p>Chargement en cours...</p>
    ) : (
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <col/>
  <colgroup span={list_jours.length}></colgroup>
  <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
  <tr>
  <td rowSpan={list_jours.length+1}></td>
    {list_jours.map((jour)=> (
            <th colSpan={Array.isArray(jour.list_horaire) ? jour.list_horaire.length : 0} scope="colgroup" className="px-6 py-3 bg-blue-500">
              <Button onClick={() => {setSelectedValue_ModifyJour(jour.nom);
                handleOpenModal_ModifyJour(jour.id)}} >{jour.nom}</Button>
              <Modal
                open={openModals_ModifyJour[jour.id] || false}
                onClose={() => handleCloseModal_ModifyJour(jour.id)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalDialog>
                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Jour</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedValue_ModifyJour}
                  label="Jour"
                  onChange={handleChange_ModifyJour}
                >
              {week.map((jour,index)=> (
                <MenuItem key={index} value={jour}>{jour}</MenuItem>
              ))}

            </Select>
</FormControl>
                  <Button onClick={() => {modifyjour(jour.id); handleCloseModal_ModifyJour(jour.id)}} color="danger">Modifier</Button>
                  <Button onClick={() => {deletejour(jour.id); handleCloseModal_ModifyJour(jour.id)}} color="danger">Supprimer</Button>
                  <Button onClick={() => handleCloseModal_ModifyJour(jour.id)} color="danger">Fermer</Button>
                </ModalDialog>
              </Modal>
              <div>
              <Button onClick={() => handleOpenModal_Presence(jour.id)} color="danger">Présence</Button>
              <Modal
                open={openModals_Presence[jour.id] || false}
                onClose={() => handleCloseModal_Presence(jour.id)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalDialog 
                  color="neutral"
                  variant="plain"
                >
                  Ajouter une présence
                  {listUserPresent.map((user) => (
                    <div>
                      <div style={{ color: user.isPresent ? 'green' : 'red' }} key={user.idUser}>{user.pseudo}</div>
                      <FormGroup>
                        <FormControlLabel control={<Switch color="success" checked={presentornot(user.isPresent)} onChange={() =>  {ChangePresence(jour,user,changeisPresent(user.isPresent))
                        user.isPresent = changeisPresent(user.isPresent); setListUserPresent([...listUserPresent])}} />} label="Présent"/>
                      </FormGroup>
                    </div>
                  ))}
                  <Button color="danger" onClick={() => handleCloseModal_Presence(jour.id)}>
                    Fermé
                  </Button>
                </ModalDialog>
              </Modal>
              </div>
              <div>
              <Button onClick={() => handleOpenModal_Horaire(jour.id)} color="danger">+</Button>
              <Modal 
                open={openModals[jour.id] || false}
                onClose={() => handleCloseModal_Horaire(jour.id)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalDialog 
                  color="neutral"
                  variant="plain"
                >
                  Ajouter une horaire
                  <Input className="w-1/2" type="text" placeholder="Heure de début" value={inputValueHoraire_Debut}  onChange={handleInputHoraire_Debut} />
                  <Input className="w-1/2" type="text" placeholder="Heure de fin"  value={inputValueHoraire_Fin} onChange={handleInputHoraire_Fin} />
                  <Button color="danger" onClick={() => handleCloseModal_Horaire(jour.id)}>
                    Fermé
                  </Button>
                  <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onClick={() => addtolisthoraire(jour.id)}>
                    Ajouter
                  </Button>
                </ModalDialog>
              </Modal>
              </div>

            </th>
      ))}
      <th>
      <Button onClick={handleOpenModal_Jour} color="danger">Ajouter un jour</Button>
      <Modal 
        open={openModal_Jour}
        onClose={handleCloseModal_Jour}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <ModalDialog 
                color="neutral"
                variant="plain"
                >
              Ajouter un jour
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Jour</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedValue}
                  label="Jour"
                  onChange={handleChange}
                >
              {week.map((jour,index)=> (
                <MenuItem key={index} value={jour}>{jour}</MenuItem>
              ))}
              </Select>
            </FormControl>
              
                <Button color="danger" onClick={handleCloseModal_Jour}>
                  Fermé
                </Button>
                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onClick ={  () => {
                  addtolistjour();
                  handleCloseModal_Jour();}}
                 >
                  Ajouter
                </Button>
                </ModalDialog>
      </Modal>
      </th>
  </tr>
    <tr>
    {list_jours.map((jour)=> (
      <>
        {jour.list_horaire && jour.list_horaire.map((horaire) => (
          <th scope="col" className="px-6 py-3 bg-blue-500">
          <Button onClick={() => {setInputValueModifyHoraire_Debut(horaire.heure_debut);
            setInputValueModifyHoraire_Fin(horaire.heure_fin);
            handleOpenModal_ModifyHoraire(horaire.id)}} >{horaire.heure_debut}h-{horaire.heure_fin}h</Button>
          <Modal
            open={openModals_ModifyHoraire[horaire.id] || false}
            onClose={() => handleCloseModal_ModifyHoraire(horaire.id)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalDialog>
            Ajouter une horaire
                  <Input className="w-1/2" type="text" placeholder="Heure de début" value={inputValueModifyHoraire_Debut}  onChange={handleInputModifyHoraire_Debut} />
                  <Input className="w-1/2" type="text" placeholder="Heure de fin"  value={inputValueModifyHoraire_Fin} onChange={handleInputModifyHoraire_Fin} />
              <Button color="danger" onClick={() => {modifyhoraire(horaire.id)} } >Modifier</Button>
              <Button color="danger" onClick={() => {deletehoraire(horaire.id) ;handleCloseModal_Horaire(horaire.id)} } >Supprimer</Button>
              <Button color="danger" onClick={() => {handleCloseModal_ModifyHoraire(horaire.id)} } >Fermer</Button>
            </ModalDialog>
          </Modal>
          </th>
         ))}
        
        </>
      ))}
  </tr>
  </thead>
  <tbody>
  {Array.isArray(list_ligne) && list_ligne.map((ligne)=> (
    'titre' in ligne && <LignePlanning titre={ligne.titre} nb_creneaux={nbColonne} list_creneaux={ligne.list_creneaux as Creneau[]} idPlanningGeneraLigne={ligne.idPlanningGeneralLigne} idPlanning={PlanningId}/>
    ))}
          <Button onClick={handleOpenModal_Ligne} color="danger">Ajouter une ligne</Button>
      <Modal 
        open={openModal_Ligne}
        onClose={handleCloseModal_Ligne}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <ModalDialog 
                color="neutral"
                variant="plain"
                >
              Ajouter une ligne
              <Input type="text" placeholder="Nom de la ligne"  value={inputValue} onChange={handleInput} />
                <Button color="danger" onClick={handleCloseModal_Ligne}>
                  Fermé
                </Button>
                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onClick ={  () => {
                  addligne();
                  handleCloseModal_Ligne();}}
                 >
                  Ajouter
                </Button>
                </ModalDialog>
      </Modal>
  </tbody>
</table>
    )}
    </div>
  )
}

export default PlanningGeneral;