package com.example.login.service;

import com.example.login.model.NotificacionesCt;
import com.example.login.repository.NotificacionesCtRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificacionesCtService {

    @Autowired
    private NotificacionesCtRepository repository;

    public NotificacionesCt createNotificacion(NotificacionesCt notificacion) {
        return repository.save(notificacion);
    }

    public List<NotificacionesCt> getAllNotificaciones() {
        return repository.findAll();
    }

    public NotificacionesCt getNotificacionById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Notificación no encontrada con ID: " + id));
    }

    public NotificacionesCt updateNotificacion(Integer id, NotificacionesCt updatedNotificacion) {
        NotificacionesCt existing = getNotificacionById(id);
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
