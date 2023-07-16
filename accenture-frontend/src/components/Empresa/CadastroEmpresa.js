import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import api from '../../services/api';
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
            clearForm();
            addEmpresa({ cnpj, nomeFantasia });


        } catch (error) {
            setErrorMessage('Ocorreu um erro ao cadastrar a empresa.');
        }
    };

    const clearForm = () => {
        setCnpj('');
        setNomeFantasia('');
        setCep('');
    };

    const handleCloseSnackbar = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="CNPJ"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
            />
            <TextField
                label="Nome Fantasia"
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
            />
            <TextField
                label="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
            />
            <Button type="submit" variant="contained">
                Cadastrar Empresa
            </Button>

            <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <div>{errorMessage}</div>
            </Snackbar>

            <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <div>{successMessage}</div>
            </Snackbar>
        </form>
    );
};

export default CadastroEmpresa;
