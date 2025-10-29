package com.example.login.service;

import com.example.login.model.NotificacionesAvaluo;
import com.example.login.model.NotificacionesCt;
import com.example.login.repository.NotificacionesAvaluoRepository;
import com.example.login.repository.NotificacionesCtRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificacionesAvaluoService {

    @Autowired
    private NotificacionesAvaluoRepository repository;

    public NotificacionesAvaluo createNotificacion(NotificacionesAvaluo notificacion) {
        return repository.save(notificacion);
    }

    public List<NotificacionesAvaluo> getAllNotificaciones() {
        return repository.findAll();
    }

    public NotificacionesAvaluo getNotificacionById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Notificación no encontrada con ID: " + id));
    }

    public NotificacionesAvaluo updateNotificacion(Integer id, NotificacionesAvaluo updatedNotificacion) {
        NotificacionesAvaluo existing = getNotificacionById(id);
        existing.setSolicitud(updatedNotificacion.getSolicitud());
        existing.setUsuario(updatedNotificacion.getUsuario());
        existing.setMensaje(updatedNotificacion.getMensaje());
        existing.setEstado(updatedNotificacion.getEstado());
        return repository.save(existing);
    }

    public void deleteNotificacion(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Notificación no encontrada con ID: " + id);
        }
        repository.deleteById(id);
    }
}
