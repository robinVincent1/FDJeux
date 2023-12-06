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

function App() {
  return (
    <div>
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
        <Routes>
          <Route path="/home" element={<PageAccueil />}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/planning" element={<PlanningPage />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<PageAccueil />} />
          <Route path='/profil' element={<PageAccueil />} />
          <Route path="admin" element={<AdminPage />} />
        </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
