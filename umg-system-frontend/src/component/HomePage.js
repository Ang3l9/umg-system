import React, { useState } from 'react';
import { Routes, Route, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './design/HomePage.css';
import TipoArticuloList from "./TipoArticuloList";
import SolicitudList from "./SolicitudList";
import AvaluoList from "./AvaluoList";
import RechazoAvaluoList from "./RechazoAvaluoList";
import ContratoPrestamoList from "./ContratoPrestamoList";
import FirmaElectronicaList from "./FirmaElectronicaList";
import PrestamoDesembolsadoList from "./PrestamoDesembolsadoList";
import PlanPagosList from "./PlanPagosList";
import NotificacionesCtList from "./NotificacionesCtList";
import NotificacionesAvaluoList from "./NotificacionesAvaluoList";

function Dashboard() {
    return <Typography variant="h4">Inicio</Typography>;
}

function Profile() {
    return <Typography variant="h4">Perfil</Typography>;
}

function Settings() {
    return <Typography variant="h4">Config</Typography>;
}

function HomeLayout({ user, onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navItems = [
        { label: 'Inicio', path: 'dashboard' },
        { label: 'Solicitudes', path: 'solicitud' },
        { label: 'Tipo artículo', path: 'tipo-articulo' },
        { label: 'Avaluo', path: 'avaluo' },
        { label: 'Rechazo Avaluo', path: 'ravaluo' },
        { label: 'Contrato Prestamo', path: 'cprestamo' },
        { label: 'Firma Electrónica', path: 'felectronica' },
        { label: 'Prestamo Desembolsado', path: 'pdesembolsado' },
        { label: 'Plan de pagos', path: 'ppagos' },
        { label: 'Notificación CT', path: 'notificacionesct' },
        { label: 'Notificación Avaluo', path: 'notificacionesavaluo' }
    ];


    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    // Función para abrir/cerrar el Drawer
    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Bienvenido, {user.usuNombre}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Salir
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        {navItems.map((item) => (
                            <ListItem  key={item.path} component={Link} to={`/home/${item.path}`}>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        color: location.pathname === `/home/${item.path}` ? 'primary' : 'inherit',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box sx={{ mt: 8, p: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
}

function HomePage({ user, onLogout }) {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout user={user} onLogout={onLogout} />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="solicitud" element={<SolicitudList />} />
                <Route path="tipo-articulo" element={<TipoArticuloList />} />
                <Route path="avaluo" element={<AvaluoList />} />
                <Route path="ravaluo" element={<RechazoAvaluoList />} />
                <Route path="cprestamo" element={<ContratoPrestamoList />} />
                <Route path="felectronica" element={<FirmaElectronicaList />} />
                <Route path="pdesembolsado" element={<PrestamoDesembolsadoList />} />
                <Route path="ppagos" element={<PlanPagosList />} />
                <Route path="notificacionesct" element={<NotificacionesCtList />} />
                <Route path="notificacionesavaluo" element={<NotificacionesAvaluoList />} />
            </Route>
        </Routes>
    );
}

export default HomePage;