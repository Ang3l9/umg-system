import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Card, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../config/apiConfig";
import './design/HomePage.css';

function NotificacionesCtList() {
    const [notificaciones, setNotificaciones] = useState([]);
    const [formData, setFormData] = useState({
        solicitud: { idSolicitud: '' },
        usuario: { idUsuario: '' },
        mensaje: '',
        estado: 'No leida'
    });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const fetchNotificaciones = async () => {
        try {
            const response = await api.get('/api/v1/notificaciones-avaluo');
            setNotificaciones(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar las notificaciones');
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
        fetchNotificaciones();
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
                solicitud: { idSolicitud: parseInt(formData.solicitud.idSolicitud) || 0 },
                usuario: { idUsuario: parseInt(formData.usuario.idUsuario) || 0 }
            };
            if (editId) {
                await api.put(`/api/v1/notificaciones-avaluo/${editId}`, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                await api.post('/api/v1/notificaciones-avaluo', payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            setFormData({
                solicitud: { idSolicitud: '' },
                usuario: { idUsuario: '' },
                mensaje: '',
                estado: 'No leida'
            });
            setEditId(null);
            setError(null);
            fetchNotificaciones();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar la notificación');
            console.error(err);
        }
    };

    const handleEdit = (notificacion) => {
        setFormData({
            solicitud: notificacion.solicitud ? { idSolicitud: notificacion.solicitud.idSolicitud.toString() } : { idSolicitud: '' },
            usuario: notificacion.usuario ? { idUsuario: notificacion.usuario.idUsuario.toString() } : { idUsuario: '' },
            mensaje: notificacion.mensaje || '',
            estado: notificacion.estado || 'No leida'
        });
        setEditId(notificacion.idNotificacion);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/v1/notificaciones-avaluo/${id}`);
            setError(null);
            fetchNotificaciones();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar la notificación');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setFormData({
            solicitud: { idSolicitud: '' },
            usuario: { idUsuario: '' },
            mensaje: '',
            estado: 'No leida'
        });
        setEditId(null);
        setError(null);
    };

    return (
        <Card className="container mx-auto p-4">
            <Typography variant="h4" className="mb-4">Gestión de Notificaciones</Typography>
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
                                {solicitud.idSolicitud}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Usuario Destinatario</InputLabel>
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
                    label="Mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={4}
                />
                <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        required
                    >
                        <MenuItem value="No leida">No leida</MenuItem>
                        <MenuItem value="Leida">Leida</MenuItem>
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
                            <TableCell>Usuario Destinatario</TableCell>
                            <TableCell>Mensaje</TableCell>
                            <TableCell>Fecha Registro</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notificaciones.map((notificacion) => (
                            <TableRow key={notificacion.idNotificacion}>
                                <TableCell>{notificacion.idNotificacion}</TableCell>
                                <TableCell>{notificacion.solicitud?.idSolicitud || '-'}</TableCell>
                                <TableCell>{notificacion.usuario?.usuNombre || '-'}</TableCell>
                                <TableCell>{notificacion.mensaje}</TableCell>
                                <TableCell>{notificacion.fechaRegistro}</TableCell>
                                <TableCell>{notificacion.estado}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(notificacion)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(notificacion.idNotificacion)}>
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

export default NotificacionesCtList;