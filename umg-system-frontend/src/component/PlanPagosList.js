import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Card, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../config/apiConfig";
import './design/HomePage.css';

function PlanPagosList() {
    const [planPagos, setPlanPagos] = useState([]);
    const [formData, setFormData] = useState({
        avaluo: { idAvaluo: '' },
        contrato: { idContrato: '' },
        numeroCuota: '',
        fechaVencimiento: '',
        montoCuota: '',
        montoInteres: '',
        montoCapital: '',
        montoPagado: '',
        estadoPago: 'Pendiente',
        fechaPago: '',
        archivoComprobante: null,
        usuario: { idUsuario: '' }
    });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [avaluos, setAvaluos] = useState([]);
    const [contratos, setContratos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const fetchPlanPagos = async () => {
        try {
            const response = await api.get('/api/v1/plan-pagos');
            setPlanPagos(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar los planes de pago');
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
        fetchPlanPagos();
        fetchAvaluos();
        fetchContratos();
        fetchUsuarios();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'avaluo') {
            setFormData(prev => ({ ...prev, avaluo: { idAvaluo: value } }));
        } else if (name === 'contrato') {
            setFormData(prev => ({ ...prev, contrato: { idContrato: value } }));
        } else if (name === 'usuario') {
            setFormData(prev => ({ ...prev, usuario: { idUsuario: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, archivoComprobante: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jsonPayload = {
                avaluo: { idAvaluo: parseInt(formData.avaluo.idAvaluo) || 0 },
                contrato: { idContrato: parseInt(formData.contrato.idContrato) || 0 },
                usuario: { idUsuario: parseInt(formData.usuario.idUsuario) || 0 },
                numeroCuota: parseInt(formData.numeroCuota) || 0,
                fechaVencimiento: formData.fechaVencimiento,
                montoCuota: parseFloat(formData.montoCuota) || 0,
                montoInteres: parseFloat(formData.montoInteres) || 0,
                montoCapital: parseFloat(formData.montoCapital) || 0,
                montoPagado: parseFloat(formData.montoPagado) || 0,
                estadoPago: formData.estadoPago,
                fechaPago: formData.fechaPago
            };

            const formDataToSend = new FormData();
            formDataToSend.append('planPago', JSON.stringify(jsonPayload));  // Send as plain JSON string
            if (formData.archivoComprobante) {
                formDataToSend.append('archivoComprobante', formData.archivoComprobante);
            }

            if (editId) {
                await api.put(`/api/v1/plan-pagos/${editId}`, formDataToSend);
            } else {
                await api.post('/api/v1/plan-pagos', formDataToSend);
            }
            setFormData({
                avaluo: { idAvaluo: '' },
                contrato: { idContrato: '' },
                numeroCuota: '',
                fechaVencimiento: '',
                montoCuota: '',
                montoInteres: '',
                montoCapital: '',
                montoPagado: '',
                estadoPago: 'Pendiente',
                fechaPago: '',
                archivoComprobante: null,
                usuario: { idUsuario: '' }
            });
            setEditId(null);
            setError(null);
            fetchPlanPagos();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el plan de pago');
            console.error(err);
        }
    };

    const handleEdit = (planPago) => {
        setFormData({
            avaluo: planPago.avaluo ? { idAvaluo: planPago.avaluo.idAvaluo.toString() } : { idAvaluo: '' },
            contrato: planPago.contrato ? { idContrato: planPago.contrato.idContrato.toString() } : { idContrato: '' },
            numeroCuota: planPago.numeroCuota ? planPago.numeroCuota.toString() : '',
            fechaVencimiento: planPago.fechaVencimiento ? planPago.fechaVencimiento.toString() : '',
            montoCuota: planPago.montoCuota ? planPago.montoCuota.toString() : '',
            montoInteres: planPago.montoInteres ? planPago.montoInteres.toString() : '',
            montoCapital: planPago.montoCapital ? planPago.montoCapital.toString() : '',
            montoPagado: planPago.montoPagado ? planPago.montoPagado.toString() : '',
            estadoPago: planPago.estadoPago || 'Pendiente',
            fechaPago: planPago.fechaPago ? planPago.fechaPago.toString() : '',
            archivoComprobante: null,
            usuario: planPago.usuario ? { idUsuario: planPago.usuario.idUsuario.toString() } : { idUsuario: '' }
        });
        setEditId(planPago.idPago);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/v1/plan-pagos/${id}`);
            setError(null);
            fetchPlanPagos();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar el plan de pago');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setFormData({
            avaluo: { idAvaluo: '' },
            contrato: { idContrato: '' },
            numeroCuota: '',
            fechaVencimiento: '',
            montoCuota: '',
            montoInteres: '',
            montoCapital: '',
            montoPagado: '',
            estadoPago: 'Pendiente',
            fechaPago: '',
            archivoComprobante: null,
            usuario: { idUsuario: '' }
        });
        setEditId(null);
        setError(null);
    };

    return (
        <Card className="container mx-auto p-4">
            <Typography variant="h4" className="mb-4">Gestión de Planes de Pago</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 2, width: '30ch' } }} noValidate autoComplete="off">
                <FormControl fullWidth>
                    <InputLabel>Avalúo</InputLabel>
                    <Select
                        name="avaluo"
                        value={formData.avaluo.idAvaluo}
                        onChange={handleInputChange}
                        required
                    >
                        <MenuItem value="">Seleccione un avalúo</MenuItem>
                        {avaluos.map((avaluo) => (
                            <MenuItem key={avaluo.idAvaluo} value={avaluo.idAvaluo}>
                                {avaluo.idAvaluo}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                                {contrato.descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Número de Cuota"
                    name="numeroCuota"
                    type="number"
                    value={formData.numeroCuota}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Fecha Vencimiento"
                    name="fechaVencimiento"
                    type="date"
                    value={formData.fechaVencimiento}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Monto Cuota"
                    name="montoCuota"
                    type="number"
                    value={formData.montoCuota}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Monto Interés"
                    name="montoInteres"
                    type="number"
                    value={formData.montoInteres}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Monto Capital"
                    name="montoCapital"
                    type="number"
                    value={formData.montoCapital}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Monto Pagado"
                    name="montoPagado"
                    type="number"
                    value={formData.montoPagado}
                    onChange={handleInputChange}
                    required
                />
                <FormControl fullWidth>
                    <InputLabel>Estado Pago</InputLabel>
                    <Select
                        name="estadoPago"
                        value={formData.estadoPago}
                        onChange={handleInputChange}
                        required
                    >
                        <MenuItem value="Pendiente">Pendiente</MenuItem>
                        <MenuItem value="Pagado">Pagado</MenuItem>
                        <MenuItem value="Atrasado">Atrasado</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Fecha Pago"
                    name="fechaPago"
                    type="datetime-local"
                    value={formData.fechaPago}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
                <input
                    type="file"
                    name="archivoComprobante"
                    onChange={handleFileChange}
                />
                <FormControl fullWidth>
                    <InputLabel>Usuario Gestor</InputLabel>
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
                            <TableCell>Avalúo</TableCell>
                            <TableCell>Contrato</TableCell>
                            <TableCell>Número Cuota</TableCell>
                            <TableCell>Fecha Vencimiento</TableCell>
                            <TableCell>Monto Cuota</TableCell>
                            <TableCell>Monto Interés</TableCell>
                            <TableCell>Monto Capital</TableCell>
                            <TableCell>Monto Pagado</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Fecha Pago</TableCell>
                            <TableCell>Usuario Gestor</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {planPagos.map((planPago) => (
                            <TableRow key={planPago.idPago}>
                                <TableCell>{planPago.idPago}</TableCell>
                                <TableCell>{planPago.avaluo?.idAvaluo || '-'}</TableCell>
                                <TableCell>{planPago.contrato?.descripcion || '-'}</TableCell>
                                <TableCell>{planPago.numeroCuota}</TableCell>
                                <TableCell>{planPago.fechaVencimiento}</TableCell>
                                <TableCell>{planPago.montoCuota}</TableCell>
                                <TableCell>{planPago.montoInteres}</TableCell>
                                <TableCell>{planPago.montoCapital}</TableCell>
                                <TableCell>{planPago.montoPagado}</TableCell>
                                <TableCell>{planPago.estadoPago}</TableCell>
                                <TableCell>{planPago.fechaPago}</TableCell>
                                <TableCell>{planPago.usuario?.usuNombre || '-'}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(planPago)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(planPago.idPago)}>
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

export default PlanPagosList;