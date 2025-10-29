import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Card, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../config/apiConfig";
import './design/HomePage.css';


function TipoArticuloList() {
    const [tiposArticulos, setTiposArticulos] = useState([]);
    const [formData, setFormData] = useState({ nombreArticulo: '', descripcion: '' });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);

    const fetchTiposArticulos = async () => {
        try {
            const response = await api.get('/api/v1/tipoarticulo');
            setTiposArticulos(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar los tipos de artículos');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTiposArticulos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/api/v1/tipoarticulo/${editId}`, formData);
            } else {
                await api.post('/api/v1/tipoarticulo', formData);
            }
            setFormData({ nombreArticulo: '', descripcion: '' });
            setEditId(null);
            setError(null);
            fetchTiposArticulos(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el tipo de artículo');
            console.error(err);
        }
    };

    const handleEdit = (tipo) => {
        setFormData({ nombreArticulo: tipo.nombreArticulo, descripcion: tipo.descripcion || '' });
        setEditId(tipo.idTipoArticulo);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/v1/tipoarticulo/${id}`);
            setError(null);
            fetchTiposArticulos(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar el tipo de artículo');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setFormData({ nombreArticulo: '', descripcion: '' });
        setEditId(null);
        setError(null);
    };

    return (
        <Card className="container mx-auto p-4">
            <Typography variant="h4" className="mb-4">Gestión de Tipos de Artículos</Typography>

            {/* Form for Create/Update */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ '& > :not(style)': { m: 2, width: '30ch' } }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Nombre del Artículo"
                    name="nombreArticulo"
                    value={formData.nombreArticulo}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Descripción"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                />
                <Box>
                    <Button variant="contained" type="submit" className="mr-2">
                        {editId ? 'Actualizar' : 'Crear'}
                    </Button>
                    {editId && (
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancelar
                        </Button>
                    )}
                </Box>
            </Box>

            {error && (
                <Typography color="error" className="mb-4">
                    {error}
                </Typography>
            )}

            <TableContainer component={Paper} className="mt-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tiposArticulos.map((tipo) => (
                            <TableRow key={tipo.idTipoArticulo}>
                                <TableCell>{tipo.idTipoArticulo}</TableCell>
                                <TableCell>{tipo.nombreArticulo}</TableCell>
                                <TableCell>{tipo.descripcion || '-'}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(tipo)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(tipo.idTipoArticulo)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}

export default TipoArticuloList;