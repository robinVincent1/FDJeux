import React, {useEffect, ChangeEvent, useState } from 'react'
import LignePlanning from './LignePlanning'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Horaire {
  id: number;
  debut: number;
  fin: number;
}

interface Jour {
  id: number;
  nom: string;
  list_horaire: Horaire[];
}

interface PlanningProps {
  list_ligne: { key: any; titre: string; }[]
}


let week =["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
let planningweek=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]

const PlanningGeneral : React.FC<PlanningProps> = ({
  list_ligne
})  => {

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [inputValueHoraire_Debut, setInputValueHoraire_Debut] = useState<string>('');
  const [inputValueHoraire_Fin, setInputValueHoraire_Fin] = useState<string>('');
  const [openModals, setOpenModals] = useState<{ [key: number]: boolean }>({});
  const [nbColonne, setNbColonne] = useState<number>(0);
  const [openModal_Ligne, setOpenModal_Ligne] = React.useState(false);
  const [openModal_Jour, setOpenModal_Jour] = React.useState(false);
  const [list_jours, setListJours] = useState<Jour[]>([]);

  useEffect(() => {
    getAllJours();
  }, []);



  const handleOpenModal_Jour = () => setOpenModal_Jour(true);
  const handleCloseModal_Jour = () => setOpenModal_Jour(false);

  const handleOpenModal_Ligne = () => setOpenModal_Ligne(true);
  const handleCloseModal_Ligne = () => setOpenModal_Ligne(false);

  const handleOpenModal_Horaire = (jourId: number) => {
    setOpenModals((prevOpenModals) => ({ ...prevOpenModals, [jourId]: true }));
  };

  const handleCloseModal_Horaire = (jourId: number) => {
    setOpenModals((prevOpenModals) => ({ ...prevOpenModals, [jourId]: false }));
  };

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
  

  function addtolistligne (){
    if (list_ligne.length === 0){
      list_ligne.push({key:0,titre:inputValue})
    }
    else{
    const newkey = list_ligne[list_ligne.length -1].key  + 1
    list_ligne.push({key:newkey,titre:inputValue})
    setInputValue("");
    }
  }



  async function initnbColonne(){
    let nbColonne = 0
    for(let i=0;i<list_jours.length;i++){
      nbColonne+=list_jours[i].list_horaire.length
    }
    return nbColonne
  }

  async function fillListhoraire(jourid : number){
    try{
      const response = await fetch(`http://localhost:8080/horaire/${jourid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      const horaireData: Horaire[] = await response.json();
      return horaireData
    }
  }



  async function addtolisthoraire (jourid : number){
    try{
      const response = await fetch('http://localhost:8080/horaire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        heure_debut: parseInt(inputValueHoraire_Debut),
        heure_fin: parseInt(inputValueHoraire_Fin),
        jourId : jourid,
      }),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout de l\'horaire');
    }
    }catch (error) {
  console.error('Erreur lors de l\'ajout de l\'horaire', error);
  }
  }

  async function addtolistjour (){
    try{
      const response = await fetch('http://localhost:8080/jours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: selectedValue
      
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout du jour');
    }
    }catch (error) {
  console.error('Erreur lors de l\'ajout du jour', error);
  }
  }
 
  async function getAllJours(){
    try{
      const response = await fetch('http://localhost:8080/jours', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      const joursData: Jour[] = await response.json();
      const joursAvecListeHoraire = joursData.map(jour => ({
        ...jour,
        list_horaire: jour.list_horaire || [],
      }));
      setListJours(joursAvecListeHoraire);
    ;}
    catch (error) {
  console.error('Erreur lors de la récupération des jours', error);
    }
  }


    


  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };



  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <col/>
  <colgroup span={list_jours.length}></colgroup>
  <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
  <tr>
  <td rowSpan={list_jours.length+1}></td>
    {list_jours.map((jour)=> (
            <th colSpan={jour.list_horaire.length} scope="colgroup" className="px-6 py-3 bg-blue-500">
              {jour.nom}
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
              {week.map((jour)=> (
                <MenuItem value={jour}>{jour}</MenuItem>
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
        {jour.list_horaire.map((horaire) => (
          <th scope="col" className="px-6 py-3 bg-blue-500">
          <div>{horaire.debut}h-{horaire.fin}h</div>
          </th>
        ))}
        
        </>
      ))}
  </tr>
  </thead>
  <tbody>
  {list_ligne.map((ligne)=> (
    'titre' in ligne && <LignePlanning titre={ligne.titre} nb_creneaux={nbColonne}/>
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
                  addtolistligne();
                  handleCloseModal_Ligne();}}
                 >
                  Ajouter
                </Button>
                </ModalDialog>
      </Modal>
  </tbody>
</table>
    </div>
  )
}

export default PlanningGeneral;