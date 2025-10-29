package com.example.login.controller;

import com.example.login.model.CarteraCobranza;
import com.example.login.service.CarteraCobranzaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cartera")
public class CarteraCobranzaController {

    @Autowired
    private CarteraCobranzaService service;

    @PostMapping
    public ResponseEntity<CarteraCobranza> create(@RequestBody CarteraCobranza cartera) {
        return ResponseEntity.ok(service.create(cartera));
    }

    @GetMapping
    public ResponseEntity<List<CarteraCobranza>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarteraCobranza> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarteraCobranza> update(@PathVariable Long id, @RequestBody CarteraCobranza cartera) {
        return ResponseEntity.ok(service.update(id, cartera));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(404).body(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.status(400).body(ex.getMessage());
    }
}

