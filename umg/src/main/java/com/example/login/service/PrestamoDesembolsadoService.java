package com.example.login.service;

import com.example.login.model.PrestamoDesembolsado;
import com.example.login.repository.PrestamoDesembolsadoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PrestamoDesembolsadoService {

    @Autowired
    private PrestamoDesembolsadoRepository repository;

    public PrestamoDesembolsado createPrestamoDesembolsado(PrestamoDesembolsado prestamo) {
        return repository.save(prestamo);
    }

    public List<PrestamoDesembolsado> getAllPrestamosDesembolsados() {
        return repository.findAll();
    }

    public PrestamoDesembolsado getPrestamoDesembolsadoById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Desembolso no encontrado con ID: " + id));
    }

    public PrestamoDesembolsado updatePrestamoDesembolsado(Integer id, PrestamoDesembolsado updatedPrestamo) {
        PrestamoDesembolsado existing = getPrestamoDesembolsadoById(id);
        existing.setContrato(updatedPrestamo.getContrato());
        existing.setUsuario(updatedPrestamo.getUsuario());
        existing.setMontoDesembolsado(updatedPrestamo.getMontoDesembolsado());
        existing.setEstadoDesembolso(updatedPrestamo.getEstadoDesembolso());
        return repository.save(existing);
    }

    public void deletePrestamoDesembolsado(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Desembolso no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}
