import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, Alert, Grid } from '@mui/material';
import api from '../../services/api';
import './fornecedor.css';


const CadastraFornecedor = ({ addFornecedor, fetchFornecedores }) => {
    const [cnpjCpf, setCnpjCpf] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [rg, setRg] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [empresas, setEmpresas] = useState([]);
    const [empresaCNPJ, setEmpresaCNPJ] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await api.get('/empresa');
                setEmpresas(response.data);
            } catch (error) {
            }
        };

        fetchEmpresas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/fornecedor', {
                cnpjCpf,
                nome,
                email,
                cep,
                rg,
                dataNascimento,
                EmpresaCNPJ: [empresaCNPJ],
            });
            addFornecedor({
                cnpjCpf,
                nome,
                email,
                cep,
                rg,
                dataNascimento, empresaCNPJ
            });

            fetchFornecedores();

            setCnpjCpf('');
            setNome('');
            setEmail('');
            setCep('');
            setRg('');
            setDataNascimento('');
            setEmpresaCNPJ('');

            setAlertSeverity('success');
            setAlertMessage('Fornecedor cadastrado com sucesso! Veja seu fornecedor na empresa selecionada');

            setTimeout(() => {
                setAlertMessage('');
            }, 3000);
        } catch (error) {
            console.error(error);

            setAlertSeverity('error');
            setAlertMessage('Ocorreu um erro ao cadastrar o fornecedor.');

            setTimeout(() => {
                setAlertMessage('');
            }, 3000);
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="CNPJ/CPF"
                            value={cnpjCpf}
                            onChange={(e) => setCnpjCpf(e.target.value)}
                            className="form-field"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="form-field"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <TextField
                            label="RG"
                            value={rg}
                            onChange={(e) => setRg(e.target.value)}
                            className="form-field"

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel className="form-field"
                            id="empresaCNPJ-label">Data de Nascimento </InputLabel  >
                        <TextField
                            type="date"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            className="form-field date-textfield"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel className="form-field"
                            id="empresaCNPJ-label">Empresa CNPJ </InputLabel  >
                        <Select
                            className="form-field select-field"
                            labelId="empresaCNPJ-label"
                            value={empresaCNPJ}
                            onChange={(e) => setEmpresaCNPJ(e.target.value)}
                        >
                            <MenuItem className='menu-item' value={null}>Sem Empresa</MenuItem>
                            {empresas.map((empresa) => (
                                <MenuItem className='menu-item' key={empresa.cnpj} value={empresa.cnpj}>
                                    {empresa.nomeFantasia}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">
                            Cadastrar Fornecedor
                        </Button>
                    </Grid>
                </Grid>
                {alertMessage && (
                    <Alert className="alert-container" severity={alertSeverity} onClose={() => setAlertMessage('')}>
                        {alertMessage}
                    </Alert>
                )}
            </form>
        </div>
    );
};
export default CadastraFornecedor;
