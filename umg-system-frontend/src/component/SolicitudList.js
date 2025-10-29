import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Card, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../config/apiConfig";
import './design/HomePage.css';

function SolicitudList() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        documentoIdentidad: '',
        evidencia: '',
        direccion: '',
        correoElectronico: '',
        fechaNacimiento: '',
        telefono: '',
        estadoCivil: '',
        nacionalidad: '',
        montoSolicitado: '',
        estadoSolicitud: 'Pendiente',
        usuario: { idUsuario: '' },
        tipoArticulo: { idTipoArticulo: '' }
    });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [tiposArticulos, setTiposArticulos] = useState([]);

    const fetchSolicitudes = async () => {
        try {
            const response = await api.get('/api/v1/solicitudes');
            setSolicitudes(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar las solicitudes');
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

    const fetchTiposArticulos = async () => {
        try {
            const response = await api.get('/api/v1/tipoarticulo');
            setTiposArticulos(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
        fetchUsuarios();
        fetchTiposArticulos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'usuario') {
            setFormData(prev => ({ ...prev, usuario: { idUsuario: value } }));
        } else if (name === 'tipoArticulo') {
            setFormData(prev => ({ ...prev, tipoArticulo: { idTipoArticulo: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                montoSolicitado: parseFloat(formData.montoSolicitado) || 0,
                usuario: { idUsuario: parseInt(formData.usuario.idUsuario) || 0 },
                tipoArticulo: { idTipoArticulo: parseInt(formData.tipoArticulo.idTipoArticulo) || 0 }
            };
            if (editId) {
                await api.put(`/api/v1/solicitudes/${editId}`, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                await api.post('/api/v1/solicitudes', payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            setFormData({
                nombre: '',
                apellido: '',
                documentoIdentidad: '',
                evidencia: '',
                direccion: '',
                correoElectronico: '',
                fechaNacimiento: '',
                telefono: '',
                estadoCivil: '',
                nacionalidad: '',
                montoSolicitado: '',
                estadoSolicitud: 'Pendiente',
                usuario: { idUsuario: '' },
                tipoArticulo: { idTipoArticulo: '' }
            });
            setEditId(null);
            setError(null);
            fetchSolicitudes();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar la solicitud');
            console.error(err);
        }
    };

    const handleEdit = (solicitud) => {
        setFormData({
            nombre: solicitud.nombre || '',
            apellido: solicitud.apellido || '',
            documentoIdentidad: solicitud.documentoIdentidad || '',
            evidencia: solicitud.evidencia || '',
            direccion: solicitud.direccion || '',
            correoElectronico: solicitud.correoElectronico || '',
            fechaNacimiento: solicitud.fechaNacimiento ? solicitud.fechaNacimiento.split('T')[0] : '',
            telefono: solicitud.telefono || '',
            estadoCivil: solicitud.estadoCivil || '',
            nacionalidad: solicitud.nacionalidad || '',
            montoSolicitado: solicitud.montoSolicitado ? solicitud.montoSolicitado.toString() : '',
            estadoSolicitud: solicitud.estadoSolicitud || 'Pendiente',
            usuario: solicitud.usuario ? { idUsuario: solicitud.usuario.idUsuario.toString() } : { idUsuario: '' },
            tipoArticulo: solicitud.tipoArticulo ? { idTipoArticulo: solicitud.tipoArticulo.idTipoArticulo.toString() } : { idTipoArticulo: '' }
        });
        setEditId(solicitud.idSolicitud);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/v1/solicitudes/${id}`);
            setError(null);
            fetchSolicitudes();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar la solicitud');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setFormData({
            nombre: '',
            apellido: '',
            documentoIdentidad: '',
            evidencia: '',
            direccion: '',
            correoElectronico: '',
            fechaNacimiento: '',
            telefono: '',
            estadoCivil: '',
            nacionalidad: '',
            montoSolicitado: '',
            estadoSolicitud: 'Pendiente',
            usuario: { idUsuario: '' },
            tipoArticulo: { idTipoArticulo: '' }
        });
        setEditId(null);
        setError(null);
    };

    return (
        <Card className="container mx-auto p-4">
            <Typography variant="h4" className="mb-4">Gestión de Solicitudes</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 2, width: '30ch' } }} noValidate autoComplete="off">
                <TextField
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Documento de Identidad"
                    name="documentoIdentidad"
                    value={formData.documentoIdentidad}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Evidencia"
                    name="evidencia"
                    value={formData.evidencia}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Dirección"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Correo Electrónico"
                    name="correoElectronico"
                    value={formData.correoElectronico}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Fecha de Nacimiento"
                    name="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Estado Civil"
                    name="estadoCivil"
                    value={formData.estadoCivil}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Nacionalidad"
                    name="nacionalidad"
                    value={formData.nacionalidad}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Monto Solicitado"
                    name="montoSolicitado"
                    type="number"
                    value={formData.montoSolicitado}
                    onChange={handleInputChange}
                    required
                />
                <FormControl fullWidth>
                    <InputLabel>Estado Solicitud</InputLabel>
                    <Select
                        name="estadoSolicitud"
                        value={formData.estadoSolicitud}
                        onChange={handleInputChange}
                        required
                    >
                        <MenuItem value="Pendiente">Pendiente</MenuItem>
                        <MenuItem value="Aprobada">Aprobada</MenuItem>
                        <MenuItem value="Rechazada">Rechazada</MenuItem>
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
                <FormControl fullWidth>
                    <InputLabel>Tipo de Artículo</InputLabel>
                    <Select
                        name="tipoArticulo"
                        value={formData.tipoArticulo.idTipoArticulo}
                        onChange={handleInputChange}
                        required
                    >
                        <MenuItem value="">Seleccione un tipo de artículo</MenuItem>
                        {tiposArticulos.map((tipo) => (
                            <MenuItem key={tipo.idTipoArticulo} value={tipo.idTipoArticulo}>
                                {tipo.nombreArticulo}
                            </MenuItem>
                        ))}
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
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Documento</TableCell>
                            <TableCell>Evidencia</TableCell>
                            <TableCell>Monto</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Tipo Artículo</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {solicitudes.map((solicitud) => (
                            <TableRow key={solicitud.idSolicitud}>
                                <TableCell>{solicitud.idSolicitud}</TableCell>
                                <TableCell>{solicitud.nombre}</TableCell>
                                <TableCell>{solicitud.apellido}</TableCell>
                                <TableCell>{solicitud.documentoIdentidad}</TableCell>
                                <TableCell>{solicitud.evidencia}</TableCell>
                                <TableCell>{solicitud.montoSolicitado}</TableCell>
                                <TableCell>{solicitud.estadoSolicitud}</TableCell>
                                <TableCell>{solicitud.usuario?.usuNombre || '-'}</TableCell>
                                <TableCell>{solicitud.tipoArticulo?.nombreArticulo || '-'}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(solicitud)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(solicitud.idSolicitud)}>
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

export default SolicitudList;