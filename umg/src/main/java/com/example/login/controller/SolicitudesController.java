package com.example.login.controller;

import com.example.login.model.Solicitud;
import com.example.login.service.SolicitudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/solicitudes")
public class SolicitudesController {

    @Autowired
    private SolicitudService service;

    // Create
    @PostMapping
    public ResponseEntity<Solicitud> createSolicitud(@RequestBody Solicitud solicitud) {
        solicitud.setFechaSolicitud(LocalDateTime.now());
        return ResponseEntity.ok(service.createSolicitud(solicitud));
    }

    // Read (all)
    @GetMapping
    public ResponseEntity<List<Solicitud>> getAllSolicitudes() {
        return ResponseEntity.ok(service.getAllSolicitudes());
    }

    // Read (by ID)
    @GetMapping("/{id}")
    public ResponseEntity<Solicitud> getSolicitudById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getSolicitudById(id));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Solicitud> updateSolicitud(@PathVariable Integer id, @RequestBody Solicitud solicitud) {
        return ResponseEntity.ok(service.updateSolicitud(id, solicitud));
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSolicitud(@PathVariable Integer id) {
        service.deleteSolicitud(id);
        return ResponseEntity.noContent().build();
    }

    // Exception handler for EntityNotFoundException
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(404).body(ex.getMessage());
    }

    // Exception handler for IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.status(400).body(ex.getMessage());
    }
}