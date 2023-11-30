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
import PlanningPage from './planning/PlanningPage'
import  Navbar  from './layout/Navbar';
import { ProfilPage } from './profil/ProfilPage';
import { CreerNewsPage } from './news/CreerNewsPage';
import { NewsPage } from './news/NewsPage';
import { PageForum } from './forum/PageForum';

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
          <Route path="/planning" element={<PlanningPage />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path='/profil' element={<ProfilPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/creerNews" element={<CreerNewsPage />}/>
          <Route path="/news" element={<NewsPage />}/>
          <Route path="forum" element={<PageForum />} />
        </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
