import * as React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';

interface CreneauProps {
    ouvert: boolean;
    horaire: string;
    jour: string;
    titre: string;
    nb_max: number;
    nb_inscrit: number;
  }
  
  const Creneau: React.FC<CreneauProps> = ({
    ouvert,
    horaire,
    jour,
    titre,
    nb_max,
    nb_inscrit
  }) => {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
      const list_benevole=[{prenom:"Lilian",pseudo:"Lilianmnr"},{prenom:"Robin",pseudo:"RobinV"},{prenom:"Lucas",pseudo:"LucasV"}]
      const referent={prenom:"Roger",pseudo:"Rogermnr",email:"rogermnr@gmail.com"}
  
  
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
                {ouvert?"Ouvert":"Fermé"} / {titre} / {jour} {horaire} ({nb_inscrit}/{nb_max})
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {list_benevole.map((benevole) => (
                <Typography>{benevole.prenom} ({benevole.pseudo})</Typography>
            ))}
                <Typography>Referent : {referent.prenom} ({referent.pseudo})</Typography>
                </Typography>
            </ModalDialog>
        </Modal>
      </>
          </div>
    )
  }
  
  export default Creneau;