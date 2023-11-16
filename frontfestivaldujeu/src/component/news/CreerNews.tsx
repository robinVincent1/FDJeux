import { TextField } from "@mui/material";
import React from "react";

export const CreerNews = () => {
    return (
   <div>
    <div className="flex justify-center p-4 pt-16">
    <TextField
          id="filled-multiline-flexible"
          label="Titre"
          multiline
          maxRows={4}
          variant="filled"
        />
    </div>
         <div className=" flex justify-center">
            <TextField
          id="filled-multiline-static"
          label="Déscription"
          multiline
          rows={4}
          defaultValue=""
          variant="filled"
        />
        </div>
   </div>
    )
}