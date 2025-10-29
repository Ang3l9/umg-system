import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Card, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../config/apiConfig";
import './design/HomePage.css';

function ContratoPrestamoList() {
    const [contratos, setContratos] = useState([]);
    const [formData, setFormData] = useState({
        idAvaluo: '',
        montoAprobado: '',
        plazoMeses: '',
        tasaInteres: '',
        estadoContrato: 'Pendiente'
    });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [avaluos, setAvaluos] = useState([]);

    const fetchContratos = async () => {
        try {
            const response = await api.get('/api/v1/contratoprestamo');
            setContratos(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar los contratos');
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

    useEffect(() => {
        fetchContratos();
        fetchAvaluos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            // Append planPago as a JSON string
            formDataToSend.append('planPago', new Blob([JSON.stringify({
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
            })], { type: 'application/json' }));

            // Append archivoComprobante if it exists
            if (formData.archivoComprobante) {
                formDataToSend.append('archivoComprobante', formData.archivoComprobante);
            }

            if (editId) {
                await api.put(`/api/v1/plan-pagos/${editId}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/api/v1/plan-pagos', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
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
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el plan de pago');
            console.error(err);
        }
    };

    const handleEdit = (contrato) => {
        setFormData({
            idAvaluo: contrato.idAvaluo.toString(),
            montoAprobado: contrato.montoAprobado.toString(),
            plazoMeses: contrato.plazoMeses.toString(),
            tasaInteres: contrato.tasaInteres.toString(),
            estadoContrato: contrato.estadoContrato
        });
        setEditId(contrato.idContrato);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/v1/contratoprestamo/${id}`);
            setError(null);
            fetchContratos();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al eliminar el contrato');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setFormData({
            idAvaluo: '',
            montoAprobado: '',
            plazoMeses: '',
            tasaInteres: '',
            estadoContrato: 'Pendiente'
        });
        setEditId(null);
        setError(null);
    };

    return (
        <Card className="container mx-auto p-4">
            <Typography variant="h4" className="mb-4">Gestión de Contratos de Préstamo</Typography>
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
                    label="Monto Aprobado"
                    name="montoAprobado"
                    type="number"
                    value={formData.montoAprobado}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Plazo (Meses)"
                    name="plazoMeses"
                    type="number"
                    value={formData.plazoMeses}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 1, max: 6 }}
                />
                <TextField
                    label="Tasa de Interés"
                    name="tasaInteres"
                    type="number"
                    value={formData.tasaInteres}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Estado Contrato"
                    name="estadoContrato"
                    value={formData.estadoContrato}
                    onChange={handleInputChange}
                    required
                    select
                    SelectProps={{ native: true }}
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Rechazado">Rechazado</option>
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
                            <TableCell>Monto Aprobado</TableCell>
                            <TableCell>Plazo (Meses)</TableCell>
                            <TableCell>Tasa de Interés</TableCell>
                            <TableCell>Fecha Generación</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contratos.map((contrato) => (
                            <TableRow key={contrato.idContrato}>
                                <TableCell>{contrato.idContrato}</TableCell>
                                <TableCell>{contrato.idAvaluo}</TableCell>
                                <TableCell>{contrato.montoAprobado}</TableCell>
                                <TableCell>{contrato.plazoMeses}</TableCell>
                                <TableCell>{contrato.tasaInteres}</TableCell>
                                <TableCell>{contrato.fechaGeneracion}</TableCell>
                                <TableCell>{contrato.estadoContrato}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(contrato)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(contrato.idContrato)}>
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

export default ContratoPrestamoList;