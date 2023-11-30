import React, { useState } from "react";
import { Question } from "./PageForum";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  quest: Question;
};

export const BlockQuestion = ({ quest }: Props) => {
  const [admin, setAdmin] = useState(true);

  const handleDeleteQuestion = () => {
    const confirmDelete = window.confirm("Etes-vous sur de vouloir supprimer cette question ?");
    if (confirmDelete) {
      // Add your delete logic here
      console.log("Question deleted!");
    }
  };

  const handleDeleteResponse = () => {
    const confirmDelete = window.confirm("Etes-vous sur de vouloir supprimer cette response ?");
    if (confirmDelete) {
      console.log("Response deleted!");
    }
  };

  return (
    <div className="p-2">
      <div className="border-black border rounded p-2 ml-8 mr-8">
        <p className="font-bold ml-8">{quest.objet}</p>
        <p className="ml-8">{quest.question}</p>
        <p className="italic ml-8">{quest.createur}</p>
        {admin ? (
          <div className="flex justify-end">
            <button onClick={handleDeleteQuestion}>
              <DeleteIcon />
            </button>
          </div>
        ) : null}
      </div>
      <div className="p-2 ml-8">
        {quest.listeReponse.map((rep) => (
          <div className="">
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
    </div>
  );
};
