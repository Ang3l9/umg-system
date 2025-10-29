package com.example.login.controller;

import com.example.login.model.NotificacionesCt;
import com.example.login.service.NotificacionesCtService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/notificaciones-ct")
public class NotificacionesCtController {

    @Autowired
    private NotificacionesCtService service;

    @PostMapping
    public ResponseEntity<NotificacionesCt> createNotificacion(@RequestBody NotificacionesCt notificacion) {
        notificacion.setFechaRegistro(LocalDateTime.now());
        return ResponseEntity.ok(service.createNotificacion(notificacion));
    }

    @GetMapping
    public ResponseEntity<List<NotificacionesCt>> getAllNotificaciones() {
        return ResponseEntity.ok(service.getAllNotificaciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificacionesCt> getNotificacionById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getNotificacionById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NotificacionesCt> updateNotificacion(@PathVariable Integer id, @RequestBody NotificacionesCt notificacion) {
        return ResponseEntity.ok(service.updateNotificacion(id, notificacion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotificacion(@PathVariable Integer id) {
        service.deleteNotificacion(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(404).body(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.status(400).body(ex.getMessage());
    }
}
