import React, { useState, useEffect } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dropdown from "./Dropdown";
import Dropdown2 from "./Dropdown2";
import "../styles/styles.css";
import "../output.css";
import { useNavigate } from 'react-router-dom';
import Autocomplete from "@mui/material/Autocomplete";


function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        FestivalDuJeux
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [login, setLogin] = useState(false);
  const [err, setError] = useState('');
  const navigate = useNavigate();
  const [proposition, setProposition] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [postalAdress, setPostalAdress] = useState('');
  const [photoProfil, setPhotoProfil] = useState('');
  const [telephone, setTelephone] = useState('');
  const [association, setAssociation] = useState('');
  const [nbEdition, setNbEdition] = useState(0);
  const [pseudo, setPseudo] = useState('');
  const [propo, setPropo] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [associationError, setAssociationError] = useState('');
  const [hebergementError, setHebergementError] = useState('');
  const associationOptions = ["Association 1", "Association 2", "Aucune"];



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
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);

    if (!firstName) {
      return setFirstNameError('Veuillez entrer votre prénom.');
    } else {
      setFirstNameError('');
    }

    if (!lastName) {
      return setLastNameError('Veuillez entrer votre nom.');
    } else {
      setLastNameError('');
    }
    // Validation de l'adresse e-mail
    if (!email) {
      return setEmailError('Veuillez entrer une adresse e-mail.');
    } else if (!/\S+@\S+\.\S{2,3}/.test(email)) {
      return setEmailError("L'adresse e-mail est invalide.");
    } else {
      setEmailError('');
    }

    // Validation du mot de passe
    if (!password) {
      return setPasswordError('Veuillez entrer un mot de passe.');
    } else if (password.length < 8) {
      return setPasswordError('Le mot de passe doit contenir au moins 8 caractères.');
      // Validation du mot de passe avec au moins un chiffre, une lettre en majuscule, une lettre en minuscule et un caractère spécial
    } else if (!/^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/.test(password)) {
      return setPasswordError('Le mot de passe doit contenir au moins un chiffre, une lettre en majuscule, une lettre en minuscule et un caractère spécial.');
    } else {
      setPasswordError('');
    }

    // Validation de la confirmation du mot de passe
    if (!confirmPassword) {
      return setConfirmPasswordError('Veuillez confirmer votre mot de passe.');
    } else if (password !== confirmPassword) {
      return setConfirmPasswordError('Les mots de passe ne correspondent pas.');
    } else {
      setConfirmPasswordError('');
    }

    if (!association) {
      return setAssociationError("Veuillez entrer le nom de l'association.");
    } else {
      setAssociationError('');
    }

    console.log('Association:', firstName);
    try {
      console.log('j\'essai de fetch');
      const response = await fetch('http://localhost:8080/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          nbEdition,
          pseudo,
          postalAdress,
          propo,
          association,
          telephone,
          photoProfil,
        })
      })
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors || 'Erreur identification');
      }

      console.log(`Tout va bien tu es là avec le token ${data.accessToken}`);
      localStorage.setItem('token', data.accessToken);
      setLogin(true);
      setError('');
      navigate('/home');
    } catch (error: any) {
      setError(error.message);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = (event: ProgressEvent<FileReader>) => {
        const readerResult = event.target?.result;

        if (readerResult && (typeof readerResult === 'string' || readerResult instanceof ArrayBuffer)) {
          setPhotoProfil(readerResult as string);
          setPhotoPreview(readerResult as string); // Mettre à jour photoPreview avec l'URL de l'image
        }
      };

      reader.readAsDataURL(file);
    }
  };


  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmer le mot de passe"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!confirmPasswordError}
                  helperText={confirmPasswordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="nb edition precedente"
                  label="Edition(s) précédente(s) ?"
                  type="number"
                  id="nbEdition"
                  value={nbEdition.toString()}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value) && value >= 0) {
                      setNbEdition(value);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="pseudo"
                  label="Pseudo"
                  type="text"
                  id="pseudo"
                  onChange={(e) => setPseudo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={proposition}
                  fullWidth
                  name="adresse postale"
                  label="Adresse postale"
                  type="text"
                  id="adPostale"
                  onChange={(e) => setPostalAdress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="telephone"
                  label="Numéro de téléphone"
                  type="tel"
                  id="telephone"
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
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
                  onChange={(event: React.ChangeEvent<{}>, newValue: string | null) => setAssociation(newValue ?? '')}
                  freeSolo
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  defaultValue=""
                />
              </Grid>
              <div className="p-16">
                <Dropdown2 propo={setProposition} />
              </div>
              {proposition && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Proposition"
                    label="Proposition"
                    type="text"
                    id="Proposition"
                    onChange={(e) => setPropo(e.target.value)}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload-photo"
                  type="file"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="upload-photo"
                  style={{
                    display: 'inline-block',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '16px',
                  }}
                >
                  Choisir une photo de profil
                </label>
                {photoPreview && <img
                  src={photoPreview}
                  alt="Photo de profil"
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginTop: '10px',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Déjà inscrit ? Connectes-toi !
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
}
