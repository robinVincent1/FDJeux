import { Button } from "@mui/material"
import React from "react"
import { Heber } from "./TypeHebergement"

export const HebergementDeroulement = ({heber}: {heber: Heber}) => {

    const admin = true

    const handleDeleteHeber = () => {
        
    }

    return (
        <div className="border rounded p-2 ml-2 mr-2 mt-2 break-words border-black">
            <h1 className="flex justify-center font-bold break-words p-2">
                {heber.titre}
            </h1>
            <div className=" break-words ">
                {heber.description}
            </div>
            <div className=" break-words ">
                {heber.adresse}
            </div>
            <div className="p-2">
            <div className="italic">
                {heber.createur.name}
            </div>
            <div className="italic">
                {heber.createur.email}
            </div>
            <div className="italic">
                {heber.createur.telephone}
            </div>
            </div>

            <div className="flex justify-center">
            {admin ? (
                <Button
                    onClick={ handleDeleteHeber}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ width: "10%" }}
                >
                    Supprimer
                </Button>
            ) : null}
            </div>

        </div>
    )
}