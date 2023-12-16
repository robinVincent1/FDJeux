// App.js

import React from 'react';
import '../App.css';
import './styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './connexion/SignIn';
import SignUp from './connexion/SignUp';
import { PageAccueil } from './accueil/PageAccueil';
import "./output.css"
import { AdminPage } from './admin/AdminPage';
import {PlanningGeneralPage} from './planning/PlanningGeneralPage'
import  Navbar  from './layout/Navbar';
import { ProfilPage } from './profil/ProfilPage';
import { CreerNewsPage } from './news/CreerNewsPage';
import { NewsPage } from './news/NewsPage';
import { PageForum } from './forum/PageForum';
import { PlanningPersoPage } from './planning/PlanningPersoPage';
import { PageInfos } from './infosPratiques/PageInfos';
import { CreerInfosPage } from './infosPratiques/CreerInfosPages';
import {PageHebergement} from './hebergement/PageHebergement';
import { CreerHebergement } from './hebergement/CreerHebergement';

function App() {
  return (
    <div>
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<PageAccueil />}/>
          <Route path="/accueil" element={<PageAccueil />} />
          <Route path="/planning_general" element={<PlanningGeneralPage />}/>
          <Route path="/planning_perso" element={<PlanningPersoPage />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path='/profil' element={<ProfilPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/creerNews" element={<CreerNewsPage />}/>
          <Route path="/news" element={<NewsPage />}/>
          <Route path="forum" element={<PageForum />} />
          <Route path="infos" element={<PageInfos />}/>
          <Route path="creerinfos" element={<CreerInfosPage/>} />
          <Route path="hebergement" element={<PageHebergement/>} />
          <Route path="PropositionHebergement" element={<CreerHebergement/>}/>
        </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
