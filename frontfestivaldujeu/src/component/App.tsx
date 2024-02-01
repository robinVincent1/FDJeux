// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";
import SignIn from "./connexion/SignIn";
import SignUp from "./connexion/SignUp";
import { PageAccueil } from "./accueil/PageAccueil";
import { AdminPage } from "./admin/AdminPage";
import { PlanningGeneralPage } from "./planning/PlanningGeneralPage";
import Navbar from "./layout/Navbar";
import { ProfilPage } from "./profil/ProfilPage";
import { CreerNewsPage } from "./news/CreerNewsPage";
import { NewsPage } from "./news/NewsPage";
import { PageForum } from "./forum/PageForum";
import { PlanningPersoPage } from "./planning/PlanningPersoPage";
import { PageInfos } from "./infosPratiques/PageInfos";
import { CreerInfosPage } from "./infosPratiques/CreerInfosPages";
import { PageHebergement } from "./hebergement/PageHebergement";
import { CreerHebergement } from "./hebergement/CreerHebergement";
import { PageFestival } from "./festival/PageFestival";
import { CreerFestival } from "./festival/CreerFestival";
import { Deco } from "./deconnexion/Deco";
import { PageRepas } from "./repas/PageRepas";

function App() {
  return (
    <div>
      <Router>
        <main>
          <Routes>
            {/* Route accessible sans authentification */}
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Routes nécessitant une authentification en tant qu'utilisateur */}
            <Route
              path="*"
              element={
                <AuthWrapper
                  allowedRoles={[
                    "admin",
                    "bénévole",
                    "Résponsable soirée",
                    "accueil bénévole",
                    "référent",
                  ]}
                >
                  <Route index element={<PageAccueil />} />
                  <Route path="/accueil" element={<PageAccueil />} />
                  <Route
                    path="/planning_general"
                    element={<PlanningGeneralPage />}
                  />
                  <Route
                    path="/planning_perso"
                    element={<PlanningPersoPage />}
                  />
                  <Route path="/profil" element={<ProfilPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/forum" element={<PageForum />} />
                  <Route path="/infos" element={<PageInfos />} />
                  <Route path="/hebergement" element={<PageHebergement />} />
                  <Route
                    path="/PropositionHebergement"
                    element={<CreerHebergement />}
                  />
                  <Route path="/festival" element={<PageFestival />} />
                  <Route path="/deconnexion" element={<Deco />} />
                  <Route path="/repas" element={<PageRepas />} />
                </AuthWrapper>
              }
            />

            {/* Routes nécessitant une authentification en tant qu'admin */}
            <Route
              path="admin/*"
              element={
                <AuthWrapper allowedRoles={["admin"]}>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/creerinfos" element={<CreerInfosPage />} />
                  <Route path="/Creerfestival" element={<CreerFestival />} />
                  <Route path="/creerNews" element={<CreerNewsPage />} />
                </AuthWrapper>
              }
            />

            <Route
              path="respoSoiree/*"
              element={
                <AuthWrapper allowedRoles={["admin", "Résponsable soirée"]}>
                  <Route path="/creerNews" element={<CreerNewsPage />} />
                </AuthWrapper>
              }
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
