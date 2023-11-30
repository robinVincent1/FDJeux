import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

type Props = {
    titre: string,
    description: string,
    createur: string,
    favori: boolean,
}

export const News = ({ titre, description, createur, favori }: Props) => {
    const [admin, setAdmin] = useState(true);
    const [fav, setFav] = useState(favori);

    return (
        <div className=" p-4 rounded  shadow-2xl">
            <p className="font-bold ">{titre}</p>
            <p>{description}</p>
            <p className="italic">{createur}</p>
            <div className="">
            {admin ? (
                <div className="">
                    <button>
                        <DeleteIcon />
                    </button>
                    <button className={`text-${fav ? 'red' : 'black'}-500`}
                    onClick={() => {
                        setFav(!fav);
                    }}
                    >
                        <StarIcon />
                    </button>
                </div>
            ) : null}
            </div>
        </div>
    );
};
