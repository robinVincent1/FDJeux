import React, { useEffect, useState } from "react";
import { User } from "../admin/AdminPage";
import { Button, Chip, TextField } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

export const robin: User = {
  idUser: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  pseudo: "",
  telephone: "",
  role: "",
  postalAdress: "",
  propo: "",
  association: "",
  nbEdition: 0,
  idFestival: "",
  photoProfil: "",
  flexible: false,
};

export const ProfilPage = () => {
  const [user, setUser] = useState<User>(robin);

  const [pseudo, setPseudo] = useState(user.pseudo);
  const [userPseudo, setUserPseudo] = useState(user.pseudo);
  const handlePseudoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPseudo(event.target.value);
  };

  const [email, setEmail] = useState(user.email);
  const [userEmail, setUserEmail] = useState(user.email);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const [AP, setAP] = useState(user.postalAdress);
  const [userAP, setUserAP] = useState(user.postalAdress);
  const handleAPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAP(event.target.value);
  };

  const [assoc, setAssoc] = useState(user.association);
  const [userAssoc, setUserAssoc] = useState(user.association);
  const handleAssocChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssoc(event.target.value);
  };

  const [tel, setTel] = useState(user.telephone);
  const [userTel, setUserTel] = useState(user.telephone);
  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTel(event.target.value);
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:8080/user/${id}`, {
          method: 'GET', // Remplacez 'GET' par la méthode que vous souhaitez utiliser
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const user = await response.json();

        setUser(user);
        setPseudo(user.pseudo);
        setUserPseudo(user.pseudo);
        setEmail(user.email);
        setUserEmail(user.email);
        setAP(user.postalAdress);
        setUserAP(user.postalAdress);
        setAssoc(user.association);
        setUserAssoc(user.association);
        setTel(user.telephone);
        setUserTel(user.telephone);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchData();
  }, []);

  const ModifProfil = async () => {
    const id = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:8080/user/ModifProfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          idUser: id,
          pseudo: userPseudo,
          email: userEmail,
          postalAdress: userAP,
          association: userAssoc,
          telephone: userTel,
        }),
      });

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la modification :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("Modification réussie :", data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la modification :", error.message);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center p-4">
        <img className="w-32 h-32" src="/profil-picture.jpg" />
      </div>
      <div className="flex justify-center">
        <div className=" justify-center p-4">
          <p className="p-4">Prénom Nom </p>
          <p className="border-2 rounded p-4">
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div className=" justify-center p-4">
          <p className="p-4">Role </p>
          <p className="border-2  rounded p-4">{user.role}</p>
        </div>
        <div className=" justify-center p-4">
          <p className="p-4">Edition </p>
          <p className="border-2  rounded p-4">{user.nbEdition}</p>
        </div>
      </div>

      <div className=" flex justify-center">
        <div className="  justify-center">
          <p className="p-4 mr-4 text-align">Pseudo </p>
          <div className="flex items-center">
            <TextField
              autoComplete="given-name"
              onChange={handlePseudoChange}
              name="Pseudo"
              id="Pseudo"
              label={userPseudo}
              autoFocus
              style={{ width: "100%", margin: "auto" }}
            />
            <div className="ml-2 ">
              <Chip
                label={<CheckCircleOutlineRoundedIcon />}
                onClick={() => setUserPseudo(pseudo)}
              />
            </div>
          </div>
        </div>
        <div className=" justify-center ml-4">
          <p className="p-4 mr-4 text-align">Adresse Email </p>
          <div className="flex items-center">
            <TextField
              autoComplete="given-name"
              onChange={handleEmailChange}
              name="Email"
              id="Email"
              label={userEmail}
              autoFocus
              style={{ width: "100%", margin: "auto" }}
            />
            <div className="ml-2 ">
              <Chip
                label={<CheckCircleOutlineRoundedIcon />}
                onClick={() => setUserEmail(email)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" pt-4 flex justify-center">
        <div className=" justify-center">
          <p className="p-4 mr-4 text-align">Adresse Postale </p>
          <div className="flex items-center">
            <TextField
              autoComplete="given-name"
              onChange={handleAPChange}
              name="AP"
              id="AP"
              label={userAP}
              autoFocus
              style={{ width: "100%", margin: "auto" }}
            />
            <div className="ml-2 ">
              <Chip
                label={<CheckCircleOutlineRoundedIcon />}
                onClick={() => setUserAP(AP)}
              />
            </div>
          </div>
        </div>
        <div className="  justify-center ml-4">
          <p className="p-4 mr-4 text-align">Association </p>
          <div className="flex items-center">
            <TextField
              autoComplete="given-name"
              onChange={handleAssocChange}
              name="Assoc"
              id="Assoc"
              label={userAssoc}
              autoFocus
              style={{ width: "100%", margin: "auto" }}
            />
            <div className="ml-2 ">
              <Chip
                label={<CheckCircleOutlineRoundedIcon />}
                onClick={() => setUserAssoc(assoc)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" pt-8 pb-16 flex justify-center ">
        <Button
          onClick={() => {
            ModifProfil();
          }}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "10%" }}
        >
          Confirmer
        </Button>
      </div>
    </div>
  );
};
