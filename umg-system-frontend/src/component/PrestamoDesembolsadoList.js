import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Card, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../config/apiConfig";
import './design/HomePage.css';

function PrestamoDesembolsadoList() {
    const [prestamos, setPrestamos] = useState([]);
    const [formData, setFormData] = useState({
        contrato: { idContrato: '' },
        usuario: { idUsuario: '' },
        montoDesembolsado: '',
        estadoDesembolso: 'Pendiente'
    });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [contratos, setContratos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const fetchPrestamos = async () => {
        try {
            const response = await api.get('/api/v1/prestamo-desembolsado');
            setPrestamos(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar los desembolsos');
            console.error(err);
        }
    };

    const fetchContratos = async () => {
        try {
            const response = await api.get('/api/v1/contratoprestamo');
            setContratos(response.data);
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
        fetchPrestamos();
        fetchContratos();
        fetchUsuarios();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'contrato') {
            setFormData(prev => ({ ...prev, contrato: { idContrato: value } }));
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
                montoDesembolsado: parseFloat(formData.montoDesembolsado) || 0,
                contrato: { idContrato: parseInt(formData.contrato.idContrato) || 0 },
                usuario: { idUsuario: parseInt(formData.usuario.idUsuario) || 0 }
            };
            if (editId) {
                await api.put(`/api/v1/prestamo-desembolsado/${editId}`, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                await api.post('/api/v1/prestamo-desembolsado', payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            setFormData({
                contrato: { idContrato: '' },
                usuario: { idUsuario: '' },
                montoDesembolsado: '',
                estadoDesembolso: 'Pendiente'
            });
            setEditId(null);
            setError(null);
            fetchPrestamos();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el desembolso');
            console.error(err);
        }
    };

    const handleEdit = (prestamo) => {
        setFormData({
            contrato: prestamo.contrato ? { idContrato: prestamo.contrato.idContrato.toString() } : { idContrato: '' },
            usuario: prestamo.usuario ? { idUsuario: prestamo.usuario.idUsuario.toString() } : { idUsuario: '' },
            montoDesembolsado: prestamo.montoDesembolsado ? prestamo.montoDesembolsado.toString() : '',
            estadoDesembolso: prestamo.estadoDesembolso || 'Pendiente'
        });
        setEditId(prestamo.idDesembolso);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/v1/prestamo-desembolsado/${id}`);
            setError(null);
            fetchPrestamos();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar el desembolso');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setFormData({
            contrato: { idContrato: '' },
            usuario: { idUsuario: '' },
            montoDesembolsado: '',
            estadoDesembolso: 'Pendiente'
        });
        setEditId(null);
        setError(null);
    };

    return (
        <Card className="container mx-auto p-4">
            <Typography variant="h4" className="mb-4">Gestión de Desembolsos</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 2, width: '30ch' } }} noValidate autoComplete="off">
                <FormControl fullWidth>
                    <InputLabel>Contrato</InputLabel>
                    <Select
                        name="contrato"
                        value={formData.contrato.idContrato}
                        onChange={handleInputChange}
                        required
                    >
                        <MenuItem value="">Seleccione un contrato</MenuItem>
                        {contratos.map((contrato) => (
                            <MenuItem key={contrato.idContrato} value={contrato.idContrato}>
                                {contrato.idContrato}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Usuario</InputLabel>
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
                    label="Monto Desembolsado"
                    name="montoDesembolsado"
                    type="number"
                    value={formData.montoDesembolsado}
                    onChange={handleInputChange}
                    required
                />
                <FormControl fullWidth>
                    <InputLabel>Estado Desembolso</InputLabel>
                    <Select
                        name="estadoDesembolso"
                        value={formData.estadoDesembolso}
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
                            <TableCell>Contrato</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Monto Desembolsado</TableCell>
                            <TableCell>Fecha Desembolso</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prestamos.map((prestamo) => (
                            <TableRow key={prestamo.idDesembolso}>
                                <TableCell>{prestamo.idDesembolso}</TableCell>
                                <TableCell>{prestamo.contrato?.descripcion || '-'}</TableCell>
                                <TableCell>{prestamo.usuario?.usuNombre || '-'}</TableCell>
                                <TableCell>{prestamo.montoDesembolsado}</TableCell>
                                <TableCell>{prestamo.fechaDesembolso}</TableCell>
                                <TableCell>{prestamo.estadoDesembolso}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(prestamo)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(prestamo.idDesembolso)}>
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

export default PrestamoDesembolsadoList;