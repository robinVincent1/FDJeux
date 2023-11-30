import React from "react";
import { CreerNews } from "./CreerNews";

export const CreerNewsPage = () => {
    return (
        <div>
            <div className="p-8">
            <h1 className="flex justify-center rounded-lg shadow-lg font-bold text-xl">
                Création d'une nouveauté :
            </h1>
            </div>
            <CreerNews />
        </div>
    )
}