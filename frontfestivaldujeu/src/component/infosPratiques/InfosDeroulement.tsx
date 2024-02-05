import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Slide, IconButton, Fade } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Infos {
  idInfos: string;
  titre: string;
  description: string;
}

interface InfosDeroulementProps {
  infos: Infos[];
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export const InfosDeroulement: React.FC<InfosDeroulementProps> = ({ infos, onDelete, isAdmin }) => {
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % infos.length);
    }, 3000); // Change d'information toutes les 10 secondes

    return () => clearInterval(interval);
  }, [infos.length]);

  const currentInfo = infos[currentInfoIndex];

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Etes-vous sûr de vouloir supprimer cette information ?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/infos/${currentInfo.idInfos}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        if (response.status === 204) {
          // Suppression réussie
          onDelete(currentInfo.idInfos);
          // Mettre à jour l'index pour pointer vers la prochaine information
          setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % infos.length);
        } else {
          // Gérer d'autres statuts de réponse en conséquence
          console.error(
            `Erreur lors de la suppression de l'information. Statut ${response.status}`
          );
        }
      } catch (error: any) {
        console.error(
          "Erreur lors de la suppression de l'information:",
          error.message
        );
      }
      console.log("Information deleted!");
    }
  };
  

  if (!infos.length) {
    return null; // Ne rien afficher s'il n'y a pas d'infos
  }
  return (
    <Paper elevation={4} sx={{ backgroundColor: '#1e5bb0', color: '#ffffff', padding: '8px', margin: '8px auto', width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Slide in={true} direction="right" timeout={1000}>
          <Typography variant="h6" gutterBottom>
            {currentInfo.titre}
          </Typography>
        </Slide>
        <Fade in={true} timeout={1000}>
          <Typography>
            {currentInfo.description}
          </Typography>
        </Fade>
        {isAdmin && (
          <IconButton onClick={handleDelete} color="inherit">
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}
