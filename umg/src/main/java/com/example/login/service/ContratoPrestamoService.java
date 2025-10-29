package com.example.login.service;


import com.example.login.model.ContratoPrestamo;
import com.example.login.repository.ContratoPrestamoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContratoPrestamoService {

    @Autowired
    private ContratoPrestamoRepository repository;

    public ContratoPrestamo createContratoPrestamo(ContratoPrestamo contratoPrestamo) {
        return repository.save(contratoPrestamo);
    }

    public List<ContratoPrestamo> getAllContratoPrestamos() {
        return repository.findAll();
    }

    public ContratoPrestamo getContratoPrestamoById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contrato de préstamo no encontrado con ID: " + id));
    }

    public ContratoPrestamo updateContratoPrestamo(Integer id, ContratoPrestamo updatedContratoPrestamo) {
        ContratoPrestamo existing = getContratoPrestamoById(id);
        existing.setIdAvaluo(updatedContratoPrestamo.getIdAvaluo());
        existing.setMontoAprobado(updatedContratoPrestamo.getMontoAprobado());
        existing.setPlazoMeses(updatedContratoPrestamo.getPlazoMeses());
        existing.setTasaInteres(updatedContratoPrestamo.getTasaInteres());
        existing.setFechaGeneracion(updatedContratoPrestamo.getFechaGeneracion());
        existing.setEstadoContrato(updatedContratoPrestamo.getEstadoContrato());
        return repository.save(existing);
    }

    public void deleteContratoPrestamo(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Contrato de préstamo no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}