package com.example.login.controller;

import com.example.login.model.RechazoAvaluo;
import com.example.login.service.RechazoAvaluoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rechazoavaluo")
public class RechazoAvaluoController {

    @Autowired
    private RechazoAvaluoService service;

    @PostMapping
    public ResponseEntity<RechazoAvaluo> createRechazoAvaluo(@RequestBody RechazoAvaluo rechazoAvaluo) {
        rechazoAvaluo.setFechaRechazo(LocalDateTime.now());
        return ResponseEntity.ok(service.createRechazoAvaluo(rechazoAvaluo));
    }

    @GetMapping
    public ResponseEntity<List<RechazoAvaluo>> getAllRechazoAvaluos() {
        return ResponseEntity.ok(service.getAllRechazoAvaluos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RechazoAvaluo> getRechazoAvaluoById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getRechazoAvaluoById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RechazoAvaluo> updateRechazoAvaluo(@PathVariable Integer id, @RequestBody RechazoAvaluo rechazoAvaluo) {
        return ResponseEntity.ok(service.updateRechazoAvaluo(id, rechazoAvaluo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRechazoAvaluo(@PathVariable Integer id) {
        service.deleteRechazoAvaluo(id);
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
