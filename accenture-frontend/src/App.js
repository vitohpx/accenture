import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Empresas from './components/Empresa/Empresas';
import Fornecedores from './components/Fornecedor/Fornecedores';

const App = () => {
  return (
    <Routes>
      <Route exact path="*" element={<Empresas />} />
      <Route path="/fornecedores" element={<Fornecedores />} />
      <Route path="/fornecedores/:cnpj" element={<Fornecedores />} />
    </Routes>
  );
};

export default App;
