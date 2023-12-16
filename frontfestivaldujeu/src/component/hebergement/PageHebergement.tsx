import React from "react";
import { User } from "../admin/AdminPage";
import { HebergementDeroulement } from "./HebergementDeroulement";
import { Heber } from "./TypeHebergement";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const robin: User = {
  id: "1idzhcdzvch",
  name: "Robin Vincent",
  email: "robin.vin100@gmail.com",
  password: "kcndnc",
  image: "jcdsc",
  pseudo: "robinvincent",
  role: "Admin",
  adressePostale: "",
  association: "",
  telephone: "0682165431",
  nbEdition: 3,
};

const H: Heber = {
  createur: robin,
  titre: "Titre",
  description: "jbh dsjbc sdjcbsdh sdjkcbshdc jbcjsd jkdsbchsd",
  adresse: "adresse"
};

export const PageHebergement = () => {
  const listeHeber: Heber[] = [H, H, H, H, H, H];
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const handleEnvoyerClick = () => {
    // Logique pour gérer l'envoi ou la navigation vers "/propositionHebergement"
    navigate("/propositionHebergement");
  };

  return (
    <div>
      <div className="flex justify-center p-8">
        <Button
          onClick={handleEnvoyerClick}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "10%" }}
        >
          Ajouter une proposition
        </Button>
      </div>
      <div className="flex justify-center"></div>
      {listeHeber.map((e) => (
        <HebergementDeroulement heber={e} />
      ))}
    </div>
  );
};
