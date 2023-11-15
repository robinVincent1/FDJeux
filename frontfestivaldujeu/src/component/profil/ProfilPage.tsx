import React, { useState } from "react";
import { User } from "../admin/AdminPage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const robin: User = {
  id: "1idzhcdzvch",
  name: "Robin Vincent",
  email: "robin.vin100@gmail.com",
  password: "kcndnc",
  image: "jcdsc",
  pseudo: "robinvincent",
  role: "Admin",
  adressePostale: "167 avenue abbé PAul Parguel",
  association: "Aucune",
};

export const ProfilPage = () => {
  const user = robin;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const [modifPseudo, setModifPseudo] = useState(false);
  const [modifName, setModifName] = useState(false);
  const [modifEmail, setModifEmail] = useState(false);
  const [modifAP, setModifAP] = useState(false);
  const [modifAssoc, setModifAssoc] = useState(false);


  return (
    <div>
           <div className="border p-4">
        {modifPseudo ? (
                           <div className=" flex justify-center">
                            <div className=" flex justify-center">
                           <TextField
                             autoComplete="given-name"
                             name="Pseudo"
                             id="Pseudo"
                             label="Pseudo"
                             autoFocus
                             style={{ width: '100%', margin: 'auto' }}
                           />
                           <button className="p-4 text-[#3379FF]" onClick={() => {
                                return setModifPseudo(false)
                           }}>
                            <CheckCircleOutlineRoundedIcon />
                           </button>
                           </div>
                         </div>
        ): (
            <div className="flex justify-center ">
                <div className="border flex border-2 border-[#3379FF] rounded p-2">
                <p className="p-2 ">Pseudo : </p>
                <strong className="p-2 pr-8">{user.pseudo}</strong>
                <button className="text-[#3379FF]" onClick={() => {
                    return setModifPseudo(true)
                }}>
                    <ModeEditIcon />
                </button>
                </div>
            </div>
        )}
    </div>


    <div className="border p-4">
        {modifName ? (
                           <div className=" flex justify-center">
                            <div className=" flex justify-center">
                           <TextField
                             autoComplete="given-name"
                             name="Name"
                             id="Name"
                             label="Prénom Nom"
                             autoFocus
                             style={{ width: '100%', margin: 'auto' }}
                           />
                           <button className="p-4 text-[#3379FF]" onClick={() => {
                                return setModifName(false)
                           }}>
                            <CheckCircleOutlineRoundedIcon />
                           </button>
                           </div>
                         </div>
        ): (
            <div className="flex justify-center ">
                <div className="border flex border-2 border-[#3379FF] rounded p-2">
                <p className="p-2 ">Prénom Nom : </p>
                <strong className="p-2 pr-8">{user.name}</strong>
                <button className="text-[#3379FF]" onClick={() => {
                    return setModifName(true)
                }}>
                    <ModeEditIcon />
                </button>
                </div>
            </div>
        )}
    </div>


    <div className="border p-4">
        {modifEmail ? (
                           <div className=" flex justify-center">
                            <div className=" flex justify-center">
                           <TextField
                             autoComplete="given-name"
                             name="Pseudo"
                             id="Pseudo"
                             label="Pseudo"
                             autoFocus
                             style={{ width: '100%', margin: 'auto' }}
                           />
                           <button className="p-4 text-[#3379FF]" onClick={() => {
                                return setModifPseudo(false)
                           }}>
                            <CheckCircleOutlineRoundedIcon />
                           </button>
                           </div>
                         </div>
        ): (
            <div className="flex justify-center ">
                <div className="border flex border-2 border-[#3379FF] rounded p-2">
                <p className="p-2 ">Pseudo : </p>
                <strong className="p-2 pr-8">{user.pseudo}</strong>
                <button className="text-[#3379FF]" onClick={() => {
                    return setModifPseudo(true)
                }}>
                    <ModeEditIcon />
                </button>
                </div>
            </div>
        )}
    </div>


    <div className="border p-4">
        {modifPseudo ? (
                           <div className=" flex justify-center">
                            <div className=" flex justify-center">
                           <TextField
                             autoComplete="given-name"
                             name="Pseudo"
                             id="Pseudo"
                             label="Pseudo"
                             autoFocus
                             style={{ width: '100%', margin: 'auto' }}
                           />
                           <button className="p-4 text-[#3379FF]" onClick={() => {
                                return setModifPseudo(false)
                           }}>
                            <CheckCircleOutlineRoundedIcon />
                           </button>
                           </div>
                         </div>
        ): (
            <div className="flex justify-center ">
                <div className="border flex border-2 border-[#3379FF] rounded p-2">
                <p className="p-2 ">Pseudo : </p>
                <strong className="p-2 pr-8">{user.pseudo}</strong>
                <button className="text-[#3379FF]" onClick={() => {
                    return setModifPseudo(true)
                }}>
                    <ModeEditIcon />
                </button>
                </div>
            </div>
        )}
    </div>


    <div className="border p-4">
        {modifPseudo ? (
                           <div className=" flex justify-center">
                            <div className=" flex justify-center">
                           <TextField
                             autoComplete="given-name"
                             name="Pseudo"
                             id="Pseudo"
                             label="Pseudo"
                             autoFocus
                             style={{ width: '100%', margin: 'auto' }}
                           />
                           <button className="p-4 text-[#3379FF]" onClick={() => {
                                return setModifPseudo(false)
                           }}>
                            <CheckCircleOutlineRoundedIcon />
                           </button>
                           </div>
                         </div>
        ): (
            <div className="flex justify-center ">
                <div className="border flex border-2 border-[#3379FF] rounded p-2">
                <p className="p-2 ">Pseudo : </p>
                <strong className="p-2 pr-8">{user.pseudo}</strong>
                <button className="text-[#3379FF]" onClick={() => {
                    return setModifPseudo(true)
                }}>
                    <ModeEditIcon />
                </button>
                </div>
            </div>
        )}
    </div>



    <div className="border p-4">
        {modifPseudo ? (
                           <div className=" flex justify-center">
                            <div className=" flex justify-center">
                           <TextField
                             autoComplete="given-name"
                             name="Pseudo"
                             id="Pseudo"
                             label="Pseudo"
                             autoFocus
                             style={{ width: '100%', margin: 'auto' }}
                           />
                           <button className="p-4 text-[#3379FF]" onClick={() => {
                                return setModifPseudo(false)
                           }}>
                            <CheckCircleOutlineRoundedIcon />
                           </button>
                           </div>
                         </div>
        ): (
            <div className="flex justify-center ">
                <div className="border flex border-2 border-[#3379FF] rounded p-2">
                <p className="p-2 ">Pseudo : </p>
                <strong className="p-2 pr-8">{user.pseudo}</strong>
                <button className="text-[#3379FF]" onClick={() => {
                    return setModifPseudo(true)
                }}>
                    <ModeEditIcon />
                </button>
                </div>
            </div>
        )}
    </div>
    </div>
  );
};
