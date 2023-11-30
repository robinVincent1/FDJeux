import React from "react";
import { CreerNews } from "./CreerNews";
import { Link } from "react-router-dom";

export const CreerNewsPage = () => {
    return (
        <div>
            <div className="p-8">
                <Link to="/news" className="border text-[#3379FF] rounded p-2 border-[#3379FF] hover:text-white hover:bg-[#3379FF]">
                    Retour
                </Link>
            <h1 className="flex justify-center font-bold text-xl">
                Création d'une News :
            </h1>
            </div>
            <CreerNews />
        </div>
    )
}