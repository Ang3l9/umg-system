package com.example.login.service;


import com.example.login.model.PlanPagos;
import com.example.login.repository.PlanPagosRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlanPagosService {

    @Autowired
    private PlanPagosRepository repository;

    public PlanPagos createPlanPago(PlanPagos planPago) {
        return repository.save(planPago);
    }

    public List<PlanPagos> getAllPlanPagos() {
        return repository.findAll();
    }

    public PlanPagos getPlanPagoById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Plan de pago no encontrado con ID: " + id));
    }

    public PlanPagos updatePlanPago(Integer id, PlanPagos updatedPlanPago) {
        PlanPagos existing = getPlanPagoById(id);
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
        existing.setArchivoComprobante(updatedPlanPago.getArchivoComprobante());
        existing.setUsuario(updatedPlanPago.getUsuario());
        return repository.save(existing);
    }

    public void deletePlanPago(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Plan de pago no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}
