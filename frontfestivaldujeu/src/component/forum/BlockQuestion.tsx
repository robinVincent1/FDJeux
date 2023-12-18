import React, { useState } from "react";
import { Question, Reponse } from "./PageForum";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

type Props = {
  quest: Question;
  deleteQuestion: () => void;
};

export const BlockQuestion = ({ quest, deleteQuestion }: Props) => {
  const [admin, setAdmin] = useState(true);
  const [newCom, setNewCom] = useState({
    createur: "robin",
    reponse: "",
    questionId: quest.idQuestion,
  });
  const [comments, setComments] = useState<Reponse[]>(quest.idReponse);
  const [isShow, setisShow] = useState(false);

  const handleNewCom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCom({ ...newCom, reponse: event.target.value });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setNewCom({
        createur: "robin",
        reponse: event.currentTarget.value,
        questionId: quest.idQuestion,
      });
      handleCreerReponse();
      event.currentTarget.value = "";
      setNewCom({
        createur: "robin",
        reponse: "",
        questionId: quest.idQuestion,
      });
    }
  };

  const handleSendRep = () => {
    const confirmDelete = window.confirm(
      "Il manque le contenu de la réponse !"
    );
    if (confirmDelete) {
      console.log("Réponse envoyée!");
    }
  };

  const handleCreerReponse = async () => {
    if (newCom.reponse === "") {
      handleSendRep();
    } else {
      try {
        const response = await fetch(
          `http://localhost:8080/qr/${quest.idQuestion}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCom),
          }
        );

        if (response.status === 201) {
          // La question a été créée avec succès
          const responseData = await response.json();
          console.log("Reponse créée avec succès !");

          // Ajouter la nouvelle question à la liste locale avec l'ID attribué par l'API
          setComments((prevListe) => [
            ...prevListe,
            { ...newCom, idReponse: responseData.idReponse },
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

  // Fonction pour supprimer une réponse
  const deleteReponse = async (reponseId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/qr/reponse/${reponseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Réponse supprimée avec succès");
        return response.json();
      } else {
        console.error(
          `Erreur lors de la suppression de la réponse. Statut ${response.status}`
        );
      }
    } catch (error: any) {
      console.error(
        "Erreur lors de la suppression de la réponse :",
        error.message
      );
    }
  };

  const handleDeleteResponse = (rep: Reponse) => {
    const confirmDelete = window.confirm(
      "Etes-vous sur de vouloir supprimer cette réponse ?"
    );
    if (confirmDelete) {
      deleteReponse(rep.idReponse).catch((error) => {
        console.error(
          "Erreur lors de la suppression de la réponse :",
          error.message
        );
      });
      setComments((comments) =>
        comments.filter((comment) => comment.idReponse !== rep.idReponse)
      );
    }
  };

  return (
    <div className=" p-2">
      <div className="border-black border rounded p-2 ml-8 mr-8">
        <p className="font-bold ml-4">{quest.objet}</p>
        <p className="ml-4">{quest.question}</p>
        <p className="italic ml-4">{quest.createur}</p>
        {admin ? (
          <div className="flex justify-end">
            <button onClick={() => deleteQuestion()}>
              <DeleteIcon />
            </button>
          </div>
        ) : null}
      </div>
      <div className="p-"></div>
      <div className="p-2 ml-16 border-b border-l border-r rounded mr-16 border-black">
        {isShow ? (
          <div>
            <button
              className="italic underline"
              onClick={() => {
                setisShow(false);
              }}
            >
              Cacher les réponses
            </button>
            {comments.map((rep, index) => (
              <div key={index} className="">
                <p>
                  {admin ? (
                    <button onClick={() => handleDeleteResponse(rep)}>
                      <DeleteIcon />
                    </button>
                  ) : null}
                  <strong>{rep.createur} :</strong> {rep.reponse}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div>
              <strong>{comments[0]?.createur} : </strong> {comments[0]?.reponse}
              <button
                className="flex italic underline"
                onClick={() => {
                  setisShow(true);
                }}
              >
                Autres réponses ...
              </button>
            </div>
          </div>
        )}

        <TextField
          style={{ width: "50%", margin: "auto" }}
          id="standard-basic"
          label="Réponds ici !"
          variant="standard"
          onChange={handleNewCom}
          onKeyPress={handleKeyPress}
          value={newCom.reponse}
        />
      </div>
    </div>
  );
};
