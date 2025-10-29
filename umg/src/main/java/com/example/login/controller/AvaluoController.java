package com.example.login.controller;

import com.example.login.model.Avaluo;
import com.example.login.service.AvaluoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/avaluo")
public class AvaluoController {

    @Autowired
    private AvaluoService service;

    @PostMapping
    public ResponseEntity<Avaluo> createAvaluo(@RequestBody Avaluo avaluo) {
        avaluo.setFechaAvaluo(LocalDateTime.now());
        return ResponseEntity.ok(service.createAvaluo(avaluo));
    }

    @GetMapping
    public ResponseEntity<List<Avaluo>> getAllAvaluos() {
        return ResponseEntity.ok(service.getAllAvaluos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Avaluo> getAvaluoById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getAvaluoById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Avaluo> updateAvaluo(@PathVariable Integer id, @RequestBody Avaluo avaluo) {
        return ResponseEntity.ok(service.updateAvaluo(id, avaluo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvaluo(@PathVariable Integer id) {
        service.deleteAvaluo(id);
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