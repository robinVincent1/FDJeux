import React from "react";

export type Reponse = {
    createur: string;
    reponse: string;
}

export type Question = {
    objet: string;
    createur: string;
    question: string;
    listeReponse: Reponse[]
}

const repEx : Reponse = {
    createur: "Robin",
    reponse: "ceci est une reponse"
}

const quesEx : Question = {
    objet: "objet de la question",
    createur: "Vincent",
    question: "ceci est la question",
    listeReponse: [repEx, repEx, repEx]
}


export const Forum = () => {
    return (
        <div>

        </div>
    )
}