import React from 'react';
import { Container, Grid } from '@mui/material';
import Empresas from './components/Empresa/Empresas';
import CadastroEmpresa from './components/Empresa/CadastroEmpresa';

const App = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Empresas</h2>
          <Empresas />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
