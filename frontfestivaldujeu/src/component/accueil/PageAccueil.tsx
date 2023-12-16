import React from "react";
import { Link } from "react-router-dom";
import "../output.css";
import { Infos } from "../infosPratiques/PageInfos";
import { InfosDeroulement } from "../infosPratiques/InfosDeroulement";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const infos: Infos = {
  titre: "Titre",
  description:
    "Description : jbcijsbdcbhidbckhsbc sbjcjks bkbcksbb cbdchb hbhcbsd kbcksd bckh sbch scb hdcjhs chjsdc hdsbcid shcbsdh kcbdsibd bci bcib sdic bsdcbd scbisd cisd cjb cf izbch cbbi hbcehb chbcisd c bs idhcb hsdcb hsdcvjh sdvcsch jsvcj hdsksdb",
};

export const PageAccueil = () => {
  const listeInfos: Infos[] = [infos, infos, infos];
  const admin = true;
  return (
    <div className=" flex justify-center break-words">
      {listeInfos.map((e) => (
        <InfosDeroulement inf={e} />
      ))}
      {admin ? (
        <Link to="/creerinfos" className="text-[#3379FF] p-4 flex justify-center items-center">
          <AddCircleRoundedIcon />
        </Link>
      ) : null}
    </div>
  );
};
