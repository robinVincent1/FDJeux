import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../output.css";
import { Infos } from "../infosPratiques/PageInfos";
import { InfosDeroulement } from "../infosPratiques/InfosDeroulement";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { NewsType } from "../news/NewsPage";
import { NewsFav } from "./NewsFav";
import { Festival, test } from "../festival/PageFestival";
import { Button, Card, CardContent, CircularProgress, Grid } from '@mui/material';
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";
import Navbar from "../layout/Navbar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Container } from '@mui/material';
import TableauAcc from "./TableauAcc";


export const PageAccueil = () => {
  const [listeInfos, setListeInfos] = useState<Infos[]>([]);
  const [listeNewsFav, setListeNewsFav] = useState<NewsType[]>([]);
  const [festi, setFesti] = useState<Festival>(test);
  const [userConnected, setUserConnected] = useState<User>(robin);
  const [admin, setAdmin] = useState(false);
  const [isInscrit, setIsInscrit] = useState(false);
  const navigate = useNavigate();
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);
  const [list_espace, setListEspace] = useState<any[]>([]);
  const [list_jeu, setListJeu] = useState<any[]>([]);
  const [maj, setMaj] = useState(false);
  const [majtab, setmajtab] = useState(0);

  const setMajToggle = () => {
    setMaj(!maj);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    // Appel API pour récupérer le festival
    fetch("https://festival-jeu-mtp-api.onrender.com/festival/enCours", {
      method: "GET", // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setFesti(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération du festival :", error)
      );
  }, [navigate, maj, majtab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/user/${id}`, {
          method: "GET", // Remplacez 'GET' par la méthode que vous souhaitez utiliser
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserConnected(data);
        setAdmin(data.role === "admin");
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
    // Cet effet s'exécutera chaque fois que userConnected ou festi sera mis à jour
    const checkInscriptionStatus = async () => {
      setIsInscrit(userConnected.idFestival == festi.idFestival);
    };

    checkInscriptionStatus();
  }, [userConnected]);

  useEffect(() => {
    // Appel API pour récupérer toutes les news
    fetch("https://festival-jeu-mtp-api.onrender.com/news/fav", {
      method: "GET", // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setListeNewsFav(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des infos :", error)
      );
  }, []);

  useEffect(() => {
    getAllEspace().then((data) => setListEspace(data));
  }, []);

  useEffect(() => {
    // Appel API pour récupérer toutes les infos
    fetch("https://festival-jeu-mtp-api.onrender.com/infos", {
      method: "GET", // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setListeInfos(data))
      .then(() => setLoad(0))
      .catch((error) =>
        console.error("Erreur lors de la récupération des infos :", error)
      );
  }, []);

  const deleteInfo = async (id: string) => {
    try {
      await fetch(`https://festival-jeu-mtp-api.onrender.com/infos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setListeInfos((infos) => infos.filter((info) => info.idInfos !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'information :", error);
    }
  };

  const handleJeuEspace = async (planZone: string) => {
    getJeubyEspace(planZone).then((data) => setListJeu(data));
    setmajtab(4);
  };

  const getJeubyEspace = async (planZone: string) => {
    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/csv/getjeu/${planZone}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("data jeu", data);
        return data;
      }
    } catch (error: any) {
      console.error("Erreur lors de la récupération :", error.message);
    }
  };

  const getAllEspace = async () => {
    try {
      const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/csv/getallespace`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("data espace", data);
        return data;
      }
    } catch (error: any) {
      console.error("Erreur lors de la récupération :", error.message);
    }
  };

  const InscriptionFesti = async (festivalId: string, flexible: boolean) => {
    const id = localStorage.getItem("userId");

    try {
      const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          festivalId: festivalId,
          flexible: flexible,
        }),
      });

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la modification :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("Modification réussie :", data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la modification :", error.message);
    }

    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/festival/${festi.idFestival}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            role: userConnected.role,
            id: festi.idFestival,
          }),
        }
      );

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la modification :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("Modification réussie :", data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la modification :", error.message);
    }
    createRepas(1);
    createRepas(2);
    createRepas(3);
    setIsInscrit(true);
    setMajToggle();
  };

  const createRepas = async (repas: number) => {
    const idUser = localStorage.getItem("userId");

    try {
      const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/repas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          idUser: idUser,
          idFestival: festi.idFestival,
          repas: repas,
          etat: 0,
        }),
      });

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la création:", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("Créationréussie :", data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la création :", error.message);
    }
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [load, setLoad] = useState(-1);

  useEffect(() => {
    if (load !== -1) {
      setLoading(false);
    }
  }, [load]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % listeInfos.length);
    }, 2000); // Change l'info toutes les 2 secondes

    return () => clearInterval(intervalId); // Nettoie l'intervalle
  }, [listeInfos.length]);

  console.log(listeInfos);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontFamily: 'Dancing Script',
              fontSize: '2.5rem', // Taille de police personnalisée
              fontWeight: 'bold', // Gras
              color: '#1e5bb0', // Couleur de texte personnalisée
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Ombre du texte
              marginBottom: '16px', // Marge inférieure pour plus d'espace
            }}
          >
            Bienvenue sur le site du Festival du Jeu de Montpellier !
          </Typography>
          <div className="flex justify-center pt-8" style={{ marginBottom: '20px' }}>
            <img src="/Wallpap.png" alt="Affiche de l'édition 2024 du Festival du Jeu à Montpellier" />
          </div>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{
              fontFamily: 'Dancing Script',
              fontSize: '2.5rem', // Taille de police personnalisée
              fontWeight: 'bold', // Gras
              color: '#1e5bb0', // Couleur de texte personnalisée
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Ombre du texte
              marginBottom: '16px', // Marge inférieure pour plus d'espace
            }}
          >
            Actualité
          </Typography>
          {listeInfos.length > 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', my: 2 }}>
              <InfosDeroulement
                infos={listeInfos}
                onDelete={(id) => deleteInfo(id)}
                isAdmin={admin}
              />
            </Box>
          ) : (
            <CircularProgress />
          )}
          {admin && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button component={Link} to="/admin/creerinfos" startIcon={<AddCircleRoundedIcon />} variant="contained">
                Ajouter Info
              </Button>
            </Box>
          )}
        </Box>

        <Card sx={{ mb: 4, backgroundColor: '#e6f7ff' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" component="div">{festi.nom}</Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">Début: {festi.date}</Typography>
            {/* D'autres détails du festival ici */}
          </CardContent>
          {isInscrit ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
              <CheckCircleIcon sx={{ color: 'green', fontSize: 48 }} />
              <Typography variant="h6" color="text.secondary" >
                Vous êtes inscrit !
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: 2 }}>
              <Button variant="contained" onClick={() => InscriptionFesti(festi.idFestival, false)}>
                S'inscrire
              </Button>
            </Box>
          )}
        </Card>
        <Grid container spacing={2}>
          {listeNewsFav.map((news, index) => (
            <Grid item xs={12} md={4} key={index}>
              <NewsFav news={news} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{
          fontFamily: 'Dancing Script',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#1e5bb0',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
          marginBottom: '20px',
          marginTop: '20px',
        }}>
          Espaces du Festival
        </Typography>
        <Box sx={{
          display: 'flex',
          overflowX: 'auto',
          p: 2,
          gap: 3,
          bgcolor: '#e3f2fd',
          borderRadius: '15px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        }}>
          {list_espace.map((e, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleJeuEspace(e.planZone)}
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                color: '#1e88e5',
                borderColor: '#1e88e5',
                whiteSpace: 'nowrap',
                minWidth: 140,
                height: 56,
                ':hover': {
                  bgcolor: '#bbdefb',
                  borderColor: '#42a5f5',
                  color: '#0d47a1',
                },
              }}
            >
              {e.planZone}
            </Button>
          ))}
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .2)', marginBottom: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="espaces table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#1e5bb0' }}>Nom du jeu</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1e5bb0' }}>Public destiné</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1e5bb0' }}>Lien de la notice</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1e5bb0' }}>Reçu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list_jeu.map((jeu) => (
                <TableRow key={jeu.nameGame}>
                  <TableCell>{jeu.nameGame}</TableCell>
                  <TableCell>{jeu.type}</TableCell>
                  <TableCell style={{ wordBreak: 'break-all' }}>{jeu.notice}</TableCell>
                  <TableCell>{jeu.received}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="">
          <p className="flex justify-center p-8 font-bold font-serif">
            Nos membres
          </p>
        </div>
        <div className="pb-16">
          <TableauAcc Festi={festi} />
        </div>
      </Container>

    </>
  );
}
