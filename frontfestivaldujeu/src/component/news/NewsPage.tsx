import React from "react";
import { Link } from "react-router-dom";
import "../output.css";
import Navbar from "../layout/Navbar";
import { News } from "../news/News";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

type NewsType = {
  titre: string;
  description: string;
  createur: string;
  favori: boolean;
};

export const newsTest: NewsType = {
  titre: "Ceci est le titre",
  description: "Ceci est la descriptionkjbcdbic bdhbcdsjbccbsdkhbcsdkhjc",
  createur: "Robin Vincent",
  favori: true,
};

export const NewsPage = () => {
  const news = [newsTest, newsTest, newsTest];
  const [admin, setAdmin] = useState(true);

  return (
    <div>
      <div className=" justify-center ml-8">
        {news.map((e, index) => {
          return (
            <div className="p-8" key={index}>
              <News
                titre={e.titre}
                description={e.description}
                createur={e.createur}
                favori={e.favori}
              />
            </div>
          );
        })}

        <div className="flex justify-center p-4 mr-4 text-lg">
          {admin ? (
            <Link to="/creerNews" className="mr-4">
              <AddIcon className="border text-[#3379FF] rounded-2xl border-[#3379FF] hover:text-white hover:bg-[#3379FF]" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};
