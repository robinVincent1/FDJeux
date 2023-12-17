import React, { useState } from "react";
import { Question, Reponse } from "./PageForum";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

type Props = {
  quest: Question;
};

export const BlockQuestion = ({ quest }: Props) => {
  const [admin, setAdmin] = useState(true);
  const [newCom, setNewCom] = useState({ createur: "robin", reponse: "" });
  const [comments, setComments] = useState<Reponse[]>(quest.listeReponse);
  const [isShow, setisShow] = useState(false);

  const handleNewCom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCom({ ...newCom, reponse: event.target.value });
  };

  const handleDeleteQuestion = () => {
    const confirmDelete = window.confirm(
      "Etes-vous sur de vouloir supprimer cette question ?"
    );
    if (confirmDelete) {
      // Add your delete logic here
      console.log("Question deleted!");
    }
  };

  const handleDeleteResponse = () => {
    const confirmDelete = window.confirm(
      "Etes-vous sur de vouloir supprimer cette réponse ?"
    );
    if (confirmDelete) {
      console.log("Response deleted!");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Add the new comment to the comments list
      // Clear the input field
      setNewCom({ createur: "robin", reponse: "" });
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
            <button onClick={handleDeleteQuestion}>
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
                    <button onClick={handleDeleteResponse}>
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
