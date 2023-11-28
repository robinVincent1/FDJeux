import { Link } from "react-router-dom";
import "../output.css";
import Navbar from "../layout/Navbar";
import { News } from "./News";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

type NewsType = {
    titre: string;
    description: string;
    createur: string;
}

export const newsTest : NewsType = {
    titre: "Ceci est le titre",
    description: "Ceci est la descriptionkjbcdbic bdhbcdsjbccbsdkhbcsdkhjc",
    createur: "Robin Vincent",
}

export const PageAccueil = () => {

    const news = [newsTest, newsTest, newsTest]
    const [admin, setAdmin] = useState(true);

    return (
        <div>
        <div className="flex justify-center ml-8">
            <div className="flex justify-center mr-4 text-lg mr-8">
                <button className="p-2 ">
                    <NavigateBeforeIcon className="border rounded-2xl border-black hover:text-white hover:bg-black"/>
                </button>
            </div>
            
            {news.map((e, index) => {
                return (
                    <div className="p-8" key={index}>
                        <News titre={e.titre} description={e.description} createur={e.createur} />
                    </div>
                );
            })}
            
            <div className="flex justify-center p-4 mr-4 text-lg">
                <button className="mr-4">
                    <AddIcon className="border rounded-2xl border-black hover:text-white hover:bg-black"/>
                </button>
                <button className="p-2">
                    <NavigateNextIcon className="border rounded-2xl border-black hover:text-white hover:bg-black"/>
                </button>
            </div>
        </div>
        </div>
    );
};
