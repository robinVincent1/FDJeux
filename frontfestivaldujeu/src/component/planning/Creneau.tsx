import React, {useEffect, ChangeEvent, useState } from 'react'
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
import { get } from 'http';

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

interface CreneauProps {
   idCreneau:number;
   JourId:number;
    ouvert: boolean;
    heure_debut:string;
    heure_fin:string;
    titre: string;
    nb_max: number;
    nb_inscrit: number;
    ReferentId : number;
  }
  
  const Creneau: React.FC<CreneauProps> = ({
    idCreneau,
    JourId,
    ouvert,
    heure_debut,
    heure_fin,
    titre,
    nb_max,
    nb_inscrit,
    ReferentId,
  }) => {
        const [open, setOpen] = React.useState(false);
        const [openModifier, setOpenModifier] = React.useState(false);
        const [openFlexible,setOpenFlexible] = React.useState(false);
        const [ouvertModifier, setOuvertModifier] = React.useState(ouvert);
        const [list_benevole,setListBenevole] = React.useState<User[]>([])
        const [idJour, setIdJour] = React.useState<number>(JourId);
        const [currentIdCreneau, setCurrentIdCreneau] = React.useState<number>(idCreneau);
        const [isInscrit, setInscrit] = useState<boolean | null>(null);
        const [nbmaxmodifier,setnbmaxmodifier] = React.useState<number>(nb_max)
        const [nomjour,setnomjour] = React.useState<string>("")
        const [referentlist,setreferentlist] = React.useState<User[]>([])
        const [thereferentid,setthereferentid] = React.useState<number>(ReferentId)
        const [thereferent,setthereferent]  = React.useState<User>()
        const [list_flexible,setlistflexible] = React.useState<User[]>([])
        const [idFestival, setidFestival] = React.useState<number>();
        

        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const handleOpenFlexible = () => setOpenFlexible(true)
        const handleCloseFlexible = () => setOpenFlexible(false)
        const handleOpenModifier = () => setOpenModifier(true);
        const handleCloseModifier = () => {
          setOpenModifier(false)
          setnbmaxmodifier(nb_max)
        };


        useEffect(() => {
          getidfestival().then(result => setidFestival(result as number))
          promisecheckinscrit().then(result => setInscrit(result));
          getNomJour(idJour).then(result => setnomjour(result as string));
          getreferentlist().then(result => setreferentlist(result as User[]));
          getthereferent().then(result => setthereferent(result as User));
          getflexiblebenevole().then(result => setlistflexible(result as User[]))
        }, [isInscrit])

        async function getflexiblebenevole(){
          try{
            const response = await fetch(`http://localhost:8080/user/flexible/${idFestival}`,{
                method : 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                },
              })

              const flexiblebenevole : User[] = await response.json();
              return flexiblebenevole
          }catch(error){
            console.log(error)
          }
        }

        async function getidfestival(){
          try{
            const response = await fetch(`http://localhost:8080/festival/enCours`,{
                method : 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                },
              })

              const festival : {idFestival:number} = await response.json();
              return festival.idFestival
          }catch(error){
            console.log(error)
          }
        }

        async function getreferentlist(){
          try{
            const responseReferent = await fetch(`http://localhost:8080/user/referent/${idFestival}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
        
            const referentList : User[] = await responseReferent.json();
            return referentList
          } catch (error) {
            console.error(error);
          }
        }

        const userId = () =>{ 
          const userid = localStorage.getItem('userId');
          if (userid != null){
            return parseInt(userid)
          }
          else{
            return -1
          }
  }

  async function getthereferent(){
    try{
      if (thereferentid == -1){
        return undefined
      }
      const response = await fetch(`http://localhost:8080/user/${thereferentid}`,{
      method : 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    const referent : User = await response.json();
    return referent
    }catch(error){

    }
  }

  const setthenewreferent = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setthereferentid(value as unknown as number);
  }

  const handlechangenbmax = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || !isNaN(Number(value))) {
      setnbmaxmodifier(value === "" ? 0 : Number(value));
    }
  };
        const handleChangeOuvert = (event: SelectChangeEvent) => {
          if (event.target.value == "Ouvert"){
            setOuvertModifier(true)
          }
          else{
            setOuvertModifier(false)
          }
        };

        async function changereferent(){
          try{
            const reponse = await fetch(`http://localhost:8080/creneau/modifyreferent/${currentIdCreneau}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                ReferentId : thereferentid,
                idFestival : idFestival
              })
            })
          }catch(error){
            console.log(error)
          }
        }

        async function getNomJour(id:number){
          try{
            const response = await fetch(`http://localhost:8080/jours/${id}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            })
            if (!response.ok) {
              // Si la réponse n'est pas OK, renvoyer une valeur appropriée
              console.error('Erreur lors de la récupération du jour. Statut:', response.status);
            }
        
            const jour : {idJour:number, nom:string} = await response.json();
            return jour.nom
          }
          catch(error){
            console.error('Erreur lors de la récupération du jour', error);
          }
        }

        async function addnbinscrit(nb_inscrit:number){
          try{
            const reponse = await fetch(`http://localhost:8080/creneau/addnbinscrit/${currentIdCreneau}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                nb_inscrit : nb_inscrit+1
              })
            })
          }catch(error){
            console.log(error)
          }
        }

        async function promisecheckinscrit() : Promise<boolean> {
          await fillListBenevole();
          const myuserId = userId();
          for (let i = 0; i < list_benevole.length; i++) {
            if (list_benevole[i].idUser == myuserId) {
              return true;
            }
          }
          return false;
        }



        async function getbenevole(idCreneau:number){
          try{
            const response = await fetch(`http://localhost:8080/creneau_benevole/getbenevoles/${idCreneau}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            })
            if (!response.ok) {
              // Si la réponse n'est pas OK, renvoyer une valeur appropriée
              console.error('Erreur lors de la récupération des id des users. Statut:', response.status);
            }
        
            const UserIds :{idCreneauBenevole: number, idUser: number, idCreneau:number,isPresent:number }[] = await response.json();
            return UserIds
          }
          catch(error){
            console.error('Erreur lors de la récupération des id des users', error);
          }
        }

        async function fillListBenevole(){
          const benevoleList: { idCreneauBenevole: number, idUser: number, idCreneau:number, isPresent:number }[] | undefined = await getbenevole(currentIdCreneau);
          const userlist : User[] = []
          if (benevoleList) {
            for (let i = 0; i < benevoleList.length; i++){
              const userid = benevoleList[i].idUser;
              const response = await fetch(`http://localhost:8080/user/${userid}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                },
              })
              if (!response.ok) {
                console.error('Erreur lors de la récupération de l user. Statut:', response.status);
              }
              const user : User  = await response.json()
              user.isPresent = benevoleList[i].isPresent 
              userlist.push(user)
            }
          }
          setListBenevole(userlist)
        }

      async function desinscription(idUser:number , idCreneau: number,nb_inscrit:number){
        try{
          if (idUser == -1){
            alert("Vous devez être connecté pour vous désinscrire")
          }
          else{
          const reponse = await fetch(`http://localhost:8080/creneau_benevole/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              idUser : idUser,
              idCreneau : idCreneau
            })
          })
          setInscrit(false)
          subnbinscrit(nb_inscrit)
        }
        }catch(error){
          console.log(error)
        }
      }

      async function subnbinscrit(nb_inscrit:number){
        try{
          const reponse = await fetch(`http://localhost:8080/creneau/subnbinscrit/${currentIdCreneau}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              nb_inscrit : nb_inscrit-1
            })
          })
        }catch(error){
          console.log(error)
        }
      }

      async function changeOuvert(){
        try{
          const reponse = await fetch(`http://localhost:8080/creneau/modifyouvert/${currentIdCreneau}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              ouvert : ouvertModifier
            })
          })
        }catch(error){
          console.log(error)
        }
      }

      async function changeNbMax(){
        try{
          const reponse = await fetch(`http://localhost:8080/creneau/modifynbmax/${currentIdCreneau}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              nb_max : nbmaxmodifier
            })
          })
        }catch(error){
          console.log(error)
        }
      }

      async function inscription(idUser:number , idCreneau: number,nb_inscrit:number){
          try{
            if (idUser == -1){
              alert("Vous devez être connecté pour vous inscrire")
            }
            else{
            const reponse = await fetch(`http://localhost:8080/creneau_benevole/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({
                idUser : idUser,
                idCreneau : idCreneau
              })
            })
            setInscrit(true)
            addnbinscrit(nb_inscrit)
          }
          }
          catch(error){
            console.log(error)
          }
      }
      
      function ChoseColor(): any {
        let chosedcolor = "inherit"
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
        <Button onClick={() => {handleOpen(); fillListBenevole()}}>
            <CircularProgress size="lg" color={ChoseColor()} determinate value={(nb_inscrit/nb_max)*100}>
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
                {titre} 
                </Typography>
                <Typography>
                Statut :{ouvert ? "Ouvert" : "Fermé"}
                </Typography>
                <Typography>
                 Horaire : {heure_debut}H-{heure_fin}H
                </Typography>
                <Typography>
                Inscription : ({nb_inscrit}/{nb_max})
                </Typography>
                <Typography>Référent : {thereferent?.pseudo || "Pas de référent"}  {thereferent?.telephone}</Typography>
                <Typography>
                  Inscrit(s) :
                <IconButton aria-label="delete" disabled color="primary">
                  {list_benevole.map((benevole) => (
                    <Typography style={{ color: benevole.isPresent ? 'green' : 'red' }}> • {benevole.pseudo}</Typography>
                  ))}
                    
              </IconButton>
              </Typography>
                
                
                <div className="flexible">
                <Button onClick={() => {handleOpenFlexible()}}>Inscrire des bénévoles</Button>
                <Button onClick={handleOpenModifier}>Modifié</Button>
                
                <Modal
                      open={openFlexible}
                      onClose={handleCloseFlexible}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      >
                        <ModalDialog 
                        color="neutral"
                        variant="plain"
                        >
                      <ModalClose />
                      {list_flexible.map((benevole) => (
                        <div>
                          <Typography>{benevole.pseudo}</Typography>
                          <Button onClick={() => {inscription(benevole.idUser,idCreneau,nb_inscrit); handleCloseFlexible()}}>+</Button>
                        </div>
                      ))}
                      </ModalDialog>
                      </Modal>

                {ouvert ? (
                isInscrit ? (
                <Button color="danger" onClick={() => desinscription(userId(),idCreneau,nb_inscrit)}>Se désinscrire</Button>
                ):( <Button color="success" onClick={() => inscription(userId(),idCreneau,nb_inscrit)}>S'inscrire</Button>)
                ) : null}

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
                      <div className="py-4">
                      <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Etat</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={ouvertModifier ? "Ouvert" : "Fermé"}
                              label="Etat"
                              onChange={handleChangeOuvert}
                            >
                              <MenuItem key={1} value={"Ouvert"}>Ouvert</MenuItem>
                              <MenuItem key={0} value={"Fermé"}>Fermé</MenuItem>
                            </Select>
                            </FormControl>
                        </div>
                      
                            <div className="py-4">
                            <TextField id="outlined-basic" label="Nombre max" variant="outlined" value={nbmaxmodifier} onChange={handlechangenbmax} />
                            </div>
                            <div className="py-4">
                              <FormControl fullWidth>
                            <InputLabel id="select-referent-label">Référent</InputLabel>
                            <Select
                              labelId="select-referent-label"
                              id="demo-simple-select"
                              label="Référent"
                              value={thereferentid.toString()}
                              onChange={setthenewreferent}
                            >
                              {referentlist.map((referent) => (
                                <MenuItem key={referent.idUser} value={referent.idUser}>{referent.pseudo}</MenuItem>
                              ))}
                              </Select>
                              </FormControl>
                              </div>
                          <Button onClick={() => {
                            changeOuvert();
                            changeNbMax();
                            changereferent();
                            handleCloseModifier();
                            }}>Modifier</Button>

                      </ModalDialog>
                      </Modal>
                      </div>
                    
            </ModalDialog>
        </Modal>
      </>
          </div>
    )
  }
  
  export default Creneau;