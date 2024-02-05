import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper } from '@mui/material';
import Tableau from "./tableau";
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";
import Navbar from "../layout/Navbar";
import Loader from "../layout/Loader";
import { Buffer } from "buffer";
import { InfosDeroulement } from "../infosPratiques/InfosDeroulement";

export type Festival = {
  idFestival: string;
  nom: string;
  date: string;
  nbReferent: number;
  nbRespoSoiree: number;
  nbAccueilBenevole: number;
  nbBenevole: number;
  enCours: boolean;
  idPlanning: string;
};

export const test: Festival = {
  idFestival: "1",
  nom: "festi1",
  date: "31/04/2024",
  nbReferent: 5,
  nbRespoSoiree: 3,
  nbAccueilBenevole: 8,
  nbBenevole: 1,
  enCours: true,
  idPlanning: "",
};

export const PageFestival = () => {
  const nav = useNavigate();
  const token = localStorage.getItem('token');
  const [liste, setListe] = useState<Festival[]>([]);
  const [maj, setMaj] = useState(false);
  const [userConnected, setUserConnected] = useState<User>(robin);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  

  let isAdmin = false;

  if (token) {
    const tokenBody = token.split('.')[1];
    if (tokenBody) {
      const decodedToken = JSON.parse(Buffer.from(tokenBody, 'base64').toString());
      isAdmin = decodedToken.admin;
    }
  }


  const MAJ = () => {
    setMaj(!maj);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:8080/user/${id}`, {
          method: "GET", // Remplacez 'GET' par la méthode que vous souhaitez utiliser
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserConnected(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Appel API pour récupérer tous les festivals
    fetch("http://localhost:8080/festival", {
      method: "GET", // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setListe(data))
      .then((data) => console.log(data))
      .then(() => setLoad(0))
      .catch((error) =>
        console.error("Erreur lors de la récupération des festivals :", error)
      );
  }, [maj]);

  const [loading, setLoading] = useState<boolean>(true);
  const [load, setLoad] = useState(-1);

  useEffect(() => {
    if (load !== -1) {
      setLoading(false);
    }
  }, [load]);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus('');
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Veuillez sélectionner un fichier.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch('http://localhost:8080/csv/post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const csvContent = await response.text();
        const rows = csvContent.split('\n').map(row => row.split(','));
        setUploadStatus('Le fichier a été téléversé et traité avec succès.');
      } else {
        setUploadStatus('Erreur lors du téléversement du fichier.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
      setUploadStatus('Erreur lors du téléversement du fichier.');
    }
  };


  return (
    <div>
  {loading ? (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Loader />
      </div>
    </div>
  ) : (
    <div>
      <Navbar />
      <h1 className="flex justify-center p-16 font-bold text-2xl text-[#0A5483] font-serif">
        {" "}
        FESTIVALS
      </h1>
      <div className="pt-16 p-4">
        {liste.length > 0 ? (
          <Tableau listeFesti={liste} maj={MAJ} u={userConnected} />
        ) : (
          <p>Aucun festival disponible.</p>
        )}
      </div>

      <div className="flex justify-center p-8">
        {isAdmin && (
          <Button
            onClick={() => {
              nav("/admin/CreerFestival");
            }}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ width: "20%" }}
          >
            Créer un festival
          </Button>
        )}
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          backgroundColor: "white",
          borderRadius: 8, 
          boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.1)", 
        }}
      >
        {isAdmin && (
          <Typography variant="h4" gutterBottom sx={{ color: "#1e5bb0" }}>
            Téléversement de fichier CSV
          </Typography>
        )}

        {isAdmin && (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              width: "100%",
              maxWidth: 500,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#ffffff",
              borderStyle: "dashed",
              borderColor: "#1e5bb0",
              borderWidth: "2px",
              "&:hover": {
                backgroundColor: "#a5c5f2",
              },
            }}
          >
            {isAdmin && (
              <Typography>
                Glissez et déposez votre fichier ici ou cliquez pour sélectionner un fichier
              </Typography>
            )}
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="contained-button-file"
            />
            <label htmlFor="contained-button-file">
              {isAdmin && (
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    mt: 2,
                    backgroundColor: "#1e5bb0",
                    "&:hover": {
                      backgroundColor: "#1e5bb0",
                    },
                  }}
                >
                  Choisissez un fichier
                </Button>
              )}
            </label>
          </Paper>
        )}

        {isAdmin && (
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#1e5bb0",
              "&:hover": {
                backgroundColor: "#1e5bb0",
              },
            }}
            onClick={handleFileUpload}
          >
            Envoyer le fichier
          </Button>
        )}

        {uploadStatus && (
          <Typography color="green" sx={{ mt: 2 }}>
            {uploadStatus}
          </Typography>
        )}
      </Box>
    </div>
  )}
</div>
  );
};
