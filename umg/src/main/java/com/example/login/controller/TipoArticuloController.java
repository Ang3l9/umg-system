package com.example.login.controller;


import com.example.login.model.TipoArticulo;
import com.example.login.service.TipoArticuloService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tipoarticulo")
public class TipoArticuloController {

    @Autowired
    private TipoArticuloService service;

    // Create
    @PostMapping
    public ResponseEntity<TipoArticulo> createTipoArticulo(@RequestBody TipoArticulo tipoArticulo) {
        return ResponseEntity.ok(service.createTipoArticulo(tipoArticulo));
    }

    // Read (all)
    @GetMapping
    public ResponseEntity<List<TipoArticulo>> getAllTiposArticulos() {
        return ResponseEntity.ok(service.getAllTiposArticulos());
    }

    // Read (by ID)
    @GetMapping("/{id}")
    public ResponseEntity<TipoArticulo> getTipoArticuloById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getTipoArticuloById(id));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<TipoArticulo> updateTipoArticulo(@PathVariable Integer id, @RequestBody TipoArticulo tipoArticulo) {
        return ResponseEntity.ok(service.updateTipoArticulo(id, tipoArticulo));
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoArticulo(@PathVariable Integer id) {
        service.deleteTipoArticulo(id);
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
