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

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PageAccueil />}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/planning" element={<PlanningPage />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
