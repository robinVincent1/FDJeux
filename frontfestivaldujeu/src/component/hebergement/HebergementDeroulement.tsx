import { Button } from "@mui/material"
import React from "react"
import { Heber } from "./TypeHebergement"

type Props = {
    heber: Heber,
    deleteH: () => void,
}

export const HebergementDeroulement = ({heber, deleteH} : Props) => {

    const admin = true

    return (
        <div className="border rounded p-2 ml-2 mr-2 mt-2 break-words border-black">
            <h1 className="flex justify-center font-bold break-words p-2 text-[#0A5483]">
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
                {heber.createur}
            </div>
            <div className="italic">
                {heber.communication}
            </div>
            </div>

            <div className="flex justify-center">
            {admin ? (
                <Button
                    onClick={ deleteH}
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