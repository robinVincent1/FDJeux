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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="/logo_FDJ_FINAL.svg" />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Link
                key={index}
                to={page.href}
                style={{ textDecoration: "none" }}
              >
                {page.title == "Repas" ? (
                  <div>
                    {repasSM == 2 || repasSS == 2 || repasDM == 2 ? (
                      <Badge color="error" variant="dot">
                        <Button color="inherit">{page.title}</Button>
                      </Badge>
                    ) : (
                      <Button color="inherit">{page.title}</Button>
                    )}
                  </div>
                ) : (
                  <Button color="inherit">{page.title}</Button>
                )}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    sx={{ bgcolor: "#0A5483", width: "50px", height: "50px" }}
                  >
                   

                  </Avatar>
                </StyledBadge>
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
                  <Link to={setting.href} style={{ textDecoration: "none" }}>
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
