import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { User } from "../admin/AdminPage";
import { robin } from "../profil/ProfilPage";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Festival, test } from "../festival/PageFestival";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1e5bb0",
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

const pages = [
  { title: "Accueil", href: "/accueil" },
  { title: "Festival", href: "/festival" },
  { title: "Planning General ", href: "/planning_general" },
  { title: "News", href: "/news" },
  { title: "Planning Personnel", href: "/planning_perso" },
  { title: "Forum", href: "/forum" },
  { title: "Hebergement", href: "/hebergement" },
  { title: "Repas", href: "/repas" },
];

const settings = [
  { title: "Mon profil", href: "/profil" },
  { title: "Se déconnecter", href: "/deconnexion" },
  { title: "Admin", href: "/admin/admin" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [userConnected, setUserConnected] = React.useState<User>(robin);

  React.useEffect(() => {
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
        const data = await response.json();
        setUserConnected(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchData();
  }, []);

  const [festi, setFesti] = React.useState<Festival>(test);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    // Appel API pour récupérer le festival
    fetch("http://localhost:8080/festival/enCours", {
      method: 'GET', // Remplacez 'GET' par la méthode HTTP que vous souhaitez utiliser
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((response) => response.json())
      .then((data) => setFesti(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération du festival :", error)
      );
  }, []);

  const [repasIsReady, setRepasIsReady] = React.useState(false);
  const [repasSM, setRepasSM] = React.useState(0);
  const [repasSS, setRepasSS] = React.useState(0);
  const [repasDM, setRepasDM] = React.useState(0);

  React.useEffect(() => {
    const idUser = localStorage.getItem("userId");
    // Appel API pour récupérer le repas
    fetch(`http://localhost:8080/repas/${idUser}/${festi.idFestival}/${1}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRepasSM(data.etat))
      .catch((error) =>
        console.error("Erreur lors de la récupération des repas :", error)
      );
  }, []);

  React.useEffect(() => {
    const idUser = localStorage.getItem("userId");
    // Appel API pour récupérer le repas
    fetch(`http://localhost:8080/repas/${idUser}/${festi.idFestival}/${2}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRepasSS(data.etat))
      .catch((error) =>
        console.error("Erreur lors de la récupération des repas :", error)
      );
  }, []);

  React.useEffect(() => {
    const idUser = localStorage.getItem("userId");
    // Appel API pour récupérer le repas
    fetch(`http://localhost:8080/repas/${idUser}/${festi.idFestival}/${3}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRepasDM(data.etat))
      .catch((error) =>
        console.error("Erreur lors de la récupération des repas :", error)
      );
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e5bb0" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <img src="/logo_FDJ_FINAL.svg" alt="Logo" style={{ marginRight: "auto" }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
            {pages.map((page, index) => (
              <Link key={index} to={page.href} style={{ textDecoration: "none", color: "white", margin: "0 10px" }}>
                <Button sx={{ color: "white", display: 'block' }}>{page.title}</Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profil" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Link to={setting.href} style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
