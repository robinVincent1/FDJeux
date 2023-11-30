'use client'
import React, { ChangeEvent, useState,useEffect } from 'react'
import Creneau from './Creneau'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';

interface LigneProps {
    titre:string;
    nb_creneaux:number;
  }

const LignePlanning: React.FC<LigneProps> = ({
    titre: initialTitre,
    nb_creneaux
}) => {
    const [titre, setTitre] = useState<string>(initialTitre);
    const [inputValue, setInputValue] = useState<string>('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setInputValue(titre);
      }, [titre]);

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
      }

      function modificationtitre(){
        setTitre(inputValue);
      }

      function onclose(){
        handleClose();
      }
      const generateCreneaux = () => {
      const creneaux = [];
      for (let i = 0; i < nb_creneaux; i++) {
        creneaux.push(
          <td key={i} className="px-6 py-4 bg-blue-500">
            <Creneau ouvert={true} horaire="9h-11h" jour="Samedi" titre={titre} nb_max={15} nb_inscrit={8} list_benevole={[]} />
          </td>
        );
      }
      return creneaux;
    };
    
  return (
        <tr className="bg-blue-600 border-b border-blue-400">
    <th scope="row" className="bg-blue-600 border-b border-blue-400">
    <Button onClick={handleOpen}>{titre}</Button>
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalDialog 
                color="neutral"
                variant="plain"
                >
                <ModalClose />
                <Typography id="modal-modal-title" variant="h6" component="h2">{titre}</Typography>
              
              <Input type="text" placeholder="Modifier le nom de la ligne"  value={inputValue} onChange={handleInput} />
                <Button className="bg-red-600 shadow-lg shadow-indigo-500/20" onClick={onclose}>
                  Supprimé
                </Button>
                <Button variant="outlined" color="danger"  onClick={onclose}>
                  Fermé
                </Button>
                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onClick={ () => {
                  modificationtitre();
                  onclose();
                  }}>
                  Modifié
                </Button>
        </ModalDialog>
      </Modal>
      </th>
        {generateCreneaux()}
    </tr>
  )
}

export default LignePlanning;