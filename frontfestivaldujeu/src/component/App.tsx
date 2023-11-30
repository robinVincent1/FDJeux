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
import { NewsPage } from './news/NewsPage';
import { PlanningPersoPage } from './planning/PlanningPersoPage';

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
          <Route path="/accueil" element={<PageAccueil />} />
          <Route path="/planning_general" element={<PlanningGeneralPage />}/>
          <Route path="/planning_perso" element={<PlanningPersoPage />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path='/profil' element={<ProfilPage />} />
          <Route path="/news" element={<NewsPage />}/>
          <Route path="admin" element={<AdminPage />} />
          </Routes>


        </main>
      </Router>
    </div>
  );
}

export default App;
