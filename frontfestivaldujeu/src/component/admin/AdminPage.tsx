import React, { useEffect, useState } from "react"
import { ProfilUserModifiable } from "./ProfilUserModifiable";
import { Festival, test } from "../festival/PageFestival";

export type User = {
    idUser: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    pseudo: string;
    role: string;
    postalAdress: string;
    association: string;
    propo: string;
    telephone: string;
    nbEdition: number;
    photoProfil: string;
    idFestival: string;
    flexible: boolean;
}






export const AdminPage = () => {
    const [listeAdmin, setListeAdmin] = useState<User[]>([]);
    const [listeReferent, setListeReferent] = useState<User[]>([]);
    const [listeRespoSoiree, setListeRespoSoiree] = useState<User[]>([]);
    const [listeAccueilBenevole, setListeAccueilBenevole] = useState<User[]>([]);
    const [listeBenevole, setListeBenevole] = useState<User[]>([]);
    const [festi, setFesti] = useState<Festival>(test);
    const [roleUpdated, setRoleUpdated] = useState<boolean>(false);

    useEffect(() => {
      // Appel API pour récupérer le festival
      fetch("http://localhost:8080/festival/enCours")
        .then((response) => response.json())
        .then((data) => setFesti(data))
        .catch((error) =>
          console.error("Erreur lors de la récupération du festival :", error)
        );
    }, []);


    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log(festi.idFestival)
          const response = await fetch(`http://localhost:8080/user/referent/${festi.idFestival}`);
          const data = await response.json();
          setListeReferent(data)
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error
          );
        }
      };
  
      fetchData();
    }, [festi, roleUpdated]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log(festi.idFestival)
          const response = await fetch(`http://localhost:8080/user/benevole/${festi.idFestival}`);
          const data = await response.json();
          setListeBenevole(data)
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error
          );
        }
      };
  
      fetchData();
    }, [festi, roleUpdated]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log(festi.idFestival)
          const response = await fetch(`http://localhost:8080/user/respoSoiree/${festi.idFestival}`);
          const data = await response.json();
          setListeRespoSoiree(data)
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error
          );
        }
      };
  
      fetchData();
    }, [festi, roleUpdated]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log(festi.idFestival)
          const response = await fetch(`http://localhost:8080/user/accueilBenevole/${festi.idFestival}`);
          const data = await response.json();
          setListeAccueilBenevole(data)
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error
          );
        }
      };
  
      fetchData();
    }, [festi, roleUpdated]);

    const handleRoleUpdate = () => {
      // Mettez à jour roleUpdated pour forcer le rechargement des données
      setRoleUpdated((prev) => !prev);
    };

    return (
      <div className=" grid grid-cols-5">
      <div className=" ">
        <strong className="flex justify-center  p-2 font-bold">Admin</strong>
        {listeAdmin.map((user) => (
          <ProfilUserModifiable key={user.idUser} u={user} idFestival={festi.idFestival} onRoleUpdate={handleRoleUpdate}/>
        ))}
      </div>
      <div className="">
        <strong className="flex justify-center  p-2 font-bold">Référent</strong>
        {listeReferent.map((user) => (
          <ProfilUserModifiable key={user.idUser} u={user} idFestival={festi.idFestival} onRoleUpdate={handleRoleUpdate}/>
        ))}
      </div>
      <div className="">
        <strong className="flex justify-center  p-2 font-bold">Résponsable soirée </strong>
        
        {listeRespoSoiree.map((user) => (
          <ProfilUserModifiable key={user.idUser} u={user} idFestival={festi.idFestival} onRoleUpdate={handleRoleUpdate}/>
        ))}
      </div>
      <div className="">
        <strong className="flex justify-center  p-2 font-bold">Bénévole Accueil</strong>
        {listeAccueilBenevole.map((user) => (
          <ProfilUserModifiable key={user.idUser} u={user} idFestival={festi.idFestival} onRoleUpdate={handleRoleUpdate}/>
        ))}
      </div>
      <div className="">
        <strong className="flex justify-center  p-2 font-bold">Bénévole</strong>
        {listeBenevole.map((user) => (
          <ProfilUserModifiable key={user.idUser} u={user} idFestival={festi.idFestival} onRoleUpdate={handleRoleUpdate}/>
        ))}
      </div>
      </div>
    );
  };