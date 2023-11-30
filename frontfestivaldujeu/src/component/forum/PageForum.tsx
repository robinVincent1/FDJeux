import React, { useState } from "react";
import { BlockQuestion } from "./BlockQuestion";
import TextField from "@mui/material/TextField";

export type Reponse = {
  createur: string;
  reponse: string;
};

export type Question = {
  objet: string;
  createur: string;
  question: string;
  listeReponse: Reponse[];
};

const repEx: Reponse = {
  createur: "Robin",
  reponse: "ceci est une reponse",
};

const quesEx: Question = {
  objet: "objet de la question",
  createur: "Vincent",
  question: "ceci est la question",
  listeReponse: [repEx, repEx, repEx],
};

export const PageForum = () => {
  const [liste, setListe] = useState<Question[]>([
    quesEx,
    quesEx,
    quesEx,
    quesEx,
  ]);
  const [newq, setNewq] = useState("");
  const [newOb, setNewOb] = useState("");
  const [erreur, setErreur] = useState(false);

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

  const handleEnvoyer = () => {
    if (newOb == "" || newq == "") {
      handleSendQuestion();
    } else {
      const newQuestion: Question = {
        objet: newOb,
        createur: "robin",
        question: newq,
        listeReponse: [],
      };

      setListe((prevListe) => [...prevListe, newQuestion]);
    }
  };

  return (
    <div>
      <div className="pt-8 ml-16 mr-16 flex justify-center">
        <TextField
          onChange={handlob}
          fullWidth
          label="Quel est l'objet de votre question ?"
          id="fullWidth"
          size="medium"
          style={{ width: "50%", margin: "auto" }}
        />
      </div>
      <div className="pt-2 ml-16 mr-16 flex">
        <TextField
          onChange={handleq}
          fullWidth
          label="Posez votre question ici !"
          id="fullWidth"
          size="medium"
        />
        <button
          className="ml-4 border-2 rounded p-2 border-[#3379FF] hover:text-white hover:bg-[#3379FF] text-[#3379FF]"
          onClick={handleEnvoyer}
        >
          Envoyer
        </button>
      </div>

      {liste.map((e, index) => (
        <BlockQuestion key={index} quest={e} />
      ))}
    </div>
  );
};
