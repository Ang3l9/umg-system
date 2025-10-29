import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Card, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../config/apiConfig";
import './design/HomePage.css';

function AvaluoList() {
    const [avaluos, setAvaluos] = useState([]);
    const [formData, setFormData] = useState({
        solicitud: { idSolicitud: '' },
        usuario: { idUsuario: '' },
        montoEstimado: '',
        porcentajeAvaluo: '',
        estadoAvaluo: 'Pendiente'
    });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const fetchAvaluos = async () => {
        try {
            const response = await api.get('/api/v1/avaluo');
            setAvaluos(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar los avalúos');
            console.error(err);
        }
    };

    const fetchSolicitudes = async () => {
        try {
            const response = await api.get('/api/v1/solicitudes');
            setSolicitudes(response.data);
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
        fetchAvaluos();
        fetchSolicitudes();
        fetchUsuarios();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'solicitud') {
            setFormData(prev => ({ ...prev, solicitud: { idSolicitud: value } }));
        } else if (name === 'usuario') {
            setFormData(prev => ({ ...prev, usuario: { idUsuario: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                montoEstimado: parseFloat(formData.montoEstimado) || 0,
                porcentajeAvaluo: parseFloat(formData.porcentajeAvaluo) || 0,
                solicitud: { idSolicitud: parseInt(formData.solicitud.idSolicitud) || 0 },
                usuario: { idUsuario: parseInt(formData.usuario.idUsuario) || 0 }
            };
            if (editId) {
                await api.put(`/api/v1/avaluo/${editId}`, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                await api.post('/api/v1/avaluo', payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            setFormData({
                solicitud: { idSolicitud: '' },
                usuario: { idUsuario: '' },
                montoEstimado: '',
                porcentajeAvaluo: '',
                estadoAvaluo: 'Pendiente'
            });
            setEditId(null);
            setError(null);
            fetchAvaluos();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el avalúo');
            console.error(err);
        }
    };

    const handleEdit = (avaluo) => {
        setFormData({
            solicitud: avaluo.solicitud ? { idSolicitud: avaluo.solicitud.idSolicitud.toString() } : { idSolicitud: '' },
            usuario: avaluo.usuario ? { idUsuario: avaluo.usuario.idUsuario.toString() } : { idUsuario: '' },
            montoEstimado: avaluo.montoEstimado ? avaluo.montoEstimado.toString() : '',
            porcentajeAvaluo: avaluo.porcentajeAvaluo ? avaluo.porcentajeAvaluo.toString() : '',
            estadoAvaluo: avaluo.estadoAvaluo || 'Pendiente'
        });
        setEditId(avaluo.idAvaluo);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/v1/avaluo/${id}`);
            setError(null);
            fetchAvaluos();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar el avalúo');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setFormData({
            solicitud: { idSolicitud: '' },
            usuario: { idUsuario: '' },
            montoEstimado: '',
            porcentajeAvaluo: '',
            estadoAvaluo: 'Pendiente'
        });
        setEditId(null);
        setError(null);
    };

    return (
        <Card className="container mx-auto p-4">
            <Typography variant="h4" className="mb-4">Gestión de Avalúos</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 2, width: '30ch' } }} noValidate autoComplete="off">
                <FormControl fullWidth>
                    <InputLabel>Solicitud</InputLabel>
                    <Select
                        name="solicitud"
                        value={formData.solicitud.idSolicitud}
                        onChange={handleInputChange}
                        required
                    >
                        <MenuItem value="">Seleccione una solicitud</MenuItem>
                        {solicitudes.map((solicitud) => (
                            <MenuItem key={solicitud.idSolicitud} value={solicitud.idSolicitud}>
                                {solicitud.nombre} {solicitud.apellido}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Usuario Evaluador</InputLabel>
                    <Select
                        name="usuario"
                        value={formData.usuario.idUsuario}
                        onChange={handleInputChange}
                        required
                    >
                        <MenuItem value="">Seleccione un usuario</MenuItem>
                        {usuarios.map((usuario) => (
                            <MenuItem key={usuario.idUsuario} value={usuario.idUsuario}>
                                {usuario.usuNombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Monto Estimado"
                    name="montoEstimado"
                    type="number"
                    value={formData.montoEstimado}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Porcentaje de Avalúo"
                    name="porcentajeAvaluo"
                    type="number"
                    value={formData.porcentajeAvaluo}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 25, max: 85 }}
                />
                <FormControl fullWidth>
                    <InputLabel>Estado Avalúo</InputLabel>
                    <Select
                        name="estadoAvaluo"
                        value={formData.estadoAvaluo}
                        onChange={handleInputChange}
                        required
                    >
                        <MenuItem value="Pendiente">Pendiente</MenuItem>
                        <MenuItem value="Aprobado">Aprobado</MenuItem>
                        <MenuItem value="Rechazado">Rechazado</MenuItem>
                    </Select>
                </FormControl>
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
                            <TableCell>Solicitud</TableCell>
                            <TableCell>Usuario Evaluador</TableCell>
                            <TableCell>Monto Estimado</TableCell>
                            <TableCell>Porcentaje Avalúo</TableCell>
                            <TableCell>Monto Aprobado</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {avaluos.map((avaluo) => (
                            <TableRow key={avaluo.idAvaluo}>
                                <TableCell>{avaluo.idAvaluo}</TableCell>
                                <TableCell>{avaluo.solicitud?.nombre ? `${avaluo.solicitud.nombre} ${avaluo.solicitud.apellido}` : '-'}</TableCell>
                                <TableCell>{avaluo.usuario?.usuNombre || '-'}</TableCell>
                                <TableCell>{avaluo.montoEstimado}</TableCell>
                                <TableCell>{avaluo.porcentajeAvaluo}</TableCell>
                                <TableCell>{avaluo.montoAprobado}</TableCell>
                                <TableCell>{avaluo.estadoAvaluo}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(avaluo)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(avaluo.idAvaluo)}>
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

export default AvaluoList;