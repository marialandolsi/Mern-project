import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Client from './components/pages/Client';
import EditClientPage from './components/EditClientPage';
import FormClient from './components/FormClient'; 
import FormArticle from './components/FormArticle'; 
import Commande from './components/Commande';
import Login from './auth/Login';
import Register from './auth/Register';
import ArticleTable from './components/ArticleTable';
import FormCommende from './components/FormCommande';
import EditArticlePage from './components/EditArticlePage';
import FornisseurTable from './components/FornisseurTable';
import FormFornisseur from './components/FormFornisseur';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path='/auth/login' element= {<Login />} />
          <Route path="/client" element={<Client />} />
          <Route path="/client/:id/edit" element={<EditClientPage />} />
          <Route path="/client/create" element={<FormClient />} /> 
          <Route path="/article/create" element={<FormArticle />} /> 
          <Route path="/article" element={<ArticleTable />} />
          <Route path="/article/:id/edit" element={<EditArticlePage />} />
          <Route path='/commande/:id' element={<Commande />} />
          <Route path='/commande/:id/add' element={<FormCommende />} />
          <Route path='/fornisseur' element={<FornisseurTable />} />
          <Route path='/fornisseur/create' element={<FormFornisseur />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
