import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Card, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../config/apiConfig";
import './design/HomePage.css';

function RechazoAvaluoList() {
    const [rechazos, setRechazos] = useState([]);
    const [formData, setFormData] = useState({
        idAvaluo: '',
        motivo: '',
        fechaRechazo: '',
        idUsuario: ''
    });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [avaluos, setAvaluos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const fetchRechazos = async () => {
        try {
            const response = await api.get('/api/v1/rechazoavaluo');
            setRechazos(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar los rechazos');
            console.error(err);
        }
    };

    const fetchAvaluos = async () => {
        try {
            const response = await api.get('/api/v1/avaluo');
            setAvaluos(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUsuarios = async () => {
        try {
            const response = await api.get('/api/v1/usuario');
            setUsuarios(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRechazos();
        fetchAvaluos();
        fetchUsuarios();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                idAvaluo: parseInt(formData.idAvaluo) || 0,
                idUsuario: parseInt(formData.idUsuario) || 0
            };
            if (editId) {
                await api.put(`/api/v1/rechazoavaluo/${editId}`, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                await api.post('/api/v1/rechazoavaluo', payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            setFormData({
                idAvaluo: '',
                motivo: '',
                fechaRechazo: '',
                idUsuario: ''
            });
            setEditId(null);
            setError(null);
            fetchRechazos();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el rechazo');
            console.error(err);
        }
    };

    const handleEdit = (rechazo) => {
        setFormData({
            idAvaluo: rechazo.idAvaluo.toString(),
            motivo: rechazo.motivo,
            fechaRechazo: rechazo.fechaRechazo,
            idUsuario: rechazo.idUsuario.toString()
        });
        setEditId(rechazo.idRechazo);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/v1/rechazoavaluo/${id}`);
            setError(null);
            fetchRechazos();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar el rechazo');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setFormData({
            idAvaluo: '',
            motivo: '',
            fechaRechazo: '',
            idUsuario: ''
        });
        setEditId(null);
        setError(null);
    };

    return (
        <Card className="container mx-auto p-4">
            <Typography variant="h4" className="mb-4">Gestión de Rechazos de Avalúos</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 2, width: '30ch' } }} noValidate autoComplete="off">
                <TextField
                    label="ID Avalúo"
                    name="idAvaluo"
                    value={formData.idAvaluo}
                    onChange={handleInputChange}
                    required
                    select
                    SelectProps={{ native: true }}
                >
                    <option value="">Seleccione un avalúo</option>
                    {avaluos.map((avaluo) => (
                        <option key={avaluo.idAvaluo} value={avaluo.idAvaluo}>
                            {avaluo.idAvaluo}
                        </option>
                    ))}
                </TextField>
                <TextField
                    label="Motivo"
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Fecha Rechazo"
                    name="fechaRechazo"
                    type="datetime-local"
                    value={formData.fechaRechazo}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="ID Usuario"
                    name="idUsuario"
                    value={formData.idUsuario}
                    onChange={handleInputChange}
                    required
                    select
                    SelectProps={{ native: true }}
                >
                    <option value="">Seleccione un usuario</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.idUsuario} value={usuario.idUsuario}>
                            {usuario.usuNombre}
                        </option>
                    ))}
                </TextField>
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
                            <TableCell>ID Avalúo</TableCell>
                            <TableCell>Motivo</TableCell>
                            <TableCell>Fecha Rechazo</TableCell>
                            <TableCell>ID Usuario</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rechazos.map((rechazo) => (
                            <TableRow key={rechazo.idRechazo}>
                                <TableCell>{rechazo.idRechazo}</TableCell>
                                <TableCell>{rechazo.idAvaluo}</TableCell>
                                <TableCell>{rechazo.motivo}</TableCell>
                                <TableCell>{rechazo.fechaRechazo}</TableCell>
                                <TableCell>{rechazo.idUsuario}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(rechazo)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(rechazo.idRechazo)}>
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

export default RechazoAvaluoList;