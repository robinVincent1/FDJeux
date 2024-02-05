import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../output.css";
import { News } from "../news/News";
import { useState } from "react";
import { 
  Container, 
  Grid, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardActions, 
  Button, 
  Typography,
  CircularProgress,
  Box
} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";
import Navbar from "../layout/Navbar";
import Loader from "../layout/Loader";

export type NewsType = {
  idNews: string;
  titre: string;
  description: string;
  createur: string;
  favori: boolean;
};

export const NewsPage = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [userConnected, setUserConnected] = useState<User>(robin);

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
    // Appel API pour récupérer toutes les infos
    fetch("https://festival-jeu-mtp-api.onrender.com/news", {
      method: "GET", // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setNews(data))
      .then((data) => console.log(data))
      .then(() => setLoad(0))
      .catch((error) =>
        console.error("Erreur lors de la récupération des infos :", error)
      );
  }, []);

  const onDele = (id: string) => {
    setNews((news) => news.filter((item) => item.idNews !== id));
  };

  const handleUpdateNews = async (updatedNews: NewsType) => {
    try {
      // Appel API pour mettre à jour la news côté serveur
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/news/${updatedNews.idNews}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedNews),
        }
      );

      if (response.status === 200) {
        // Mise à jour locale de la liste de news
        setNews((currentNews) =>
          currentNews.map((item) =>
            item.idNews === updatedNews.idNews
              ? { ...item, ...updatedNews }
              : item
          )
        );
        console.log("News mise à jour avec succès !");
      } else {
        console.error(
          `Erreur lors de la mise à jour de la news. Statut ${response.status}`
        );
      }
    } catch (error: any) {
      console.error(
        "Erreur lors de la mise à jour de la news :",
        error.message
      );
    }
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [load, setLoad] = useState(-1);

  useEffect(() => {
    if (load !== -1) {
      setLoading(false);
    }
  }, [load]);

  return (
    <>
    <Navbar />
    <Container maxWidth="lg">
      
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <h1 className="flex justify-center p-4 font-bold text-2xl text-[#0A5483] font-serif">
            {" "}
            NEWS
          </h1>
          <Grid container spacing={4} justifyContent="center">
            {news.map((e) => (
              <Grid item xs={12} sm={6} md={4} key={e.idNews}>
                <Card elevation={4}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {e.titre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {e.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  
                </Card>
              </Grid>
            ))}
          </Grid>
          {(userConnected.role === "admin" || userConnected.role === "Résponsable soirée") && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button variant="contained" startIcon={<AddIcon />} component={Link} to="/respoSoiree/creerNews" color="primary">
                Create News
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
    </>
  );
}