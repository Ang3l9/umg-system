import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Card, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../config/apiConfig";
import './design/HomePage.css';

function FirmaElectronicaList() {
    const [firmas, setFirmas] = useState([]);
    const [formData, setFormData] = useState({
        idContrato: '',
        idUsuario: '',
        documentoFirmado: null,
        estadoFirma: 'Pendiente'
    });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [contratos, setContratos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const fetchFirmas = async () => {
        try {
            const response = await api.get('/api/v1/firmaelectronica');
            setFirmas(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar las firmas');
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
        fetchFirmas();
        fetchContratos();
        fetchUsuarios();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'documentoFirmado' && files) {
            setFormData(prev => ({ ...prev, documentoFirmado: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('idContrato', formData.idContrato);
        formDataToSend.append('idUsuario', formData.idUsuario);
        if (formData.documentoFirmado) {
            formDataToSend.append('documentoFirmado', formData.documentoFirmado);
        }
        formDataToSend.append('estadoFirma', formData.estadoFirma);

        try {
            if (editId) {
                await api.put(`/api/v1/firmaelectronica/${editId}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/api/v1/firmaelectronica', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            setFormData({
                idContrato: '',
                idUsuario: '',
                documentoFirmado: null,
                estadoFirma: 'Pendiente'
            });
            setEditId(null);
            setError(null);
            fetchFirmas();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar la firma');
            console.error(err);
        }
    };

    const handleEdit = (firma) => {
        setFormData({
            idContrato: firma.idContrato.toString(),
            idUsuario: firma.idUsuario.toString(),
            documentoFirmado: null, // Reset file input for edit
            estadoFirma: firma.estadoFirma
        });
        setEditId(firma.idFirma);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/v1/firmaelectronica/${id}`);
            setError(null);
            fetchFirmas();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar la firma');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setFormData({
            idContrato: '',
            idUsuario: '',
            documentoFirmado: null,
            estadoFirma: 'Pendiente'
        });
        setEditId(null);
        setError(null);
    };

    return (
        <Card className="container mx-auto p-4">
            <Typography variant="h4" className="mb-4">Gestión de Firmas Electrónicas</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 2, width: '30ch' } }} noValidate autoComplete="off">
                <TextField
                    label="ID Contrato"
                    name="idContrato"
                    value={formData.idContrato}
                    onChange={handleInputChange}
                    required
                    select
                    SelectProps={{ native: true }}
                >
                    <option value="">Seleccione un contrato</option>
                    {contratos.map((contrato) => (
                        <option key={contrato.idContrato} value={contrato.idContrato}>
                            {contrato.idContrato}
                        </option>
                    ))}
                </TextField>
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
                <TextField
                    label="Documento Firmado"
                    name="documentoFirmado"
                    type="file"
                    onChange={handleInputChange}
                    required={!editId} // Optional for edit
                />
                <TextField
                    label="Estado Firma"
                    name="estadoFirma"
                    value={formData.estadoFirma}
                    onChange={handleInputChange}
                    required
                    select
                    SelectProps={{ native: true }}
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completada">Completada</option>
                    <option value="Rechazada">Rechazada</option>
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
                            <TableCell>ID Contrato</TableCell>
                            <TableCell>ID Usuario</TableCell>
                            <TableCell>Fecha Firma</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {firmas.map((firma) => (
                            <TableRow key={firma.idFirma}>
                                <TableCell>{firma.idFirma}</TableCell>
                                <TableCell>{firma.idContrato}</TableCell>
                                <TableCell>{firma.idUsuario}</TableCell>
                                <TableCell>{firma.fechaFirma}</TableCell>
                                <TableCell>{firma.estadoFirma}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(firma)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(firma.idFirma)}>
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

export default FirmaElectronicaList;