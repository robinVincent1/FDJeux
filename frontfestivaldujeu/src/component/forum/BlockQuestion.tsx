import React, { useState } from "react";
import { Question, Reponse } from "./PageForum";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { Avatar, IconButton } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import { User } from "../admin/AdminPage";

type Props = {
  quest: Question;
  deleteQuestion: () => void;
  u: User;
};

export const BlockQuestion = ({ quest, deleteQuestion, u }: Props) => {
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
        createur: u.firstName + " " + u.lastName,
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
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      <div className=" p-2 ml-8 mr-8 hover:shadow-xl shadow rounded-lg border"             
          onClick={() => {
              setisShow(!isShow);
            }}>
        <p className="font-bold ml-4 text-[#0A5483]">{quest.objet}</p>
        <p className="ml-4">{quest.question}</p>
        <p className="italic ml-4">{quest.createur}</p>
        <div className="flex justify-between">
          {(u.role == "admin" ||
            quest.createur == u.firstName + " " + u.lastName) && (
            <div className="flex justify-end ">
              <IconButton aria-label="delete" onClick={() => deleteQuestion()}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      {isShow ? (
        <div className=" ml-16  mr-16  pt-4">
          {comments.map((rep, index) => (
            <div key={index} className="flex justify-between">
              <p className="flex ">
                <Avatar
                  sx={{ bgcolor: "#0E8DDF", width: "30px", height: "30px" }}
                >
                  <div className="uppercase text-sm">{rep.createur[0]}</div>
                </Avatar>
                <p className="pl-4">{rep.reponse}</p>
              </p>
              <p>
                {(u.role == "admin" ||
                  quest.createur == u.firstName + " " + u.lastName) && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteResponse(rep)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </p>
            </div>
          ))}

          <div className="ml-2">
            <TextField
              style={{ width: "90%", margin: "auto" }}
              id="standard-basic"
              label="Réponds ici !"
              variant="standard"
              onChange={handleNewCom}
              onKeyPress={handleKeyPress}
              value={newCom.reponse}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
