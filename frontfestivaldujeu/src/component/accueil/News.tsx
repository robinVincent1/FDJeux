import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    titre: string,
    description: string,
    createur: string
}

export const News = ({ titre, description, createur }: Props) => {
    const [admin, setAdmin] = useState(true);

    return (
        <div className="border p-4 rounded border-black shadow-xl">
            <p className="font-bold ">{titre}</p>
            <p>{description}</p>
            <p className="italic">{createur}</p>

            {admin ? (
                <div className="">
                    <button>
                        <DeleteIcon />
                    </button>
                </div>
            ) : null}
        </div>
    );
};
