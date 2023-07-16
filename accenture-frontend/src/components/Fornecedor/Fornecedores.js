import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import CadastraFornecedor from './CadastraFornecedor';
import './fornecedor.css';

const Fornecedores = () => {
    const [fornecedores, setFornecedores] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroCnpjCpf, setFiltroCnpjCpf] = useState('');
    const navigate = useNavigate();
    const { cnpj } = useParams();



    useEffect(() => {
        fetchFornecedores();
    }, []);

    console.log(fornecedores);

    const fetchFornecedores = async () => {
        try {
            const response = await api.get(`/empresa/${cnpj}/fornecedores`);
            setFornecedores(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const addFornecedor = (fornecedor) => {
        setFornecedores((prevFornecedor) => [...prevFornecedor, fornecedor]);
    };

    const handleFiltrar = async () => {
        try {
            const response = await api.get('/fornecedores', {
                params: {
                    nome: filtroNome,
                    cpfcnpj: filtroCnpjCpf,
                },
            });
            setFornecedores(response.data);
        } catch (error) {
        }
    };

    const handleDeleteFornecedor = async (cnpjCpf) => {
        try {
            await api.delete(`/fornecedor/${cnpjCpf}`);
            setFornecedores((prevFornecedores) => prevFornecedores.filter((fornecedor) => fornecedor.CNPJCPF !== cnpjCpf));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEmpresasPage = () => {
        navigate('/');
    };

    return (
        <div className="page-container">
            <div className='button-voltar'>
                <Button onClick={handleEmpresasPage} variant="contained" color="secondary">
                    Voltar
                </Button>
            </div>
            <div className='grid-container'>
                <TextField
                    label="Filtrar por Nome"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                />
                <TextField
                    label="Filtrar por CNPJ/CPF"
                    value={filtroCnpjCpf}
                    onChange={(e) => setFiltroCnpjCpf(e.target.value)}
                />
                <Button onClick={handleFiltrar} variant="contained" color="primary" className='button-filtrar'>
                    Filtrar
                </Button>
            </div>

            <div className="container">
                <CadastraFornecedor addFornecedor={addFornecedor} fetchFornecedores={fetchFornecedores} ></CadastraFornecedor>
                <h3>Fornecedores cadastrados</h3>
                <List>
                    {fornecedores.map((fornecedor) => (
                        <ListItem key={fornecedor.cnpjcpf}>
                            <ListItemText
                                primary={fornecedor.nome}
                                secondary={fornecedor.cnpjcpf}
                            />
                            <IconButton onClick={() => handleDeleteFornecedor(fornecedor.cnpjCpf)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default Fornecedores;