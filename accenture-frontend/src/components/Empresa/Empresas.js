import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, TextField, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../services/api';
import CadastroEmpresa from './CadastroEmpresa';
import './empresa.css';

const Empresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');
    const [countFornecedores, setCountFornecedores] = useState(0);
    const [clickVerFuncionarios, setClickVerFornecedores] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            const response = await api.get('/empresa');
            setEmpresas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addEmpresa = (empresa) => {
        setEmpresas((prevEmpresas) => [...prevEmpresas, empresa]);
    };

    const handleFiltroNomeChange = (e) => {
        setFiltroNome(e.target.value);
    };

    const filtrarEmpresas = () => {
        return empresas.filter((empresa) =>
            empresa.nomeFantasia.toLowerCase().includes(filtroNome.toLowerCase())
        );
    };

    const handleVerFornecedoresClick = async (cnpj) => {
        try {
            const response = await api.get(`/empresa/${cnpj}/fornecedores`);
            const empresaIndex = empresas.findIndex((empresa) => empresa.cnpj === cnpj);
            const updatedEmpresas = [...empresas];
            updatedEmpresas[empresaIndex].fornecedores = response.data;
            setCountFornecedores(updatedEmpresas[empresaIndex].fornecedores.length);
            setClickVerFornecedores((prevClicado) => ({
                ...prevClicado,
                [cnpj]: true,
            }));
            setEmpresas(updatedEmpresas);
            setTimeout(() => {
                setClickVerFornecedores((prevClicado) => {
                    const updatedClicado = { ...prevClicado };
                    delete updatedClicado[cnpj];
                    return updatedClicado;
                });
            }, 1000);
            if (response.data.length > 0) {
                navigate(`/fornecedores/${cnpj}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteEmpresa = async (cnpj) => {
        try {
            await api.delete(`/empresa/${cnpj}`);
            const updatedEmpresas = empresas.filter((empresa) => empresa.cnpj !== cnpj);
            setEmpresas(updatedEmpresas);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFornecedoresClick = () => {
        navigate('/fornecedores');
    };

    return (
        <div className="page-container">
            <h1>Accenture</h1>
            <div className="cadastro-fornecedores-container">
                <Button onClick={handleFornecedoresClick} variant="contained" color="primary">
                    Cadastrar Fornecedores
                </Button>
            </div>
            <div className="filter-empresas">
                <TextField
                    label="Buscar Empresa"
                    value={filtroNome}
                    onChange={handleFiltroNomeChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="container">
                <CadastroEmpresa addEmpresa={addEmpresa} />
                <h3>Empresas/CNPJ</h3>
                <List>
                    {filtrarEmpresas().map((empresa) => (
                        <ListItem key={empresa.cnpj} className="list-item">
                            <ListItemText className='list-item-text' primary={empresa.nomeFantasia} secondary={empresa.cnpj} />
                            <Button onClick={() => handleVerFornecedoresClick(empresa.cnpj)}>
                                Ver Fornecedores
                            </Button>
                            {clickVerFuncionarios[empresa.cnpj] && countFornecedores === 0 && (
                                <p className="no-fornecedores">Não há fornecedores</p>
                            )}
                            <IconButton onClick={() => handleDeleteEmpresa(empresa.cnpj)}>
                                <DeleteIcon className='delete-icon' />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default Empresas;
