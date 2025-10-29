package com.example.login.controller;

import com.example.login.model.FirmaElectronica;
import com.example.login.service.FirmaElectronicaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/firmaelectronica")
public class FirmaElectronicaController {

    @Autowired
    private FirmaElectronicaService service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FirmaElectronica> createFirmaElectronica(
            @RequestParam("idContrato") Integer idContrato,
            @RequestParam("idUsuario") Integer idUsuario,
            @RequestParam("documentoFirmado") MultipartFile documentoFirmado,
            @RequestParam("estadoFirma") String estadoFirma) {
        try {
            FirmaElectronica firma = new FirmaElectronica();
            firma.setIdContrato(idContrato);
            firma.setIdUsuario(idUsuario);
            firma.setFechaFirma(LocalDateTime.now());
            firma.setDocumentoFirmado(documentoFirmado.getBytes());
            firma.setEstadoFirma(estadoFirma);
            return ResponseEntity.ok(service.createFirmaElectronica(firma));
        } catch (Exception e) {
            throw new IllegalArgumentException("Error procesando el archivo: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<FirmaElectronica>> getAllFirmaElectronicas() {
        return ResponseEntity.ok(service.getAllFirmaElectronicas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FirmaElectronica> getFirmaElectronicaById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getFirmaElectronicaById(id));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FirmaElectronica> updateFirmaElectronica(
            @PathVariable Integer id,
            @RequestParam("idContrato") Integer idContrato,
            @RequestParam("idUsuario") Integer idUsuario,
            @RequestParam(value = "documentoFirmado", required = false) MultipartFile documentoFirmado,
            @RequestParam("estadoFirma") String estadoFirma) {
        try {
            FirmaElectronica firma = service.getFirmaElectronicaById(id);
            firma.setIdContrato(idContrato);
            firma.setIdUsuario(idUsuario);
            if (documentoFirmado != null) {
                firma.setDocumentoFirmado(documentoFirmado.getBytes());
            }
            firma.setEstadoFirma(estadoFirma);
            return ResponseEntity.ok(service.updateFirmaElectronica(id, firma));
        } catch (Exception e) {
            throw new IllegalArgumentException("Error procesando el archivo: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFirmaElectronica(@PathVariable Integer id) {
        service.deleteFirmaElectronica(id);
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