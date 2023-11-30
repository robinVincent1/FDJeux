import * as React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface CreneauProps {
    ouvert: boolean;
    horaire: string;
    jour: string;
    titre: string;
    nb_max: number;
    nb_inscrit: number;
    list_benevole : {prenom:string,pseudo:string}[]
    referent? : {prenom:string,pseudo:string,email:string}
  }
  
  const Creneau: React.FC<CreneauProps> = ({
    ouvert,
    horaire,
    jour,
    titre,
    nb_max,
    nb_inscrit,
    list_benevole,
    referent
  }) => {
        const [open, setOpen] = React.useState(false);
        const [openModifier, setOpenModifier] = React.useState(false);
        const [ouvertModifier, setOuvertModifier] = React.useState('');
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const handleOpenModifier = () => setOpenModifier(true);
        const handleCloseModifier = () => setOpenModifier(false);
        let ouvertlocal : boolean = ouvert
      

        const handleChangeOuvert = (event: SelectChangeEvent) => {
        };


      
      function ChoseColor(){
        let chosedcolor = "default"
        const percentage = nb_inscrit/nb_max *100
        if (ouvert){
          if (percentage<34){
            chosedcolor = "danger"
          }
          if (percentage<67 && percentage>=34){
            chosedcolor = "warning"
          }
          if(percentage<100 && percentage>=67){
            chosedcolor = "success"
          }
          return chosedcolor
        }
      }
  
    return (
          <div >
            <>
        <Button onClick={handleOpen} >
            <CircularProgress size="lg" color="danger" determinate value={(nb_inscrit/nb_max)*100}>
                {nb_inscrit}/{nb_max}
            </CircularProgress>
        </Button>
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {ouvertlocal?"Ouvert":"Fermé"} / {titre} / {jour} {horaire} ({nb_inscrit}/{nb_max})
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {list_benevole.map((benevole) => (
                <Typography>
                  {benevole.prenom} ({benevole.pseudo})
                <IconButton aria-label="delete" disabled color="primary">
                  <DeleteIcon />
              </IconButton>
              </Typography>
                
            ))}
                <Typography>Referent : {referent?.prenom} ({referent?.pseudo})</Typography>
                </Typography>
                <Button onClick={handleOpenModifier}>Modifié</Button>
                  <Modal
                      open={openModifier}
                      onClose={handleCloseModifier}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      >
                        <ModalDialog 
                        color="neutral"
                        variant="plain"
                        >
                      <ModalClose />
                      <Typography id="modal-modal-title" variant="h6" component="h2">Modifier le créneau</Typography>
                      <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Etat</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={ouvertModifier}
                              label="Etat"
                              onChange={handleChangeOuvert}
                            >
                              <MenuItem value={1}>Ouvert</MenuItem>
                              <MenuItem value={0}>Fermé</MenuItem>
                            </Select>
                            <TextField id="outlined-basic" label="Nombre max" variant="outlined" />
                          </FormControl>
                          <Button onClick={handleCloseModifier}>Fermer</Button>
                          <Button onClick={handleCloseModifier}>Modifier</Button>

                      </ModalDialog>
                      </Modal>
                    
            </ModalDialog>
        </Modal>
      </>
          </div>
    )
  }
  
  export default Creneau;