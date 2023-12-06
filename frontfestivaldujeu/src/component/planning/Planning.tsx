import React, { ChangeEvent, useState } from 'react'
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

interface PlanningProps {
  //list_jours
  list_jours:{id:number,nom:string,list_horaire:[number,number][]}[]
}

let list_ligne: { key: any; titre: string; }[] | { key: number; }[]=[]
let week =["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
let planningweek=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]

const PlanningPage : React.FC<PlanningProps> = ({
  list_jours
})  => {
  week = planningweek.filter((jour) => !list_jours.some((jour2) => jour2.nom === jour));
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [inputValueHoraire_Debut, setInputValueHoraire_Debut] = useState<string>('');
  const [inputValueHoraire_Fin, setInputValueHoraire_Fin] = useState<string>('');
  const [openModals, setOpenModals] = useState<{ [key: number]: boolean }>({});
  const [nbColonne, setNbColonne] = useState<number>(initnbColonne());
  const [openModal_Ligne, setOpenModal_Ligne] = React.useState(false);
  const [openModal_Jour, setOpenModal_Jour] = React.useState(false);

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
  
  function addToListHoraire (list:[number,number][]){
    list.push([parseInt(inputValueHoraire_Debut),parseInt(inputValueHoraire_Fin)])
    console.log(list)
    setNbColonne(nbColonne+1)
    setInputValueHoraire_Debut("");
    setInputValueHoraire_Fin("");
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



  function initnbColonne(){
    let nbColonne = 0
    for(let i=0;i<list_jours.length;i++){
      nbColonne+=list_jours[i].list_horaire.length
    }
    return nbColonne
  }

  function addtolistjour (){
    if (list_jours.length === 0){
      list_jours.push({id:0,nom:selectedValue,list_horaire:[]})
    }
    else{
    const newkey = list_jours[list_jours.length -1].id  + 1
    list_jours.push({id:newkey,nom:selectedValue,list_horaire:[]})
    }
    setSelectedValue("");
    //Remove from week all the days in the list_jour list
      planningweek = planningweek.filter((jour) => !list_jours.some((jour2) => jour2.nom === jour));

  
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
                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onClick ={  () => {
                  addToListHoraire(jour.list_horaire);
                  handleCloseModal_Horaire(jour.id);}}
                 >
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
          <div>{horaire[0]}h-{horaire[1]}h</div>
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

export default PlanningPage;