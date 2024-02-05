import React, { useEffect, useState } from "react";
import { BlockQuestion } from "./BlockQuestion";
import { Container, Grid, TextField, Button, Typography, Card, CardContent, Box } from "@mui/material";
import { robin } from "../profil/ProfilPage";
import { User } from "../admin/AdminPage";
import Navbar from "../layout/Navbar";
import Loader from "../layout/Loader";

export type Reponse = {
  idReponse: string;
  createur: string;
  reponse: string;
  questionId: string;
};

export type Question = {
  idQuestion: string;
  objet: string;
  createur: string;
  question: string;
  idReponse: Reponse[];
};

export const PageForum = () => {
  const [liste, setListe] = useState<Question[]>([]);
  const [newq, setNewq] = useState("");
  const [newOb, setNewOb] = useState("");
  const [erreur, setErreur] = useState(false);
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
    // Appel API pour récupérer toutes les questions avec réponses
    fetch("https://festival-jeu-mtp-api.onrender.com/qr", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListe(data);
        console.log(data);
      })
      .then(() => setLoad(0))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des questions avec réponses :",
          error
        )
      );
  }, []);

  const handleSendQuestion = () => {
    const confirm = window.confirm("Il manque l'objet ou la question !");
    if (confirm) {
      console.log("Question envoyé!");
    }
  };

  const handleq = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewq(event.target.value);
  };

  const handlob = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOb(event.target.value);
  };

  const handleCreerQuestion = async () => {
    if (newOb === "" || newq === "") {
      handleSendQuestion();
    } else {
      const newQuestion = {
        objet: newOb,
        createur: userConnected.firstName + " " + userConnected.lastName,
        question: newq,
        idReponse: [],
      };
      try {
        const response = await fetch("https://festival-jeu-mtp-api.onrender.com/qr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newQuestion),
        });

        if (response.status === 201) {
          // La question a été créée avec succès
          const responseData = await response.json();
          console.log("Question créée avec succès !");

          // Ajouter la nouvelle question à la liste locale avec l'ID attribué par l'API
          setListe((prevListe) => [
            ...prevListe,
            { ...newQuestion, idQuestion: responseData.idQuestion },
          ]);

          // Réinitialiser les champs de saisie
          setNewq("");
          setNewOb("");
        } else {
          console.error(
            `Erreur lors de la création de la question. Statut ${response.status}`
          );
        }
      } catch (error: any) {
        console.error(
          "Erreur lors de la création de la question :",
          error.message
        );
      }
    }
  };


  // Fonction pour supprimer une question
  const deleteQuestion = async (questionId: string) => {
    try {
      const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/qr/${questionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        console.log("Question supprimée avec succès");
        return response.json();
      } else {
        console.error(
          `Erreur lors de la suppression de la question. Statut ${response.status}`
        );
      }
    } catch (error: any) {
      console.error(
        "Erreur lors de la suppression de la question :",
        error.message
      );
    }
  };

  const handleDeleteQuestion = (ques: Question) => {
    const confirmDelete = window.confirm(
      "Etes-vous sur de vouloir supprimer cette question ?"
    );
    if (confirmDelete) {
      deleteQuestion(ques.idQuestion).catch((error) => {
        console.error(
          "Erreur lors de la suppression de la question :",
          error.message
        );
      });
      setListe((questions) =>
        questions.filter((question) => question.idQuestion !== ques.idQuestion)
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
        <h1 className="flex justify-center p-4 font-bold text-2xl text-[#0A5483] font-serif">
          {" "}
          FORUM
        </h1>
        <Box mt={4} mb={2} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Quel est l'objet de votre question ?"
            variant="outlined"
            fullWidth
            onChange={handlob}
            value={newOb}
          />
          <TextField
            label="Posez votre question ici !"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            onChange={handleq}
            value={newq}
          />
          <Box display="flex" justifyContent="center">
            <Button onClick={handleCreerQuestion} variant="contained" sx={{ mt: 2 }}>
              Envoyer
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Loader />
          </Box>
        ) : (
          <>

            <Grid container spacing={4}>
              {liste.map((e) => (
                <Grid item xs={12} key={e.idQuestion}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <BlockQuestion
                        quest={e}
                        deleteQuestion={() => handleDeleteQuestion(e)}
                        u={userConnected}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

          </>
        )}
      </Container>
    </>
  );
}