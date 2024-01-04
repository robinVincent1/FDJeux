import React, { useEffect, useState } from "react";
import { BlockQuestion } from "./BlockQuestion";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { robin } from "../profil/ProfilPage";
import { User } from "../admin/AdminPage";

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
  const [userConnected, setUserConnected] = useState<User>(robin)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:8080/user/${id}`);
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
  }, [userConnected]);

  useEffect(() => {
    // Appel API pour récupérer toutes les questions avec réponses
    fetch("http://localhost:8080/qr", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListe(data);
        console.log(data);
      })
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
        const response = await fetch("http://localhost:8080/qr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
      const response = await fetch(`http://localhost:8080/qr/${questionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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

  return (
    <div>
      <h1 className="flex justify-center p-4 font-bold text-2xl text-[#0A5483]"> FORUM</h1>
      <div className="pt-8 ml-16 mr-16 flex">
        <TextField
          onChange={handleq}
          fullWidth
          label="Posez votre question ici !"
          id="fullWidth"
          size="medium"
        />
      </div>
      <div className="pt-2 ml-16 pb-8 mr-16 flex justify-center">
        <TextField
          onChange={handlob}
          fullWidth
          label="Quel est l'objet de votre question ?"
          id="fullWidth"
          size="medium"
          style={{ width: "50%" }}
        />
        <div className="ml-4 flex items-center">
        <Button
          onClick={handleCreerQuestion}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "100%" }}
        >
          Envoyer
        </Button>
        </div>

      </div>

      {liste &&
        liste.map((e) => (
          <BlockQuestion
            quest={e}
            deleteQuestion={() => handleDeleteQuestion(e)}
            u={userConnected}
          />
        ))}
    </div>
  );
};
