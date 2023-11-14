import React, { useState } from "react"
import { ProfilUserModifiable } from "./ProfilUserModifiable";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    pseudo: string;
    role: string;

}

const robin : User = {
    id: "1idzhcdzvch",
    name: "Robin Vincent",
    email: "robin.vin100@gmail.com",
    password: "kcndnc",
    image: "jcdsc",
    pseudo: "robinvincent",
    role: "Admin"
}


export const AdminPage = () => {
    const [listeUser, setListeUser] = useState([robin]);
  
    return (
      <div>
        {listeUser.map((user) => (
          <ProfilUserModifiable key={user.id} u={user} />
        ))}
      </div>
    );
  };