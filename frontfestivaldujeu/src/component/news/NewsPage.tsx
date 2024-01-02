import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../output.css";
import Navbar from "../layout/Navbar";
import { News } from "../news/News";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export type NewsType = {
  idNews: string;
  titre: string;
  description: string;
  createur: string;
  favori: boolean;
};


export const NewsPage = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [admin, setAdmin] = useState(true);

  useEffect(() => {
    // Appel API pour récupérer toutes les infos
    fetch("http://localhost:8080/news")
      .then((response) => response.json())
      .then((data) => setNews(data))
      .then((data) => console.log(data))
      .catch((error) => console.error("Erreur lors de la récupération des infos :", error));
  }, []);

  const onDele = (id: string) => {
    setNews((news) => news.filter((item) => item.idNews !== id)
  );
  }

  const handleUpdateNews = async (updatedNews: NewsType) => {
    try {
      // Appel API pour mettre à jour la news côté serveur
      const response = await fetch(`http://localhost:8080/news/${updatedNews.idNews}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNews),
      });

      if (response.status === 200) {
        // Mise à jour locale de la liste de news
        setNews((currentNews) =>
          currentNews.map((item) =>
            item.idNews === updatedNews.idNews ? { ...item, ...updatedNews } : item
          )
        );
        console.log("News mise à jour avec succès !");
      } else {
        console.error(`Erreur lors de la mise à jour de la news. Statut ${response.status}`);
      }
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour de la news :", error.message);
    }
  };

  return (
    <div>
      <div className=" justify-center ml-8">
        {news.map((e) => {
          return (
            <div className="p-8">
              <News
                titre={e.titre}
                description={e.description}
                createur={e.createur}
                favori={e.favori}
                id={e.idNews}
                onDelete={() => onDele(e.idNews)}
                onUpdate={(updatedNews: NewsType) => handleUpdateNews(updatedNews)}
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
