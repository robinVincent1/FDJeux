import { useEffect, useState } from "react";
import { HebergementDeroulement } from "./HebergementDeroulement";
import { Heber } from "./TypeHebergement";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Navbar from "../layout/Navbar";
import Loader from "../layout/Loader";

export const PageHebergement = () => {
  const [listeHeber, setListeHeber] = useState<Heber[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://festival-jeu-mtp-api.onrender.com/hebergement", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListeHeber(data);
        console.log(data);
      })
      .then(() => setLoad(0))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des hebergements :",
          error
        )
      );
  }, []);

  const handleEnvoyerClick = () => {
    navigate("/propositionHebergement");
  };

  // Fonction pour supprimer un hebergement
  const deleteHebergement = async (HebergementId: string) => {
    try {
      const response = await fetch(
        `https://festival-jeu-mtp-api.onrender.com/hebergement/${HebergementId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Hebergement supprimée avec succès");
        return response.json();
      } else {
        console.error(
          `Erreur lors de la suppression de l'hebergement. Statut ${response.status}`
        );
      }
    } catch (error: any) {
      console.error(
        "Erreur lors de la suppression de l hebergement :",
        error.message
      );
    }
  };

  const handleDeleteHebergement = (id: string) => {
    const confirmDelete = window.confirm(
      "Etes-vous sur de vouloir supprimer cette proposition ?"
    );
    if (confirmDelete) {
      deleteHebergement(id).catch((error) => {
        console.error(
          "Erreur lors de la suppression de l hebergement :",
          error.message
        );
      });
      setListeHeber((hebergements) =>
        hebergements.filter((heber) => heber.idHebergement !== id)
      );
    }
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [load, setLoad] = useState(-1);

  useEffect(() => {
    if (load !== -1) {
      setLoading(false);
    }
  }, [load]);

  return (
    <div className="bg-gray-50 min-h-screen">
  {loading ? (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    </div>
  ) : (
    <div>
      <Navbar />
      <div className="text-center py-8  shadow-md">
      <h1 className="flex justify-center p-4 font-bold text-2xl text-[#0A5483] font-serif">
          {" "}
          Hébergement
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Trouvez et proposez des hébergements pour le festival.
        </p>
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleEnvoyerClick}
          variant="contained"
          sx={{
            bgcolor: '#0A5483',
            '&:hover': { bgcolor: '#0073e6' },
            color: 'white',
            width: '250px',
          }}
        >
          Ajouter une proposition
        </Button>
      </div>
      <div className="mt-6 px-4 sm:px-6 lg:px-8">
        {listeHeber.length > 0 ? (
          listeHeber.map((e) => (
            <HebergementDeroulement
              key={e.idHebergement}
              heber={e}
              deleteH={() => handleDeleteHebergement(e.idHebergement)}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 mt-4">
            Aucune proposition d'hébergement disponible pour le moment.
          </p>
        )}
      </div>
    </div>
  )}
</div>
  );
};
