import React, { ChangeEvent, useState } from 'react'
import LignePlanning from './LignePlanning'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';


let list_ligne=[{key:1,titre:"Animation Jeux"},{key:2,titre:"Forum"}]

const PlanningPage : React.FC = ()  => {
  const [inputValue, setInputValue] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  }

  function addtolistligne (){
    const newkey = list_ligne[list_ligne.length -1].key  + 1
    list_ligne.push({key:newkey,titre:inputValue})
    console.log(list_ligne)
    setInputValue("");
  }

  function onclose(){
    handleClose();
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <col/>
  <colgroup span={2}></colgroup>
  <colgroup span={2}></colgroup>
  <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
  <tr>
    <td rowSpan={2}></td>
    <th colSpan={5} scope="colgroup" className="px-6 py-3 bg-blue-500">Samedi</th>
    <th colSpan={4} scope="colgroup" className="px-6 py-3">Dimanche</th>
  </tr>
  <tr>
    <th scope="col" className="px-6 py-3 bg-blue-500">9-11</th>
    <th scope="col" className="px-6 py-3 bg-blue-500">11-14</th>
    <th scope="col" className="px-6 py-3 bg-blue-500">14-17</th>
    <th scope="col" className="px-6 py-3 bg-blue-500">17-20</th>
    <th scope="col" className="px-6 py-3 bg-blue-500">20-22</th>
    <th scope="col">9-11</th>
    <th scope="col">11-14</th>
    <th scope="col">14-17</th>
    <th scope="col">17-20</th>
  </tr>
  </thead>
  <tbody>
  {list_ligne.map((ligne)=> (
    <LignePlanning titre={ligne.titre}/>
    ))}
          <Button onClick={handleOpen} color="danger">Ajouter une ligne</Button>
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
              Ajouter une ligne
              <Input type="text" placeholder="Nom de la ligne"  value={inputValue} onChange={handleInput} />
              
                <Button color="danger" onClick={onclose}>
                  Fermé
                </Button>
                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onClick ={  () => {
                  addtolistligne();
                  onclose();}}
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