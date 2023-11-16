import React, { useState } from "react";
import { User } from "../admin/AdminPage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Avatar, TextField } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const robin: User = {
  id: "1idzhcdzvch",
  name: "Robin Vincent",
  email: "robin.vin100@gmail.com",
  password: "kcndnc",
  image: "jcdsc",
  pseudo: "robinvincent",
  telephone: "0682161682",
  role: "Admin",
  adressePostale: "167 avenue abbé Paul Parguel",
  association: "Aucune",
  nbEdition: 3,
};

export const ProfilPage = () => {
  const user = robin;

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

  const [AP, setAP] = useState(user.adressePostale);
  const [userAP, setUserAP] = useState(user.adressePostale);
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

  return (
    <div className="border">
      <div className="flex justify-center p-4">
        <img className="w-32 h-32" src="/profil-picture.jpg" />
      </div>
      <div className="flex justify-center">
        <div className=" justify-center p-4">
          <p className="p-4">Prénom Nom </p>
          <p className="border-2 border-black rounded p-4">{user.name}</p>
        </div>
        <div className=" justify-center p-4">
          <p className="p-4">Role  </p>
          <p className="border-2 border-black rounded p-4">{user.role}</p>
        </div>
        <div className=" justify-center p-4">
          <p className="p-4">Edition  </p>
          <p className="border-2 border-black rounded p-4">{user.nbEdition}</p>
        </div>
      </div>


      <div className=" flex justify-center">
        <div className="  justify-center">
          <p className="p-4 mr-4 text-align">Pseudo </p>
          <div className="flex">
          <TextField
            autoComplete="given-name"
            onChange={handlePseudoChange}
            name="Pseudo"
            id="Pseudo"
            label={userPseudo}
            autoFocus
            style={{ width: "100%", margin: "auto" }}
          />
          <button
            className="p-4 text-[#3379FF]"
            onClick={() => {
              return setUserPseudo(pseudo);
            }}
          >
            <CheckCircleOutlineRoundedIcon />
          </button>
        </div>
        </div>
      </div>


      <div className=" pt-4 flex justify-center">
        <div className=" justify-center">
          <p className="p-4 mr-4 text-align">Adresse Email </p>
          <div className="flex">
          <TextField
            autoComplete="given-name"
            onChange={handleEmailChange}
            name="Email"
            id="Email"
            label={userEmail}
            autoFocus
            style={{ width: "100%", margin: "auto" }}
          />
          <button
            className="p-4 text-[#3379FF]"
            onClick={() => {
              return setUserEmail(email);
            }}
          >
            <CheckCircleOutlineRoundedIcon />
          </button>
        </div>
        </div>
      </div>



      <div className=" pt-4 flex justify-center ">
        <div className="  justify-center">
          <p className="p-4 mr-4 text-align">Téléphone </p>
          <div className="flex">
          <TextField
            autoComplete="given-name"
            onChange={handleTelChange}
            name="Assoc"
            id="Assoc"
            label={userTel}
            autoFocus
            style={{ width: "100%", margin: "auto" }}
          />
          <button
            className="p-4 text-[#3379FF]"
            onClick={() => {
              return setUserTel(tel);
            }}
          >
            <CheckCircleOutlineRoundedIcon />
          </button>
        </div>
      </div>
      </div>



      <div className=" pt-4 flex justify-center">
        <div className=" justify-center">
          <p className="p-4 mr-4 text-align">Adresse Postale </p>
          <div className="flex">
          <TextField
            autoComplete="given-name"
            onChange={handleAPChange}
            name="AP"
            id="AP"
            label={userAP}
            autoFocus
            style={{ width: "100%", margin: "auto" }}
          />
          <button
            className="p-4 text-[#3379FF]"
            onClick={() => {
              return setUserAP(AP);
            }}
          >
            <CheckCircleOutlineRoundedIcon />
          </button>
        </div>
        </div>
      </div>


      <div className=" pt-4 flex justify-center pb-16">
        <div className="  justify-center">
          <p className="p-4 mr-4 text-align">Association </p>
          <div className="flex">
          <TextField
            autoComplete="given-name"
            onChange={handleAssocChange}
            name="Assoc"
            id="Assoc"
            label={userAssoc}
            autoFocus
            style={{ width: "100%", margin: "auto" }}
          />
          <button
            className="p-4 text-[#3379FF]"
            onClick={() => {
              return setUserAssoc(assoc);
            }}
          >
            <CheckCircleOutlineRoundedIcon />
          </button>
        </div>
        </div>
      </div>

      
    </div>
  );
};
