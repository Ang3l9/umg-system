package com.example.login.controller;

import com.example.login.model.PrestamoDesembolsado;
import com.example.login.service.PrestamoDesembolsadoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/prestamo-desembolsado")
public class PrestamoDesembolsadoController {

    @Autowired
    private PrestamoDesembolsadoService service;

    @PostMapping
    public ResponseEntity<PrestamoDesembolsado> createPrestamoDesembolsado(@RequestBody PrestamoDesembolsado prestamo) {
        prestamo.setFechaDesembolso(LocalDateTime.now());
        return ResponseEntity.ok(service.createPrestamoDesembolsado(prestamo));
    }

    @GetMapping
    public ResponseEntity<List<PrestamoDesembolsado>> getAllPrestamosDesembolsados() {
        return ResponseEntity.ok(service.getAllPrestamosDesembolsados());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrestamoDesembolsado> getPrestamoDesembolsadoById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getPrestamoDesembolsadoById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrestamoDesembolsado> updatePrestamoDesembolsado(@PathVariable Integer id, @RequestBody PrestamoDesembolsado prestamo) {
        return ResponseEntity.ok(service.updatePrestamoDesembolsado(id, prestamo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrestamoDesembolsado(@PathVariable Integer id) {
        service.deletePrestamoDesembolsado(id);
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
