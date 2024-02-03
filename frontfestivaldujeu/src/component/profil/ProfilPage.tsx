import React, { useEffect, useState } from "react";
import { User } from "../admin/AdminPage";
import { Button, Chip, TextField } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Navbar from "../layout/Navbar";
import Loader from "../layout/Loader";

export const robin: User = {
  idUser: "",
  firstName: "robin",
  lastName: "vincent",
  email: "",
  password: "",
  pseudo: "",
  telephone: "0782161641",
  role: "",
  postalAdress: "",
  propo: "",
  association: "",
  nbEdition: 0,
  idFestival: "",
  photoProfil: "",
  flexible: false,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const ProfilPage = () => {
  const [user, setUser] = useState<User>(robin);

  const [pseudo, setPseudo] = useState(user.pseudo);
  const [userPseudo, setUserPseudo] = useState(user.pseudo);
  const handlePseudoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPseudo(event.target.value);
  };

  const [email, setEmail] = useState(user.email);
  const [userEmail, setUserEmail] = useState(user.email);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const [AP, setAP] = useState(user.postalAdress);
  const [userAP, setUserAP] = useState(user.postalAdress);
  const handleAPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAP(event.target.value);
  };

  const [assoc, setAssoc] = useState(user.association);
  const [userAssoc, setUserAssoc] = useState(user.association);
  const handleAssocChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssoc(event.target.value);
  };

  const [tel, setTel] = useState(user.telephone);
  const [userTel, setUserTel] = useState(user.telephone);
  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTel(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:8080/user/${id}`, {
          method: "GET", // Remplacez 'GET' par la méthode que vous souhaitez utiliser
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const user = await response.json();

        setUser(user);
        setPseudo(user.pseudo);
        setUserPseudo(user.pseudo);
        setEmail(user.email);
        setUserEmail(user.email);
        setAP(user.postalAdress);
        setUserAP(user.postalAdress);
        setAssoc(user.association);
        setUserAssoc(user.association);
        setTel(user.telephone);
        setUserTel(user.telephone);
        setLoad(0);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchData();
  }, []);

  const ModifProfil = async () => {
    const id = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:8080/user/ModifProfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          idUser: id,
          pseudo: userPseudo,
          email: userEmail,
          postalAdress: userAP,
          association: userAssoc,
          telephone: userTel,
        }),
      });

      if (!response.ok) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la modification :", response.statusText);
      } else {
        // Si tout s'est bien passé
        const data = await response.json();
        console.log("Modification réussie :", data);
      }
    } catch (error: any) {
      console.error("Erreur lors de la modification :", error.message);
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
    <div>
      {loading ? (
        <div>
          <div>
            <Navbar />
          </div>
          <div>
            <Loader />
          </div>
        </div>
      ) : (
        <div className="">
          <Navbar />
          <h1 className="flex justify-center pt-16 font-bold text-2xl text-[#0A5483] font-serif">
            {" "}
            PROFIL
          </h1>
          <div className="flex justify-center p-4 pt-16">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar sx={{ bgcolor: "", width: "70px", height: "70px" }}>
                {user.firstName[0]}
                {user.lastName[0]}
              </Avatar>
            </StyledBadge>
          </div>

          <div className="flex justify-center">
            <div className=" justify-center p-4">
              <p className="font-bold font-serif p-4">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className=" justify-center p-4">
              <p className="font-bold font-serif p-4">{user.role}</p>
            </div>
            <div className=" justify-center p-4">
              <p className="font-bold font-serif p-4">
                {user.nbEdition} participations
              </p>
            </div>
          </div>

          <div className=" flex justify-center">
            <div className="  justify-center">
              <p className="p-4 mr-4 text-align font-mono">Pseudo </p>
              <div className="flex items-center">
                <TextField
                  autoComplete="given-name"
                  onChange={handlePseudoChange}
                  name="Pseudo"
                  id="Pseudo"
                  label={userPseudo}
                  autoFocus
                  style={{ width: "100%", margin: "auto" }}
                />
                <div className="ml-2 ">
                  <Chip
                    label={<CheckCircleOutlineRoundedIcon />}
                    onClick={() => setUserPseudo(pseudo)}
                  />
                </div>
              </div>
            </div>
            <div className=" justify-center ml-4">
              <p className="p-4 mr-4 text-align font-mono">Adresse Email </p>
              <div className="flex items-center">
                <TextField
                  autoComplete="given-name"
                  onChange={handleEmailChange}
                  name="Email"
                  id="Email"
                  label={userEmail}
                  autoFocus
                  style={{ width: "100%", margin: "auto" }}
                />
                <div className="ml-2">
                  <Chip
                    label={<CheckCircleOutlineRoundedIcon />}
                    onClick={() => setUserEmail(email)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" pt-4 flex justify-center">
            <div className=" justify-center">
              <p className="p-4 mr-4 text-align font-mono">Adresse Postale </p>
              <div className="flex items-center">
                <TextField
                  autoComplete="given-name"
                  onChange={handleAPChange}
                  name="AP"
                  id="AP"
                  label={userAP}
                  autoFocus
                  style={{ width: "100%", margin: "auto" }}
                />
                <div className="ml-2 ">
                  <Chip
                    label={<CheckCircleOutlineRoundedIcon />}
                    onClick={() => setUserAP(AP)}
                  />
                </div>
              </div>
            </div>
            <div className="  justify-center ml-4">
              <p className="p-4 mr-4 text-align font-mono">Association </p>
              <div className="flex items-center">
                <TextField
                  autoComplete="given-name"
                  onChange={handleAssocChange}
                  name="Assoc"
                  id="Assoc"
                  label={userAssoc}
                  autoFocus
                  style={{ width: "100%", margin: "auto" }}
                />
                <div className="ml-2 ">
                  <Chip
                    label={<CheckCircleOutlineRoundedIcon />}
                    onClick={() => setUserAssoc(assoc)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" pt-8 pb-16 flex justify-center ">
            <Button
              onClick={() => {
                ModifProfil();
              }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ width: "10%" }}
            >
              Confirmer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
