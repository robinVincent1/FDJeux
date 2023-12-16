import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreerHebergement = () => {
    const [titre, setTitre] = useState("");
    const [adresse, setAdresse] = useState("");
    const [description, setDescription] = useState("");

    const handleTitreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitre(event.target.value);
    };

    const handleAdresseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdresse(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleAjouterClick = () => {
        console.log("Titre:", titre);
        console.log("Adresse:", adresse);
        console.log("Description:", description);
        naviguate("/hebergement")

        // Vous pouvez ajouter ici la logique pour envoyer les données à la base de données ou effectuer d'autres actions nécessaires.
    };
    const naviguate = useNavigate();

    return (
        <div>
            <h1 className="flex p-8 justify-center font-bold text-xl">
                Nouvelle Proposotion :
            </h1>
            <div className="pb-4 flex justify-center">
                <TextField
                    onChange={handleTitreChange}
                    fullWidth
                    label="Ajoutez le titre de votre proposition ici !"
                    id="fullWidth"
                    size="medium"
                    sx={{ width: "70%" }}
                />
            </div>
            <div className="pb-4 flex justify-center">
                <TextField
                    onChange={handleAdresseChange}
                    fullWidth
                    label="Ajoutez l'adresse de votre hébergement ici !"
                    id="fullWidth"
                    size="medium"
                    sx={{ width: "70%" }}
                />
            </div>
            <div className="pb-4 flex justify-center">
                <TextField
                    onChange={handleDescriptionChange}
                    fullWidth
                    multiline
                    rows={4}
                    label="Ajoutez la description de votre proposition ici !"
                    id="fullWidth"
                    size="medium"
                    sx={{ width: "70%" }}
                />
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={handleAjouterClick}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ width: "10%" }}
                >
                    Envoyer
                </Button>
            </div>
        </div>
    );
};
