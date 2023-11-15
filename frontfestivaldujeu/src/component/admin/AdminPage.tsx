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

const lucas : User = {
    id: "1idzhcdzvch",
    name: "Lucas",
    email: "robin.vin100@gmail.com",
    password: "kcndnc",
    image: "jcdsc",
    pseudo: "robinvincent",
    role: "Référent"
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

const lilian : User = {
  id: "1idzhcdzvch",
  name: "Lilian",
  email: "robin.vin100@gmail.com",
  password: "kcndnc",
  image: "jcdsc",
  pseudo: "robinvincent",
  role: "Réspo soirée"
}

const samy : User = {
  id: "1idzhcdzvch",
  name: "Samy",
  email: "robin.vin100@gmail.com",
  password: "kcndnc",
  image: "jcdsc",
  pseudo: "robinvincent",
  role: "Bénévole Accueil"
}

const romain : User = {
  id: "1idzhcdzvch",
  name: "Romain",
  email: "robin.vin100@gmail.com",
  password: "kcndnc",
  image: "jcdsc",
  pseudo: "robinvincent",
  role: "Bénévole"
}


export const AdminPage = () => {
    const [listeAdmin, setListeAdmin] = useState([robin, robin, robin, robin, robin, robin, robin, robin, robin, robin, robin, robin, robin, robin]);
    const [listeReferent, setListeReferent] = useState([lucas, lucas,lucas,lucas,lucas,lucas,lucas,lucas,lucas,lucas,lucas,lucas,lucas,lucas,lucas,lucas,]);
    const [listeRespoSoiree, setListeRespoSoiree] = useState([lilian,lilian,lilian,lilian,lilian,lilian,lilian,lilian,lilian,lilian,lilian,lilian,lilian,lilian,]);
    const [listeAccueilBenevole, setListeAccueilBenevole] = useState([samy,samy,samy,samy,samy,samy,samy,samy,samy,samy,samy,samy,samy,samy,samy,samy,samy,samy,samy,]);
    const [listeBenevole, setListeBenevole] = useState([romain,romain,romain,romain,romain,romain,romain,romain,romain,romain,romain,romain,romain,romain,romain,romain,]);
    return (
      <div className=" grid grid-cols-5">
      <div className=" ">
        <strong className="flex justify-center  p-2 text-[red]">Admin</strong>
        {listeAdmin.map((user) => (
          <ProfilUserModifiable key={user.id} u={user} />
        ))}
      </div>
      <div className="">
        <strong className="flex justify-center  p-2 text-[red]">Référent</strong>
        {listeReferent.map((user) => (
          <ProfilUserModifiable key={user.id} u={user} />
        ))}
      </div>
      <div className="">
        <strong className="flex justify-center  p-2 text-[red]">Résponsable soirée </strong>
        
        {listeRespoSoiree.map((user) => (
          <ProfilUserModifiable key={user.id} u={user} />
        ))}
      </div>
      <div className="">
        <strong className="flex justify-center  p-2 text-[red]">Bénévole Accueil</strong>
        {listeAccueilBenevole.map((user) => (
          <ProfilUserModifiable key={user.id} u={user} />
        ))}
      </div>
      <div className="">
        <strong className="flex justify-center  p-2 text-[red]">Bénévole</strong>
        {listeBenevole.map((user) => (
          <ProfilUserModifiable key={user.id} u={user} />
        ))}
      </div>
      </div>
    );
  };