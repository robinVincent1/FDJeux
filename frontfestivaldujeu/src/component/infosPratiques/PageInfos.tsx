import React from "react";
import { InfosDeroulement } from "./InfosDeroulement";

export type Infos = {
    titre: string;
    description: string;
}

const ex : Infos = {
    titre: "ceci est le titre",
    description: "hdbidsbcisbcisdbshcb"
}

export const PageInfos = () => {

    const listeInfos : Infos[] = [ex,ex,ex,ex]

    return (
        <div className="flex">
            {listeInfos.map((e) => (
                <InfosDeroulement inf={e}/>
            ))}

        </div>
    )
}