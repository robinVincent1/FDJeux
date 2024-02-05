import React, { useState, useEffect, FormEvent } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface SignInProps { }

function SignIn(props: SignInProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [err, setErr] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("j'essai d'envoyer le message")
      const response = await fetch('https://festival-jeu-mtp-api.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('userId', data.id);
        navigate('/acceuil');
        console.log('Connexion réussie');
      } else {
        console.log('Identifiants de connexion invalides');
        throw new Error(data.errors || 'Erreur identification');
      }
    } catch (error: any) {
      console.error(error);
      setErr(error.message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.display = 'none';
    }

    return () => {
      if (nav) {
        nav.style.display = 'block';
      }
    };
  }, [navigate]);

  return (
    <div style={{
      backgroundImage: 'url("BlueWall.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat', // Utilisez 'no-repeat' pour éviter la répétition de l'image
      height: '100vh', // Assure que l'image couvre toute la hauteur de la vue
      width: '100vw', // Assure que l'image couvre toute la largeur de la vue
      position: 'fixed', // Changez ici pour 'fixed' pour fixer l'image lors du défilement
      top: 0,
      left: 0,
      zIndex: -1, // Place l'image derrière tout contenu
    }}>
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        }}
      >
        <div>
          <img src="/logo_FDJ_FINAL.svg"></img>
        </div>
        <Typography component="h1" variant="h5" sx={{ color: '#164d9c', margin: '20px 0' }}>
          Se connecter
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="email"
                required
                fullWidth
                id="email"
                label="Email ou Téléphone"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                sx={{ bgcolor: 'white', borderRadius: 1, borderColor: '#164d9c' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                required
                fullWidth
                id="password"
                label="Mot de Passe"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ bgcolor: 'white', borderRadius: 1, borderColor: '#164d9c' }}
                InputProps={{ // Ajoutez cette prop pour le TextField du mot de passe
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {/* Ajoutez d'autres champs de la même manière */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2, bgcolor: '#164d9c', '&:hover': { bgcolor: '#164d9c' } }}
            >
              Se connecter
            </Button>
            
          </Grid>
          <Grid container>
              <Grid container justifyContent="center">
                <Link href="#" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid container justifyContent="center">
                <Link href="/" variant="body2">
                  {"Pas encore de compte ? Inscrits-toi !"}
                </Link>
              </Grid>
            </Grid>
        </form>
      </Box>
      
    </Container>
    </div>
  );


}

export default SignIn;
