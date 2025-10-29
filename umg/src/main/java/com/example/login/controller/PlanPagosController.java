package com.example.login.controller;

import com.example.login.model.PlanPagos;
import com.example.login.service.PlanPagosService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/plan-pagos")
public class PlanPagosController {

    @Autowired
    private PlanPagosService service;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<PlanPagos> createPlanPago(
            @RequestPart("planPago") String planPagoJson,
            @RequestPart(value = "archivoComprobante", required = false) MultipartFile archivoComprobante) throws IOException {
        PlanPagos planPago = objectMapper.readValue(planPagoJson, PlanPagos.class);
        if (archivoComprobante != null && !archivoComprobante.isEmpty()) {
            planPago.setArchivoComprobante(archivoComprobante.getBytes());
        }
        planPago.setFechaVencimiento(LocalDate.now());
        return ResponseEntity.ok(service.createPlanPago(planPago));
    }

    @GetMapping
    public ResponseEntity<List<PlanPagos>> getAllPlanPagos() {
        return ResponseEntity.ok(service.getAllPlanPagos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanPagos> getPlanPagoById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getPlanPagoById(id));
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<PlanPagos> updatePlanPago(
            @PathVariable Integer id,
            @RequestPart("planPago") String planPagoJson,
            @RequestPart(value = "archivoComprobante", required = false) MultipartFile archivoComprobante) throws IOException {
        PlanPagos updatedPlanPago = objectMapper.readValue(planPagoJson, PlanPagos.class);
        PlanPagos existing = service.getPlanPagoById(id);
        existing.setAvaluo(updatedPlanPago.getAvaluo());
        existing.setContrato(updatedPlanPago.getContrato());
        existing.setNumeroCuota(updatedPlanPago.getNumeroCuota());
        existing.setFechaVencimiento(updatedPlanPago.getFechaVencimiento());
        existing.setMontoCuota(updatedPlanPago.getMontoCuota());
        existing.setMontoInteres(updatedPlanPago.getMontoInteres());
        existing.setMontoCapital(updatedPlanPago.getMontoCapital());
        existing.setMontoPagado(updatedPlanPago.getMontoPagado());
        existing.setEstadoPago(updatedPlanPago.getEstadoPago());
        existing.setFechaPago(updatedPlanPago.getFechaPago());
        existing.setUsuario(updatedPlanPago.getUsuario());
        if (archivoComprobante != null && !archivoComprobante.isEmpty()) {
            existing.setArchivoComprobante(archivoComprobante.getBytes());
        }
        return ResponseEntity.ok(service.updatePlanPago(id, existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlanPago(@PathVariable Integer id) {
        service.deletePlanPago(id);
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