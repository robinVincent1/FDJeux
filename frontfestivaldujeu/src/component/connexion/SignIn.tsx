import React, { useState, useEffect, FormEvent } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Autocomplete from "@mui/material/Autocomplete";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SignInProps { }

function SignIn(props: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [login, setLogin] = useState(false);
  const [err, setError] = useState("");
  const navigate = useNavigate();
  const [proposition, setProposition] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postalAdress, setPostalAdress] = useState("");
  const [photoProfil, setPhotoProfil] = useState("");
  const [telephone, setTelephone] = useState("");
  const [association, setAssociation] = useState("");
  const [nbEdition, setNbEdition] = useState(0);
  const [pseudo, setPseudo] = useState("");
  const [propo, setPropo] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [associationError, setAssociationError] = useState("");
  const [hebergementError, setHebergementError] = useState("");
  const associationOptions = ["Association 1", "Association 2", "Aucune"];
  const [telephoneError, setTelephoneError] = useState("");
  const [postalAdressError, setPostalAdressError] = useState("");
  const [pseudoError, setPseudoError] = useState("");
  const [nbEditionError, setNbEditionError] = useState("");
  const [propoError, setPropoError] = useState("");
  const [hebergement, setHebergement] = useState("");


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
      setError(error.message);
    }
  };



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = (event: ProgressEvent<FileReader>) => {
        const readerResult = event.target?.result;

        if (
          readerResult &&
          (typeof readerResult === "string" ||
            readerResult instanceof ArrayBuffer)
        ) {
          setPhotoProfil(readerResult as string);
          setPhotoPreview(readerResult as string); // Mettre à jour photoPreview avec l'URL de l'image
        }
      };

      reader.readAsDataURL(file);
    }
  };
  
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value === "P") {
      setProposition(true);
    } else {
      setProposition(false);
    }
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
      backgroundRepeat: 'repeat',
      height: '100vh', // Assure que l'image couvre toute la hauteur de la vue
      width: '100vw', // Assure que l'image couvre toute la largeur de la vue
      position: 'absolute', // Garde l'image de fond fixée lors du défilement
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
          Inscription
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
                error={!!firstNameError}
                helperText={firstNameError}
                sx={{ bgcolor: 'white', borderRadius: 1, borderColor: '#164d9c' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Nom"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setLastName(e.target.value)}
                error={!!lastNameError}
                helperText={lastNameError}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                sx={{ bgcolor: 'white', borderRadius: 1, borderColor: '#164d9c' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="telephone"
                label="Téléphone"
                name="telephone"
                autoComplete="tel"
                onChange={(e) => setTelephone(e.target.value)}
                error={!!telephoneError}
                helperText={telephoneError}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                required
                fullWidth
                id="password"
                label="Mot de Passe"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ bgcolor: 'white', borderRadius: 1, borderColor: '#164d9c' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="confirmPassword"
                required
                fullWidth
                id="confirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                sx={{ bgcolor: 'white', borderRadius: 1, borderColor: '#164d9c' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="postal-address"
                name="postalAdress"
                required
                fullWidth
                id="postalAdress"
                label="Adresse Postale"
                onChange={(e) => setPostalAdress(e.target.value)}
                error={!!postalAdressError}
                helperText={postalAdressError}
                sx={{ bgcolor: 'white', borderRadius: 1, borderColor: '#164d9c' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="pseudo"
                label="Pseudo"
                name="pseudo"
                autoComplete="nickname"
                onChange={(e) => setPseudo(e.target.value)}
                error={!!pseudoError}
                helperText={pseudoError}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Hebergement
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedOption}
                    label="Hebergement"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="P">Proposition</MenuItem>
                    <MenuItem value="R">Recherche</MenuItem>
                    <MenuItem value="Ri">Rien</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  options={associationOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nom de l'association"
                      error={!!associationError}
                      helperText={associationError}
                    />
                  )}
                  onChange={(
                    event: React.ChangeEvent<{}>,
                    newValue: string | null
                  ) => setAssociation(newValue ?? "")}
                  freeSolo
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  defaultValue=""
                />
              </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#164d9c', '&:hover': { bgcolor: 'dark#164d9c' } }}
          >
            Inscription
          </Button>
        </Box>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/signup" variant="body2">
              Déjà inscrit ? Connectes-toi !
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </div>
  );  

}

export default SignIn;