import React, { useEffect, useState } from "react";
import { BlockQuestion } from "./BlockQuestion";
import TextField from "@mui/material/TextField";

export type Reponse = {
  idReponse: string;
  createur: string;
  reponse: string;
};

export type Question = {
  idQuestion: string;
  objet: string;
  createur: string;
  question: string;
  listeReponse: Reponse[];
};

export const PageForum = () => {
  const [liste, setListe] = useState<Question[]>([]);
  const [newq, setNewq] = useState("");
  const [newOb, setNewOb] = useState("");
  const [erreur, setErreur] = useState(false);

  useEffect(() => {
    // Appel API pour récupérer toutes les questions avec réponses
    fetch("http://localhost:8080/qr", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Ajoutez d'autres en-têtes nécessaires ici
      },
    })
      .then((response) => response.json())
      .then((data) => setListe(data))
      .then((data) => console.log(data))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des questions avec réponses :",
          error
        )
      );
  }, []);

  const handleSendQuestion = () => {
    const confirmDelete = window.confirm("Il manque l'objet ou la question !");
    if (confirmDelete) {
      console.log("Question deleted!");
    }
  };

  const handleq = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewq(event.target.value);
  };

  const handlob = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOb(event.target.value);
  };

  const handleCreerQuestion = async () => {
    if (newOb == "" || newq == "") {
      handleSendQuestion();
    } else {
      const newQuestion = {
        objet: newOb,
        createur: "robin",
        question: newq,
        listeReponse: [],
      };
      try {
        const response = await fetch("http://localhost:8080/qr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Ajoutez d'autres en-têtes nécessaires ici
          },
          body: JSON.stringify(newQuestion),
        });

        if (response.status === 201) {
          // La question a été créée avec succès
          console.log("Question créée avec succès !");
        } else {
          // Gérer d'autres statuts de réponse en conséquence
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

  return (
    <div>
      <h1 className="flex justify-center p-4 font-bold text-2xl"> FORUM</h1>
      <div className="pt-8 ml-16 mr-16  flex">
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
        <button
          className="ml-4 border-2 rounded p-2 border-[#3379FF] hover:text-white hover:bg-[#3379FF] text-[#3379FF]"
          onClick={handleCreerQuestion}
        >
          Envoyer
        </button>
      </div>

      {liste && liste.map((e, index) => (
        <BlockQuestion key={index} quest={e} />
      ))}
    </div>
  );
};
