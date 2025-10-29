package com.example.login.controller;

import com.example.login.model.ContratoPrestamo;
import com.example.login.service.ContratoPrestamoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/contratoprestamo")
public class ContratoPrestamoController {

    @Autowired
    private ContratoPrestamoService service;

    @PostMapping
    public ResponseEntity<ContratoPrestamo> createContratoPrestamo(@RequestBody ContratoPrestamo contratoPrestamo) {
        contratoPrestamo.setFechaGeneracion(LocalDateTime.now());
        return ResponseEntity.ok(service.createContratoPrestamo(contratoPrestamo));
    }

    @GetMapping
    public ResponseEntity<List<ContratoPrestamo>> getAllContratoPrestamos() {
        return ResponseEntity.ok(service.getAllContratoPrestamos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContratoPrestamo> getContratoPrestamoById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getContratoPrestamoById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContratoPrestamo> updateContratoPrestamo(@PathVariable Integer id, @RequestBody ContratoPrestamo contratoPrestamo) {
        return ResponseEntity.ok(service.updateContratoPrestamo(id, contratoPrestamo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContratoPrestamo(@PathVariable Integer id) {
        service.deleteContratoPrestamo(id);
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