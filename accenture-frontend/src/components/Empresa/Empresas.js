import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/api';
import CadastroEmpresa from './CadastroEmpresa';
import './empresa.css';

const Empresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');
    const [countFornecedores, setCountFornecedores] = useState(0);
    const [clickVerFuncionarios, setClickVerFornecedores] = useState({});

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            const response = await api.get('/empresa');
            setEmpresas(response.data);
        } catch (error) {
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
            setCountFornecedores(updatedEmpresas[empresaIndex].fornecedores.length)
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
        } catch (error) {
        }
    };

    const handleDeleteEmpresa = async (cnpj) => {
        try {
            await api.delete(`/empresa/${cnpj}`);
            const updatedEmpresas = empresas.filter((empresa) => empresa.cnpj !== cnpj);
            setEmpresas(updatedEmpresas);
        } catch (error) {
        }
    };

    return (
        <div>
            <CadastroEmpresa addEmpresa={addEmpresa} />
            <div className="filter-field">
                <TextField
                    label="Filtrar por Nome"
                    value={filtroNome}
                    onChange={handleFiltroNomeChange}
                />
            </div>
            <div className="container">
                <List>
                    {filtrarEmpresas().map((empresa) => (
                        <ListItem key={empresa.cnpj} className="list-item">
                            <ListItemText
                                primary={empresa.nomeFantasia}
                                secondary={empresa.cnpj}
                            />
                            <Button onClick={() => handleVerFornecedoresClick(empresa.cnpj)}>
                                Ver Fornecedores
                            </Button>
                            {clickVerFuncionarios[empresa.cnpj] && countFornecedores === 0 && (
                                <p className="no-fornecedores">Não há fornecedores</p>
                            )}
                            <IconButton onClick={() => handleDeleteEmpresa(empresa.cnpj)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default Empresas;
