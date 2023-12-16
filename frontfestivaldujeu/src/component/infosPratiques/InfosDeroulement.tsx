import React from "react";
import { Infos } from "./PageInfos";
import { Button } from "@mui/material";

export const InfosDeroulement = ({ inf }: { inf: Infos }) => {
    const admin = true;
    const handleDeleteInfos = () => {
        const confirmDelete = window.confirm(
          "Etes-vous sur de vouloir supprimer cette information ?"
        );
        if (confirmDelete) {
          // Add your delete logic here
          console.log("Question deleted!");
        }
      };

    return (
        <div className="border rounded p-2 ml-2 mr-2 mt-2 break-words border-black">
            <h1 className="flex justify-center font-bold break-words p-2">
                {inf.titre}
            </h1>
            <div className="flex justify-center break-words ">
                {inf.description}
            </div>
            <div className="flex justify-center">
            {admin ? (
                <Button
                    onClick={handleDeleteInfos}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ width: "30%" }}
                >
                    Supprimer
                </Button>
            ) : null}
            </div>
        </div>
    );
};
