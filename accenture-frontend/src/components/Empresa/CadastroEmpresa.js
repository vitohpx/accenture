import React, { useState } from 'react';
import { TextField, Button, Alert, Grid } from '@mui/material';
import api from '../../services/api';
import './empresa.css';

const CadastroEmpresa = ({ addEmpresa }) => {
    const [cnpj, setCnpj] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cep, setCep] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/empresa', {
                cnpj,
                nomeFantasia,
                cep,
            });

            setSuccessMessage('Empresa cadastrada com sucesso!');
            setTimeout(() => setSuccessMessage(''), 3000);
            clearForm();
            addEmpresa({ cnpj, nomeFantasia });


        } catch (error) {
            setErrorMessage('Ocorreu um erro ao cadastrar a empresa.');
            setTimeout(() => setErrorMessage(''), 3000);

        }
    };

    const clearForm = () => {
        setCnpj('');
        setNomeFantasia('');
        setCep('');
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            className="form-field"
                        />
                    </Grid>
                    <Grid item xs={12}>

                        <TextField
                            label="Nome Fantasia"
                            value={nomeFantasia}
                            onChange={(e) => setNomeFantasia(e.target.value)}
                            className="form-field"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            className="form-field"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" className="button-submit"
                        >
                            Cadastrar Empresa
                        </Button>
                    </Grid>
                </Grid>

                {errorMessage && (
                    <div className="alert-container">
                        <Alert severity="error" onClose={() => setErrorMessage('')} className="alert">
                            {errorMessage}
                        </Alert>
                    </div>
                )}

                {successMessage && (
                    <div className="alert-container">
                        <Alert severity="success" onClose={() => setSuccessMessage('')} className="alert">
                            {successMessage}
                        </Alert>
                    </div>
                )}

            </form>
        </div>
    );
};

export default CadastroEmpresa;
